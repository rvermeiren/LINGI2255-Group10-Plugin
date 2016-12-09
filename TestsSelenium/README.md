# WeCitizens.be : Plugin tests
The tests are written in Java, run on Google Chrome or Chromium and use libraries from [Selenium](http://www.seleniumhq.org/), an automation tool for browsers.

## Files

- __makefile__ : used to run the tests easily with the right arguments
- __MainTests.java__ : source code of the tests
- __SeleniumTests.jar__ : runnable .jar used by the makefile to run the tests
- __chromedriver__ : executable file needed by selenium to open Chrome / Chromium (specific file for Linux systems)
- __Chrome.crx__ : file containing our plugin, compiled in a Chrome extension
- __rudy_demotte_wiki.html__ : sample file used to test the plugin, containing the Wikipedia page of Rudy Demotte, in english
- __rudy_demotte_wiki_files__ : files needed to display correctly *rudy_demotte_wiki.html* in the browser

## Tests installation

* Download the .zip file at this link: https://goo.gl/4OT13n
* Extract the files in the directory of your choice.

## Running the tests

* Open a terminal in the same directory where you extracted the files;
* Type "make", the tests will be launched automatically.

The makefile runs the .jar file with 3 arguments :
- an executable file needed by Selenium to run Chrome / Chromium
- a .crx containing our plugin as a Chrome extension
- the current absolute path (found by the command *${CURDIR}*)
