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

function imageBuild(name, firstname, id){
    var res = firstname.concat(name);
    res.toLowerCase();
    res.replace(" ", "-");
    return ("http://directory.wecitizens.be/images/generic/politician-thumb/" + id + "-" + res + ".jpg");
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
	$(context).html(body.replace(name, name + " " + image));

	politicianInfos.push({name: name, surname: hashmap[name][0][4], birthDate: bdate, 
		politicalParty: hashmap[name][0][2], city: hashmap[name][0][7], job: hashmap[name][0][8]});
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

				found = true;
				var matching = [];
				var pol = null;
				for (var i in hashmap[name]){
					matching.push(hashmap[name][i])
					if (prev == hashmap[name][i][4]){		//Matching also firstname
						pol = i;
					}
				}
				if (pol != null){
					display(hashmap, name, pol, counter, context);
				}
                counter.i++;
                pref = null;
			}
			prev = word;
			iter++;
		}
	}
}
