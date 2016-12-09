# We Citizens browser extensions
This extension was created for the http://www.wecitizens.be/ association. It
searches for politicians on the web pages you visit, and displays information
about them next to their name. It also links to the politician's entry in the
political directory.

## Installation

To install and test it, visit the folder with the name of your browser.

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
on the page.
* When reading an online *PDF*, it only displays information in the top-right
corner list. A notification will tell you how many were spotted in the document.

## Folder structure

This section is adressed to people who want to go one step further, or who want
to modify the extension. Every folder contains *README* files with more
information about their content.

This folder contains these elements :

* **Chrome/**: source code for the Google Chrome and Opera extension
* **Edge/**: source code for the Microsoft Edge extension
* **Firefox**: source code for the Mozilla Firefox extension
* **Chrome.pem**: key to generate the Chrome extension
* **We_Citizens_Browsers_Plugin.zip**: archive containing all the source code
