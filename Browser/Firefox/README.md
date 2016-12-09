# We Citizens extension for Mozilla Firefox

This extension was created for the http://www.wecitizens.be/ association. It
searches for politicians on the web pages you visit, and displays information
about them next to their name. It also links to the politician's entry in the
political directory.


## Installation

The extension is not on the Mozilla Store at the moment.

1. Open Firefox and type *about:debugging* in the adress bar.
2. Once there, check the box next to **Activate the modules debugging**.
3. Then, you can Click on "Load a temporary module" and select the *firefox.xpi*
file in this folder.

To create this *.xpi* file :
* On Linux/Mac OS, simply *make* in a terminal.
* On windows, zip the files in this folder and change the extension from *.zip*
to *.xpi*.

## Use

The extension is used this way:

* When visting web pages, it spots belgian politicians
* It then adds a small image next to their name
* When hovering the image, a popup is displayed with information about the
politician, or with a list of corresponding politicians if there are multiple
matches.
* It is also possible to click on the extension icon (in the top-right corner).
Every politician that is mentionned in the page and their information are
available there as well. A little badge directly tells you how many were spotted
on the page. It is also possible to disable the research from there, the plugin will keep track of the user preferences.
* When reading an online *PDF*, it only displays information in the top-right
corner list. A notification will tell you how many were spotted in the document.

## Folder structure

This section is adressed to people who want to go one step further, or who want
to modify the extension. Every folder contains *README* files with more
information about their content.

This folder contains these elements :

* **css/**: stylesheets useful for the extension
* **icons/**: icons to be displayed in the top-right corner of the browser
* **lib/**: JavaScript libraries (This extension uses Bootstrap, jQuery and
	PDF.JS)
* **scripts/**: core JavaScript files of the extension
* **utils/**: auxiliary JavaScript files of the extension
* **views/**: the HTML pattern for the extension popup
* **firefox.xpi**: the extension file
* **manifest.json**: mandatory for Chrome to recognise the extension
