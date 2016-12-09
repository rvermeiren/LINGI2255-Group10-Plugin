# WeCitizens.be : Microsoft Word add-in

This add-in was developed for Microsoft Word, on [Visual Studio](https://www.visualstudio.com/), in Javascript, HTML and CSS.

It will not be available on the official Office store, because we cannot publish it without paying (check https://dev.office.com/docs/add-ins/publish/publish for further details). 
You will need Visual Studio to run the project and try the add-in.

Finally, we are not able yet to load the online database of the politicians, due to security restrictions in Windows products. We can load it locally, but the user of the add-in has to give it.

In spite of these issues, the search algorithm for spotting politicians, which is the core of the add-in, is almost finished. It can thus be a nice foundation to produce a fully accomplished Word add-in.
## Important files
The project depends on many files created automatically by Visual Studio when creating a new project. However
the files needed to develop the add-in are "classic" web files: a Javascript, HTML and CSS file.
These files are located in __WeCitizens_Word/WeCitizens_WordWeb__.
- __Home.js__ : contains the main Javascript code which handles the behaviour of the add in
- __Home.html__ and __Home.css__ : defines the layout and the structure of the add-in

## Installation

Go to that page : https://dev.office.com/getting-started/addins, then:

1. Below "Choose the Office product you will build your add-in for" select "Word"
2. Scroll down a bit and skip the "Explore Word Add-ins" video;
3. Below "Build" click on "Visual Studio";
4. Follow only the first step (download the Office Developer Tools for Visual Studio 2015);
85. You can now open Visual Studio;
6. Go to https://goo.gl/qlcuwp and download the WeCitizens .zip file;
7. Unzip the file to your favorite directory;
8. Open the WeCitizens_Word directory and open the "WeCitizens_Word" file with
Visual Studio;

## Running

1. Before starting the add-in, make sure you have Microsoft Word 2013 or later installed
on your computer;
2. Click on "Start" of press F5 to start the add-in, which will automatically open Word;
3. Above the button "Search for politicians", you can click on "Browse" button. You
can now upload any database file in the CSV format. In this case it is of course the
website’s database;
4. Type any name matching a politician (Paul Magnette for example) and click on "Search
for politicians". The names found will be displayed, just click on any politician to see more information about him.
