
function containsObject(obj, array) {
	var obj = JSON.stringify(obj);

    for (var i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) === obj) {
            return i;
        }
    }
    return -1;
}


// Update the relevant fields with the new data
function replaceHTML(politicianInfos) {

	for (var i = 0; i < politicianInfos.length; i++) {

		var alreadyMet = containsObject(politicianInfos[i], politicianInfos);

		if (alreadyMet >= i) {

			console.log("alreadyMet");

			var name			= politicianInfos[i].name;
			var surname			= politicianInfos[i].surname;
			var birthDate		= politicianInfos[i].birthDate;
			var politicalParty	= politicianInfos[i].politicalParty;
			var city			= politicianInfos[i].city;
			var job 			= politicianInfos[i].job;

			$('#content-main').append('<div class="panel-group" id="accordion'+i+'">\
					                <div class="panel panel-default"">\
					                    <div class="panel-heading">\
					                        <h4 class="panel-title">\
					                            <a data-toggle="collapse" data-target="#collapsing'+i+'" href="#collapsing" class="collapsed">' + name + " " 
					                            + surname + '</a>\
					                        </h4>\
					                    </div>\
					                    <div id="collapsing'+i+'" class="panel-collapse collapse in">\
					                        <div class="panel-body">\
					                        	<div class=\'col-xs-9\'>\
													<div class=\'row\'>\
														<strong>Job</strong>: '+ job +'\
													</div>\
													<div class=\'row\'>\
														<strong>Political party</strong>: '+ politicalParty +'\
													</div>\
													<div class=\'row\'>\
														<strong>City</strong>: '+ city +'\
													</div>\
													<div class=\'row\'>\
														<strong>Age</strong>: '+ birthDate +'\
													</div>\
													<div class=\'row\'>\
														<a href=\'http://wecitizens.be\'>Voir sur wecitizens</a>\
													</div>\
												</div>\
					                        </div>\
					                    </div>\
					                </div>\
					            </div>');
		}
	}
}

//Once the DOM is ready
window.addEventListener('DOMContentLoaded', function () {
	//Query for the active tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
	//Send a request for the HTML info
		chrome.tabs.sendMessage(
	   	 	tabs[0].id,
	   		{from: 'popup', subject: 'politicianInfos'},
	   		//Specifying a callback to be called from the receiving end (content script)
	    	replaceHTML);
		console.log('Message sent from popup.js');
	});
});