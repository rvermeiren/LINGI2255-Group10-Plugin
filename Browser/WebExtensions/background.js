chrome.runtime.onMessage.addListener(function (msg, sender) {
	// First, validate the message's structure
	if (msg.from === 'main' && msg.subject === 'showPageAction') {
		console.log('Message received from main.js');
		// Enable the page-action for the requesting tab
		chrome.pageAction.show(sender.tab.id);
	}
});