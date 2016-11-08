var font = false;


var politicianInfos = [];


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

	/* Search through <p> and <li> items TODO add other types*/
function launchSearch(hashmap){


	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.

	searchNames(document.body, counter);
	// $('p').each(function(index) {
	// 		addImage(this, counter);
	// });
	//
	// $('li').each(function(index) {
	// 		addImage(this, counter);
	// });
	//
    // $('a').each(function(index) {
	// 		addImage(this, counter);
	// });
	//
	// $('head').append(
	// 	"<script>$(function(){$('[data-toggle=\"popover\"]').popover();});</script>"
	// );

	/* Hide the popover when clicking anywhere on the page*/
	$('body').on('click', function (e) {

    //only buttons
	    if ($(e.target).data('toggle') !== 'popover'
	        && $(e.target).parents('.popover.in').length === 0) {
	        $('[data-toggle="popover"]').popover('hide');
	    }
	});
}

//http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function imageBuild(name, firstname, id){
    var res = firstname.concat(name);
    res.toLowerCase();
    res.replace(" ", "-");
    return ("http://directory.wecitizens.be/images/generic/politician-thumb/" + id + "-" + res + ".jpg");
}

function display(hashmap, name, index, counter, context, returns){
    var body = $(context).text();

	var bdate = new Date(hashmap[name][index][6]+'T10:20:30Z');
	bdate = calculateAge(bdate);

    if (hashmap[name][index][3] != "\\N"){
        var photo = imageBuild(name, hashmap[name][index][4], hashmap[name][index][3]);
        var img = "<img src="+ photo +" height=75 alt="+ name +">";
    }else{
        var img = "<i class='material-icons md-60'>face</i>";
    }

	var html = "\
	<div class='panel-body'>\
		<div class='row'>\
			<div class='col-xs-3' id='photo'>"+ img +" </div>\
			<div class='col-xs-9'>\
				<div class='row'>\
					"+ hashmap[name][index][8] + "\
				</div>\
				<div class='row'>\
					"+ hashmap[name][index][2] +"\
				</div>\
				<div class='row'>\
					"+ hashmap[name][index][7] +"\
				</div>\
				<div class='row'>\
					"+ bdate +" years old\
				</div>\
				<div class='row'>\
					<a href='http://www.wecitizens.be'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>"
	var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="') + hashmap[name][index][4] + " " + hashmap[name][index][5] + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind" data-content="')
	+ html + String('"></span>');
	//console.log(image);
	politicianInfos.push({name: hashmap[name][index][4], surname: hashmap[name][index][5], birthDate: bdate,
		politicalParty: hashmap[name][index][2], city: hashmap[name][index][7], job: hashmap[name][index][8]});
	if (returns) {
		return html;
	}
	$(context).html(body.replace(name, name + " " + image));
}

function display_multiple(hashmap, name, counter, context, returns){
    var body = $(context).text();
	console.log(context);
	var html = "<div class='container' id='content-main'>\
		<div class='panel-group' id='accordion'>";
	for(i = 0; i < hashmap[name].length; i++){
		var person = hashmap[name][i];
		var bdate = new Date(person[6]+'T10:20:30Z');
		bdate = calculateAge(bdate);

		html += "<div class='panel panel-default'>\
					<div class='panel-heading'>\
						<h4 class='panel-title'>\
							<a data-toggle='collapse' data-target='#collapsing"+counter.i+"' class='collapsed'>" + person[4] + " "+ person[5] + "</a>\
						</h4>\
					</div>\
					<div id='collapsing"+counter.i+"' class='panel-collapse collapse'>\
						<div class='panel-body'>\
							<div class=\'col-xs-9\'>\
								<div class=\'row\'>\
									<strong>Job</strong>: "+ person[8] +"\
								</div>\
								<div class=\'row\'>\
									<strong>Political party</strong>: "+ person[2] +"\
								</div>\
								<div class=\'row\'>\
									<strong>City</strong>: "+ person[7] +"\
								</div>\
								<div class=\'row\'>\
									<strong>Age</strong>: "+ bdate +" years old\
								</div>\
								<div class=\'row\'>\
									<a href=\'http://wecitizens.be\'>Voir sur wecitizens</a>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>"



		var politicianInfos = {name: name, surname: person[4], birthDate: bdate,
		politicalParty: person[2], city: person[7], job: person[8]};

		counter.i++;
	}
	html+="</div></div>";
	var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="Politicians found"') + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind" data-content="')
	+ html + String('"></span>');
	if (returns) {
		return html;
	}
	$(context).html(body.replace(name, name + " " + image));
}

function searchNames(context, counter) {
	var children = context.childNodes;
	if(context.hasChildNodes()){
		for (var i = 0; i < children.length; i++) {
		// children.forEach(function(child){
			/*If we need to insert the logo after the balise*/
			var child = children[i];
			if ($(child).is("strong, a, img, b, em, i, pre, sub, sup")) {
				var result = addImage(context, $(child).text(), counter, true);
				// console.log($(child));
				$(child).after(result);
				i++;
			}
			/*If we can insert the image right after the name*/
			else {
				searchNames(child, counter);
			}
		}
	}
	var text = $(context).clone().children().remove().end().text();
	if (text != "") {
		addImage(context, text, counter, false);
	}
}


/* Returns indicates if we can hot swap the text or if we hae to retrun the html
This is useful to escape balises */
function addImage(context, body, counter, returns) {
    // var body = $(context).text();
	console.log(body);
	var prev;
	var pref;
	var word;
	var prefix = ["", "den ", "der ", "de ", "van "];
	var reg = /[A-Z]+[a-z]*/gm;
	var i = 0;
	var ret;
	word = reg.exec(body);
	// for(i; i<word.length; i++) {
	while(word = reg.exec(body)){
		if (word == "De" || word == "Van" || word == "Di" || word == "Vanden" || word == "Ver"){		//Di Rupo rpz
			pref = word;
			continue;
		}
		var name;
		var found = false;
		var iter = 0;
		while (!found && iter < 5) {
			if (pref != null){
				name = pref + " " + prefix[iter] + word;
			}else{
				name = prefix[iter] + word;
			}
			if (name in hashmap){
				if(!font){
					$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
					font = true;
				}

				found = true;
				var matching = [];
				var pol = null;
				for (var i in hashmap[name]){
					matching.push(hashmap[name][i]);
					if (prev == hashmap[name][i][4]){		//Matching also firstname
						pol = i;
					}
				}
				if (pol != null) {
					ret = display(hashmap, name, pol, counter, context, returns);
				} else {		//Multiple matches
					ret = display_multiple(hashmap, name, counter, context, returns);
				}
                counter.i++;
                pref = null;
			}
			prev = word;
			iter++;
			// i++;
		}
	}
	return ret;
}
