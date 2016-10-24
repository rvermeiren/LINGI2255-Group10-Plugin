KangoAPI.onReady(function() {

    $(document).ready(function () {
        $('#highlight-button').click(launchProcess);
    });

    function launchProcess() {
        // Call the method to trigger the search in the page.
        $('#content-main').append('<span id="politicians"></div>');
        return;
    }
});