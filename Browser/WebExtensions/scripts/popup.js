var count = -1;

//Once the DOM is ready
window.addEventListener('DOMContentLoaded', function () {
	document.getElementById("checkbox").addEventListener("click", function(){
    	update_research(document.getElementById("checkbox"));
	});

	var retrievedObject = chrome.storage.local.get('search',
		function(result){
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
	//Send a request for the HTML info
		chrome.tabs.sendMessage(
	   	 	tabs[0].id,
	   		{from: 'popup', subject: 'politicianInfos'},
	   		//Specifying a callback to be called from the receiving end (content script)
	    	replaceHTML);
		console.log('Message sent from popup.js');
	});

});

/* Listens for tabs changes and updates the badge if it changes*/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	// Clears the notification if there was one
	chrome.notifications.clear("pol_found", function(){});
	count = 0;
    badgeMessage();
});

chrome.notifications.onClicked.addListener(function(Id) {
	chrome.notifications.clear(Id, function(){});
});

/* This updates the badge every 2 seconds*/
window.setInterval(function(){
	badgeMessage();
}, 1000);

/* Sends a message to the tab to know how many politicians were found*/
function badgeMessage() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'badge'},
			badge);
	});
}

/* Updates the badge and sets a notification if necessary*/
function badge(request) {
	if (request.notification == true && request.count != count && request.count != 0) {
		count = request.count;
		notification(request.count);
	}
	chrome.browserAction.setBadgeText({text: request.count.toString()})
}

/* Displays a notification with how many politicians were found in the pdf*/
function notification(count) {
	console.log("HERE");
	chrome.notifications.create(
        'pol_found',{
            type:"basic",
            title:"We Citizens",
            message: count + " politicians were found in this document.",
            iconUrl:chrome.extension.getURL("../icons/icon128.png"),
			contextMessage: "Click on the We Citizens icon in the top right of the browser to show the list"
        },
        function() {}
    );
}

function update_research(cb) {
	chrome.storage.local.set({'search': cb.checked},
		function(){
			console.log("Search setted to: "+ cb.checked);
		});
}


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

		var index = containsObject(politicianInfos[i], politicianInfos);

		var alreadyMet = (index >= i);

		if (alreadyMet) {

			console.log("alreadyMet");

			var name			= politicianInfos[i].name;
			var surname			= politicianInfos[i].surname;
			var birthDate		= politicianInfos[i].birthDate;
			var politicalParty	= politicianInfos[i].politicalParty;
			var city			= politicianInfos[i].city;
			var job 			= politicianInfos[i].job;
			var photo			= politicianInfos[i].photo;
			var link			= politicianInfos[i].link;

			$('#content-main').append('<div class="panel-group" id="accordion'+i+'">\
					                <div class="panel panel-default"">\
					                    <div class="panel-heading">\
					                        <h4 class="panel-title">\
					                            <a data-toggle="collapse" data-target="#collapsing'+i+'" href="#collapsing" class="collapsed">' + name + " "
					                            + surname + '</a>\
					                        </h4>\
					                    </div>\
					                    <div id="collapsing'+i+'" class="panel-collapse collapse">\
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
														<strong>Age</strong>: '+ birthDate +' years old\
													</div>\
													<div class=\'row\'>\
														<a target="_blank" href=\''+ link +'\'>Voir sur wecitizens</a>\
													</div>\
												</div>\
					                        </div>\
					                    </div>\
					                </div>\
					            </div>');
		}
	}
}
