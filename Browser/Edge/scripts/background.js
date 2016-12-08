/*
 * background.js: This document manages the badge and notifications of the
 * extension. It sends a message to the content script every seconds to know
 * the number of politicians spotted. Then it sets the badge that appears over
 * the plugin icon on the upper right of the browser. If it is a pdf document,
 * it will make a notification appear as well when the page is loaded
 */


// This counts the number of politicians encountered on webpages
// There is one count per tab
var counts = {}

/* Listens for tabs changes and updates the badge if it changes*/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	// Clears the notification if there was one
    badgeMessage();
});


/* This updates the badge every seconds*/
window.setInterval(function(){
	badgeMessage();
}, 1000);

/* Sends a message to the tab to know how many politicians were found*/
function badgeMessage() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		// query the content script
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'badge'},
			function(request){ // on response received
				badge(request, tabs[0].id);
			});
	});
}

/* Updates the badge and sets a notification if necessary*/
function badge(request, id) {
	// if the document is a pdf and the counter has been updated and there are politicians
	if (request.notification == true && request.count != counts[id.toString()] && request.count != 0) {
	}
	// updates the counter of this tab
	counts[id.toString()] = request.count;
	// sets the badge
	chrome.browserAction.setBadgeText({text: request.count.toString()})
}

/* Displays a notification with how many politicians were found in the pdf*/
function notification(count) {
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
