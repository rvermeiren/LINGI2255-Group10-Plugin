var font = false;


var politicianInfos = [];


/*********************************************
************ Start functions *****************
**********************************************/

$(document).ready(function(){
	// console.log('Document is ready.. scanning for politicians...');
	var retrievedObject = chrome.storage.local.get('database_csv',
		function(result){
			hashmap = CSVToHashmap(result.database_csv);
			launchSearch(hashmap);
		}
	);

	// Listen for messages from the popup
	console.log('Message received from popup');
	chrome.runtime.onMessage.addListener(function (msg, sender, response) {
		if ((msg.from === 'popup') && (msg.subject === 'politicianInfos')) {
			console.log('Message sent to popup');
			response(politicianInfos);
		}
	});
});

function textNodesUnder(el){
	var pred;
	var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
	while(n=walk.nextNode()){
		if (pred != n.parentNode)
			a.push(n.parentNode);
		pred = n.parentNode;
	}
	return a;
}


function launchSearch(hashmap) {
	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.

	var arr = textNodesUnder(document.body);
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].childNodes.length; j++) {
			if (arr[i].childNodes[j].nodeType == Node.TEXT_NODE) {
				inspectTextNode(arr[i], j, arr[i].childNodes[j], counter);
				j++;
			}
		}
	}

	$('head').append(
		"<script>$(function(){$(\'[data-toggle=\"popover\"]\').popover();});</script>"
	);

	//J'ai essaye d'injecter ça qui n'a pas l'air d'avoir besoin du body en container mais ça marche pas :d
	$('head').append(
		"<script>\
				var originalLeave = $.fn.popover.Constructor.prototype.leave;\
				$.fn.popover.Constructor.prototype.leave = function(obj){\
					var self = obj instanceof this.constructor ?\
						obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)\
					var container, timeout;\
					originalLeave.call(this, obj);\
					if(obj.currentTarget) {\
						container = $(obj.currentTarget).siblings('.popover')\
						timeout = self.timeout;\
						container.one('mouseenter', function(){\
							//We entered the actual popover – call off the dogs\
							clearTimeout(timeout);\
							//Let's monitor popover content instead\
							container.one('mouseleave', function(){\
								$.fn.popover.Constructor.prototype.leave.call(self, self);\
							});\
						})\
					}\
				};\	</script>"
	);

	/* Hide the popover when clicking anywhere on the page*/
	$('body').on('click', function (e) {

    //only buttons
	    if ($(e.target).data('toggle') !== 'popover'
	        && $(e.target).parents('.popover.in').length === 0) {
	        $('[data-toggle="popover"]').popover('hide');
	    }
	});
}

/*********************************************
**** Search through textNode and add icons ***
**********************************************/

function inspectTextNode(parent, nodeIndex, textNode, counter) {
	var toDisplay = [];
    var body = textNode.textContent;
	// console.log(body);
	var prev, pref, word;
	var prefix = ["", "den ", "der ", "de ", "van "];
	var reg = /[A-Z]+[a-z\-]*/gm;
	var i = 0;
	// for(i; i<word.length; i++) {
	while(word = reg.exec(body)){
		if (word == "De" || word == "Van" || word == "Di" || word == "Vanden" || word == "Ver"){		//Di Rupo rpz
			pref = word;
			continue;
		}
		var name;
		var found = false;
		var iter = 0;
		while (!found && iter < prefix.length) {
			// Search for prefixes
			if (pref != null) {
				name = pref + " " + prefix[iter] + word;
			} else {
				name = prefix[iter] + word;
			}
			// Search for the name in the hashmap
			if (name in hashmap){
				found = true;
				var matching = [];
				var pol = null;
				// If only one politician has this name
				var twoNames = false;
				if(hashmap[name].length == 1) {
					pol = 0;
				}
				// If a politician has his first name cited just before his last name in the text
				else for (var i in hashmap[name]) {
					matching.push(hashmap[name][i]);
					if (prev == hashmap[name][i][4]) { //Matching also firstname
						pol = i;
						twoNames = true;
					}
				}
				var nameLength = name.length;
				if(twoNames) {
					prev += " "
					nameLength += prev.length;
				}
				else {
					prev = ""
				}
				// console.log("Name length : " + word[0].length);
				// Only one politician
				if (pol != null) {
					toDisplay.push({"index" : reg.lastIndex, "nameLength" : nameLength ,"span" : prev + name + createSinglePopover(hashmap, name, pol, counter)});
				}
				//Multiple policitians
				else {
					toDisplay.push({"index" : reg.lastIndex, "nameLength" : nameLength ,"span" : prev + name + createListPopover(hashmap, name, counter)});
				}
                pref = null;
			}
			prev = word;
			iter++;
		}
	}
	if(toDisplay.length > 0) {
		displayIcons(textNode, parent, toDisplay);
		return 1;
	}
	return 0;
}

