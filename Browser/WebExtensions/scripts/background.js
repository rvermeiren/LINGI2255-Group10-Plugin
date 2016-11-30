var counts = {}

/* Listens for tabs changes and updates the badge if it changes*/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	// Clears the notification if there was one
	chrome.notifications.clear("pol_found", function(){});
    badgeMessage();
});

chrome.notifications.onClicked.addListener(function(Id) {
	chrome.notifications.clear(Id, function(){});
});

/* This updates the badge every seconds*/
window.setInterval(function(){
	badgeMessage();
}, 4000);

/* Sends a message to the tab to know how many politicians were found*/
function badgeMessage() {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{from: 'popup', subject: 'badge'},
			function(request){
				// alert(request.notification + " "+ tabs[0].id)
				badge(request, tabs[0].id);
			});
	});
}

/* Updates the badge and sets a notification if necessary*/
function badge(request, id) {
	if (request.notification == true && request.count != counts[id.toString()] && request.count != 0) {
		notification(request.count);
	}
	counts[id.toString()] = request.count;
	// alert(request.count.toString());
	console.log(request);
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
