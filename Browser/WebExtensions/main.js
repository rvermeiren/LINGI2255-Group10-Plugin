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

function launchSearch(hashmap){

	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.
	$('p').each(function(index) {
			addImage(this, counter);
	});

	$('li').each(function(index) {
			addImage(this, counter);
	});

    $('a').each(function(index) {
			addImage(this, counter);
	});

	$('head').append(
		"<script>$(function(){$('[data-toggle=\"popover\"]').popover();});\
		</script>"
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

//http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function removeAccent(str){
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

function imageBuild(name, firstname, id){
	linkedName = name.replace(" ", "-");
    var res = firstname.concat(linkedName);
    res.toLowerCase();
    res.replace(" ", "-");
    res = removeAccent(res);
    return ("http://directory.wecitizens.be/images/generic/politician-thumb/" + id + "-" + res + ".jpg");
}

function urlBuild(name, firstname, id){
	linkedName = name.replace(" ", "-");
	var res = firstname.concat(linkedName);
	res.toLowerCase();
	res.replace(" ", "-");
	res = removeAccent(res);
	return("http://directory.wecitizens.be/fr/politician/" + res + "-" + id);
}

function display(hashmap, name, index, counter, context){
    var body = $(context).text();

	var bdate = new Date(hashmap[name][index][6]+'T10:20:30Z');
	bdate = calculateAge(bdate);

    if (hashmap[name][index][3] != "\\N"){
        var photo = imageBuild(name, hashmap[name][index][4], hashmap[name][index][3]);
        var img = "<img src="+ photo +" height=75 alt="+ name +">";
    }else{
        var img = "<i class='material-icons md-60'>face</i>";
    }

    var url = urlBuild(name, hashmap[name][index][4], hashmap[name][index][0]);

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
					<a href='"+ url +"'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>"
	var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="') + hashmap[name][index][4] + " " + hashmap[name][index][5] + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind" data-content="')
	+ html + String('"></span>');
	//console.log(image);
	$(context).html(body.replace(name, name + " " + image));

	politicianInfos.push({name: hashmap[name][index][4], surname: hashmap[name][index][5], birthDate: bdate,
		politicalParty: hashmap[name][index][2], city: hashmap[name][index][7], job: hashmap[name][index][8]});
}

function display_multiple(hashmap, name, counter, context){
    var body = $(context).text();
	var html = "<div class='container' id='content-main'>\
		<div class='panel-group' id='accordion'>";
	for(i = 0; i < hashmap[name].length; i++){
		var person = hashmap[name][i];
		var bdate = new Date(person[6]+'T10:20:30Z');
		bdate = calculateAge(bdate);

		if (person[3] != "\\N"){
	        var photo = imageBuild(name, person[4], person[3]);
	        var img = "<img src="+ photo +" height=60 alt="+ name +">";
	    }else{
	        var img = "<i class='material-icons md-60'>face</i>";
	    }

		var url = urlBuild(name, person[4], person[0]);

		html += "<div class='panel panel-default'>\
					<div class='panel-heading'>\
						<h4 class='panel-title'>\
							<a data-toggle='collapse' data-target='#collapsing"+counter.i+"' class='collapsed'>" + person[4] + " "+ person[5] + "</a>\
						</h4>\
					</div>\
					<div id='collapsing"+counter.i+"' class='panel-collapse collapse'>\
						<div class='panel-body'>\
							<div class=\'col-xs-3\' id='photo\'>"+ img +" </div>\
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
									<a href=\'"+ url +"\'>Voir sur wecitizens</a>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>"



		var politicianInfos = {name: name, surname: person[4], birthDate: bdate,
		politicalParty: person[2], city: person[7], job: person[8]};

		// Listen for messages from the popup
		console.log('Message received from popup');
		chrome.runtime.onMessage.addListener(function (msg, sender, response) {
			if ((msg.from === 'popup') && (msg.subject === 'politicianInfos')) {
				response(politicianInfos);
				console.log('Message sent to popup');
			}
		});
		counter.i++;
	}
	html+="</div></div>";
	var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="Politicians found"') + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://s12.postimg.org/bqsrifs6l/image.png" class="politicianFind" data-content="')
	+ html + String('"></span>');

	$(context).html(body.replace(name, name + " " + image));
}


function addImage(context, counter) {
    var body = $(context).text();
	var prev;
	var pref;
	var word;
	var prefix = ["", "den ", "der ", "de ", "van "];
	var reg = /[A-Z]+[a-z]*/gm;
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

				var bdate = new Date(hashmap[name][0][6]+'T10:20:30Z');
				bdate = calculateAge(bdate);


				found = true;
				var matching = [];
				var pol = null;
				for (var i in hashmap[name]){
					matching.push(hashmap[name][i]);
					if (prev == hashmap[name][i][4]){		//Matching also firstname
						pol = i;
					}
				}
				if (pol != null){
					display(hashmap, name, pol, counter, context);
				}else if (matching.length == 1){	//Only one name matched
					display(hashmap, name, 0, counter, context);
				}else{		//Multiple matches
					display_multiple(hashmap, name, counter, context);
				}
                counter.i++;
                pref = null;
			}
			prev = word;
			iter++;
		}
	}
}
