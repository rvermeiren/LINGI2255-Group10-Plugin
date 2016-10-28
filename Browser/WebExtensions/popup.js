$('#highlight-button').click(launchProcess);

// Update the relevant fields with the new data
function replaceHTML(html) {
	$('#collapsing').append(html);
}

//Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
	//Query for the active tab...
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
	//Send a request for the HTML info...
		chrome.tabs.sendMessage(
	   	 	tabs[0].id,
	   		{from: 'popup', subject: 'HTMLinfo'},
	   		//Specifying a callback to be called from the receiving end (content script)
	    	replaceHTML);
	});
});

function launchProcess() {
	// Call the method to trigger the search in the page.
	$('#content-main').append('<span id="politicians"></span>');
	return;
}