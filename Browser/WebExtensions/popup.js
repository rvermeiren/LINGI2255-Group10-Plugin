
$('#highlight-button').click(launchProcess);

console.log("Ready");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Sending answer");
    sendResponse({farewell: "goodbye"});
    return true;
  });
);

  function launchProcess() {
      // Call the method to trigger the search in the page.
      $('#content-main').append('<span id="politicians"></span>');
      return;
  }


});
