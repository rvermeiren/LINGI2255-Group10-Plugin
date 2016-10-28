function launchProcess() {
	$('#content-main').append('<span id="politicians"></span>');
	return;
}

// Update the relevant fields with the new data
function replaceHTML(politicianInfos) {
	console.log("dans replaceHTML");

	$('#accordion').remove();

	var name			= politicianInfos.name;
	var surname			= politicianInfos.surname;
	var birthDate		= politicianInfos.birthDate;
	var politicalParty	= politicianInfos.politicalParty;
	var city			= politicianInfos.city;
	var job 			= politicianInfos.job;

	$('#content-main').append('<div class="panel-group" id="accordion">\
				                <div class="panel panel-default"">\
				                    <div class="panel-heading">\
				                        <h4 class="panel-title">\
				                            <a data-toggle="collapse" data-target="#collapsing" href="#collapsing" class="collapsed">' + name + " " 
				                            + surname + '</a>\
				                        </h4>\
				                    </div>\
				                    <div id="collapsing" class="panel-collapse collapse in">\
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
													<strong>Birth date</strong>: '+ birthDate +'\
												</div>\
												<div class=\'row\'>\
													<a href=\'https://www.youtube.com/watch?v=AmYrTp-JdnY\'>Voir sur wecitizens</a>\
												</div>\
											</div>\
				                        </div>\
				                    </div>\
				                </div>\
				            </div>');
}

//Once the DOM is ready
window.addEventListener('DOMContentLoaded', function () {

	//launchProcess();

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