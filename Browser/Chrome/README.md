# We Citizens extension for Chrome and Opera

This extension was created for the http://www.wecitizens.be/ association. It
searches for politicians on the web pages you visit, and displays information
about them next to their name. It also links to the politician's entry in the
political directory.

The following instructions and information are written for Chrome. However,
there are also directly applicable for Opera.


## Installation

The extension is not on the Chrome Web Store at the moment
(https://chrome.google.com/webstore/category/extensions).

To install and test it, there are two options.

### From the *Chrome.crx* file

If the *Chrome.crx* file is present in the folder, you can follow these steps.

1. Open Chrome and type *chrome://extensions* in the adress bar.
2. Once there, check the box next to **Developer mode**
3. Then, you can simply drag and drop the *Chrome.crx* file in the tab where
*chrome://extensions* is opened. Ignore the security warnings, they are there
because the extension in not on the Chrome Web Store yet.

### Without the *Chrome.crx* file

If the Chrome.crx file is not present in the folder, or if you made changes to
the extension and want to test them, you can follow these steps.

1. Open Chrome and type chrome://extensions in the adress bar.
2. Once there, check the box next to **Developer mode**
3. Click on **Load unpacked extension...**
4. A window to select a folder is opened. Select the folder where this README is
located. Ignore the security warnings, they are there because the extension is
not on the Chrome Web Store yet.

You can also create a crx file (for example, if you made changes to the
extension) by clicking on **Pack extension**. The key file is *../Chrome.pem*.

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

* **css/**: stylesheets useful for the extension
* **icons/**: icons to be displayed in the top-right corner of the browser
* **lib/**: JavaScript libraries (This extension uses Bootstrap, jQuery and
	PDF.JS)
* **scripts/**: core JavaScript files of the extension
* **utils/**: auxiliary JavaScript files of the extension
* **views/**: the HTML pattern for the extension popup
* **Chrome.crx**: the extension file
* **../Chrome.pem**: a key file, needed to pack the extension
* **manifest.json**: mandatory for Chrome to recognise the extension