function displayIcons(textNode, parent, toDisplay) {
	var ret = textNode.nodeValue;

	var fragment = document.createDocumentFragment();
	for(var i = 0; i < toDisplay.length; i++) {
		console.log(i);
		var icon = toDisplay.pop();
		// console.log(icon.index);
		// Add the end of the textNode
		if((icon.index) < ret.length)
			fragment.insertBefore(document.createTextNode(ret.substr(icon.index)), fragment.firstChild);

		// Add the span containing the icon and the popover
		var toAdd = document.createElement("span");
		toAdd.innerHTML = icon.span;
		fragment.insertBefore(toAdd, fragment.firstChild);
		// console.log(icon.index-icon.nameLength);
		// fragment.insertBefore(document.createTextNode(ret.substr(icon.index - icon.nameLength-1, icon.index)), fragment.firstChild);

		// Now we handle the rest of the names, the ones in the beginning of the text
		ret = ret.substr(0, icon.index-icon.nameLength);
	}
	fragment.insertBefore(document.createTextNode(ret), fragment.firstChild);
	parent.replaceChild(fragment, textNode);
}

/*********************************************
********** Auxiliary functions ***************
**********************************************/

//http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function removeAccent(str) {
	var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}

function urlBuild(name, firstname, id) {
	linkedName = name.replace(" ", "-");
	linkedFirstname = firstname.replace(" ", "-");
	var res = linkedFirstname.concat(linkedName);
	res.toLowerCase();
	res.replace(" ", "-");
	res = removeAccent(res);
	return("http://directory.wecitizens.be/fr/politician/" + res + "-" + id);
}

function imgBuild(name, imgName) {
	if (imgName != "\\N" && imgName != 0) {
        var photo = ("http://directory.wecitizens.be/images/generic/politician-thumb/" + imgName);
    } else {
        var photo = ("http://directory.wecitizens.be/images/img-no-photo.png");
    }
    return "<img src="+ photo +" height=75 alt="+ name +">";
}


/*********************************************
************* Creating popovers **************
**********************************************/
function createSinglePopover(hashmap, name, index, counter) {
	var bdate = new Date(hashmap[name][index][6]+'T10:20:30Z');
	bdate = calculateAge(bdate);

    var img = imgBuild(name, hashmap[name][index][3]);

    var url = urlBuild(name, hashmap[name][index][4], hashmap[name][index][0]);

	var html = initSinglePanel(img, hashmap[name][index][8], hashmap[name][index][2], hashmap[name][index][7], bdate, url)

	var popover = String(' <span id="popoverWeCitizens"><img data-popover="true" data-toggle="popover" data-trigger="hover" title="') + hashmap[name][index][4] + " " + hashmap[name][index][5] + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind pop" data-content="')
	+ html + String('"></span>');

	counter.i++;
	politicianInfos.push({name: hashmap[name][index][4], surname: hashmap[name][index][5], birthDate: bdate,
		politicalParty: hashmap[name][index][2], city: hashmap[name][index][7], job: hashmap[name][index][8], photo: img});

	return popover;
}


function createListPopover(hashmap, name, counter){
	var html = "<div class='container' id='content-main'>\
		<div class='panel-group' id='accordion'>";
	for(i = 0; i < hashmap[name].length; i++){
		var person = hashmap[name][i];
		var bdate = new Date(person[6]+'T10:20:30Z');
		bdate = calculateAge(bdate);

		var img = imgBuild(name, person[3]);

	    var url = urlBuild(name, person[4], person[0]);

		html += initMultiplePanel(counter.i, person[4], person[5], img, person[8], person[2], person[7], bdate, url);

		counter.i++;
		politicianInfos.push({name: name, surname: person[4], birthDate: bdate, politicalParty: person[2], city: person[7], job: person[8], photo: img});
	}
	html += "</div></div>";
	var popover = String(' <span id="popoverWeCitizens"><img data-toggle="popover" data-trigger="hover" title="Politicians found"') + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind" data-content="')
	+ html + String('"></span>');
	return popover;
}

/*********************************************
***** Boring HTML templates functions ********
**********************************************/
function initMultiplePanel(i, firstName, lastName, img, job, party, city, bdate, url) {
	return "<div class='panel panel-default'>\
	<div class='panel-heading'>\
		<h4 class='panel-title'>\
			<a data-toggle='collapse' data-target='#collapsing"+i+"' class='collapsed'>" + firstName + " "+ lastName + "</a>\
		</h4>\
	</div>\
	<div id='collapsing"+i+"' class='panel-collapse collapse'>\
		<div class='panel-body'>\
			<div class='col-xs-4' id='photo'>"+ img +" </div>\
			<div class=\'col-xs-8\'>\
				<div class=\'row\'>\
					<strong>Job</strong>: "+ job +"\
				</div>\
				<div class=\'row\'>\
					<strong>Political party</strong>: "+ party +"\
				</div>\
				<div class=\'row\'>\
					<strong>City</strong>: "+ city +"\
				</div>\
				<div class=\'row\'>\
					<strong>Age</strong>: "+ bdate +" years old\
				</div>\
				<div class='row'>\
					<a target=\'_blank\' href='"+ url +"'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>"
}

function initSinglePanel(img, job, party, city, bdate, url) {
	return "<div class='panel-body'>\
		<div class='row'>\
			<div class='col-xs-3' id='photo'>"+ img +" </div>\
			<div class='col-xs-9'>\
				<div class='row'>\
					"+ job + "\
				</div>\
				<div class='row'>\
					"+ party +"\
				</div>\
				<div class='row'>\
					"+ city +"\
				</div>\
				<div class='row'>\
					"+ bdate +" years old\
				</div>\
				<div class='row'>\
					<a target=\'_blank\' href='"+ url +"'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>"
}
