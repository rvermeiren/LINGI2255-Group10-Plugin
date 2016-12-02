/** Popup.js
 * This script fills the extension popup with the politicians that were found on
 * the page.
 * It sends a message to the current page when opening the popup to retrieve the
 * list of politicians.
 */

//Send a message to the tab when the popup is opened
window.addEventListener('DOMContentLoaded', function () {
	document.getElementById("checkbox").addEventListener("click", function(){
    	update_research(document.getElementById("checkbox"));
	});
	// "Search" in local storage tell us if the search is activated or not
	var retrievedObject = chrome.storage.local.get('search',
		function(result){
			// Check if "Search" is present in local storage"
			if(JSON.stringify(result) != '{}')
				document.getElementById("checkbox").checked = result.search
			else document.getElementById("checkbox").checked = true
		}
	);

	//Query for the active tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
	//Send a request for the politicians info
		chrome.tabs.sendMessage(
	   	 	tabs[0].id,
	   		{from: 'popup', subject: 'politiciansInfo'},
	   		//Execute ReplaceHTML with our list
	    	replaceHTML);
	});
});

// Listener on the checkbox - activate or deactivate the search
function update_research(cb) {
	chrome.storage.local.set({'search': cb.checked},function(){});
}

// Update the HTML of the popup with the politicians list
function replaceHTML(politiciansInfo) {

	var count = 0;
	// We received a hashmap with the politians - i is in format FirstnameLastname
	for (var i in politiciansInfo) {

		var name			= politiciansInfo[i].name;
		var surname			= politiciansInfo[i].surname;
		var birthDate		= politiciansInfo[i].birthDate;
		var politicalParty	= politiciansInfo[i].politicalParty;
		var city			= politiciansInfo[i].city;
		var job 			= politiciansInfo[i].job;
		var photo			= politiciansInfo[i].photo;
		var link			= politiciansInfo[i].link;

		// Append a panel for every politician in content-main
		$('#content-main').append('<div class="panel-group" id="accordion'+count+'">\
				                <div class="panel panel-default"">\
				                    <div class="panel-heading">\
										<a data-toggle="collapse" data-target="#collapsing'+count+'" href=\'javascript:;\' class="collapsed">\
					                        <h4 class="panel-title lead">\
					                            '+ name+' '+surname +'\
					                        </h4>\
										</a>\
				                    </div>\
				                    <div id="collapsing'+count+'" class="panel-collapse collapse">\
				                        <div class="panel-body">\
				                        	<div class=\'col-xs-3\' id=\'photo\'>'+ photo +' </div>\
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
													<a target="_blank" href=\''+ link +'\'>Show on WeCitizens</a>\
												</div>\
											</div>\
				                        </div>\
				                    </div>\
				                </div>\
				            </div>');
		count++;
	}
}
