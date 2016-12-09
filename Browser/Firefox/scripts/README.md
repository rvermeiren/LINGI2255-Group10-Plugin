# Scripts folder
This folder contains the core JavaScript files of the extension.

## Content

* **background.js**: the background script of the extension. It is launched when
the browser starts and runs until the browser is closed. It handles the badge
with the number of politicians and the notifications.
* **content_script.js**: the content-script of the application. It runs every
time a page is loaded. It searches for politicians and inserts informationa about
them.
* **popup.js**: handles the popup with the list of politicians that are on the
web page.
