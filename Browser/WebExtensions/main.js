var font = false;
$(document).ready(function(){
	// console.log('Document is ready.. scanning for politicians...');
	var retrievedObject = chrome.storage.local.get('database_csv',
		function(result){
			hashmap = CSVToHashmap(result.database_csv);
			launchSearch(hashmap);
		}
	);
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

function display(hashmap, name, index, counter, context){
    var body = $(context).text();

	var bdate = new Date(hashmap[name][index][6]+'T10:20:30Z');
	bdate = calculateAge(bdate);

	var html = "\
	<div class='panel-body'>\
		<div class='row'>\
			<div class='col-xs-3' id='photo'> <i class='material-icons md-60'>face</i> </div>\
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

	var politicianInfos = {name: name, surname: hashmap[name][index][4], birthDate: bdate,
	politicalParty: hashmap[name][index][2], city: hashmap[name][index][7], job: hashmap[name][index][8]};

	// Listen for messages from the popup
	console.log('Message received from popup');
	chrome.runtime.onMessage.addListener(function (msg, sender, response) {
		if ((msg.from === 'popup') && (msg.subject === 'politicianInfos')) {
			response(politicianInfos);
			console.log('Message sent to popup');
		}
	});
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
			}
			var bdate = new Date(hashmap[word][0][6]+'T10:20:30Z');
			bdate = calculateAge(bdate);
			//if (pol != null){ DONUT REMOVE THIS LINE PLEASE
				//INFO CONCERNING THE POLITICIAN : hashmap[word][pol]
			//}else{		//Multiple matches DONUT REMOVE THIS LINE PLEASE
				var html = "<div class='container' id='content-main'>\
							<div class='panel-group' id='accordion'>\
							                <div class='panel panel-default'>\
							                    <div class='panel-heading'>\
							                        <h4 class='panel-title'>\
							                            <a data-toggle='collapse' data-target='#collapsing"+counter.i+"' class='collapsed'>" + hashmap[word][0][4] + " "+ hashmap[word][0][5] + "</a>\
							                        </h4>\
							                    </div>\
							                    <div id='collapsing"+counter.i+"' class='panel-collapse collapse in'>\
							                        <div class='panel-body'>\
							                        	<div class=\'col-xs-9\'>\
															<div class=\'row\'>\
																<strong>Job</strong>: "+ hashmap[word][0][8] +"\
															</div>\
															<div class=\'row\'>\
																<strong>Political party</strong>: "+ hashmap[word][0][2] +"\
															</div>\
															<div class=\'row\'>\
																<strong>City</strong>: "+ hashmap[word][0][7] +"\
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
							                </div>\
							            </div>\
									</div>"
										/*"\
				<div class='panel-body'>\
					<div class='row'>\
						<div class='col-xs-3' id='photo'> <i class='material-icons md-60'>face</i> </div>\
						<div class='col-xs-9'>\
							<div class='row'>\
								"+ hashmap[word][0][8] + "\
							</div>\
							<div class='row'>\
								"+ hashmap[word][0][2] + "\
							</div>\
							<div class='row'>\
								"+ hashmap[word][0][7] + "\
							</div>\
							<div class='row'>\
								"+ bdate +" years old\
							</div>\
							<div class='row'>\
								<a href='http://www.wecitizens.be'>Voir sur wecitizens</a>\
							</div>\
						</div>\
					</div>\
				</div>"*/
				var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="') + hashmap[word][0][4] + " " + hashmap[word][0][5] + String('" id="popover')
				+ counter.i + String('"data-html="true" src="http://img4.hostingpics.net/pics/902279test.png" class="politicianFind" data-content="')
				+ html + String('"></span>');
				//console.log(image);
				$(context).html(body.replace(word, "<mark>"+word+"</mark> " + image));


				var politicianInfos = {name: word, surname: hashmap[word][0][4], birthDate: bdate,
				politicalParty: hashmap[word][0][2], city: hashmap[word][0][7], job: hashmap[word][0][8]};

				// Listen for messages from the popup
				console.log('Message received from popup');
				chrome.runtime.onMessage.addListener(function (msg, sender, response) {
					if ((msg.from === 'popup') && (msg.subject === 'politicianInfos')) {
						response(politicianInfos);
						console.log('Message sent to popup');

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
				}else{		//Multiple matches

				}
                counter.i++;
                pref = null;
			}
			prev = word;
			iter++;
		}
	}
}
