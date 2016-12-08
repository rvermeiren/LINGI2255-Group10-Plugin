/** content-script.js
 * This script is executed for every page
 * It searches for politicians names, and adds an image next to them.
 * When hovering the image, it displays more info about the corresponding
 * politician(s)
 */

// indicates if the page is a pdf or not
var pdf = false;
// hashmap that contains infomation about the politicians
var politiciansInfo = {};

/*********************************************
************ Start functions *****************
**********************************************/

// When the page is loaded
$(document).ready(function(){
	// "Search" in local storage tell us if the search is activated or not
	var retrievedObject = chrome.storage.local.get('search',
		function(result){
			// == '{}' checks if "Search" is present or not
			if (JSON.stringify(result) == '{}') {start(true); }
			else start(result.search);
		}
	);
});

// Start searching for politicians
function start(search){
	// Check if it is a pdf file
	var url = document.location.href;
	if (url.substr(url.length-3, url.length) == "pdf")
		pdf=true;
	else
		pdf=false;

	// If the search checkbox is activated
	if(search) {
		// Retrieve the database
		chrome.storage.local.get('database_hashmap',
			function(result){
					hashmap = result.database_hashmap;
					if (pdf){
						launchPDFSearch(hashmap, url);
					}
					else {
						launchHTMLSearch(hashmap);
					}
			});
	}


	// Message passing with the popup - useful to pass the politician info for
	// the popup, the notification and the badge.
	chrome.runtime.onMessage.addListener(function (msg, sender, response) {
		if ((msg.from === 'popup') && (msg.subject === 'politiciansInfo')) {
			response(politiciansInfo);
		}
		else if ((msg.from === 'popup') && (msg.subject === 'badge')) {
			response({notification: pdf, count: Object.keys(politiciansInfo).length});
		}
	});
}

// Search the pdf for politicians
function launchPDFSearch(hashmap, url) {

	// Mandatory for PDFJS
	PDFJS.workerSrc = chrome.extension.getURL("../lib/pdf.worker.js");
	var counter = {i : 0};

	// Load text from PDF then launch the search on it
	PDFJS.getDocument(url).then(function(pdf) {
		var maxPages = pdf.pdfInfo.numPages;
		for (var j = 1; j < maxPages; j++) {
			// Get the text from every page
			var page = pdf.getPage(j).then(function(page) {
				var textContent  = page.getTextContent().then(function(textContent){
					for(var i = 0; i < textContent.items.length; i++) {
						scanText(null, null, textContent.items[i].str, counter, true);
					}
				});
			});
		}
	});
}

// Search the HTML page for politicians
function launchHTMLSearch(hashmap) {
	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.
	var arr = textNodesUnder(document.body);
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].childNodes.length; j++) {
			if (arr[i].childNodes[j].nodeType == Node.TEXT_NODE) {
				scanText(arr[i], j, arr[i].childNodes[j], counter, false);
				j++;
			}
		}
	}

	// Let the popover opened if we hover over it
	$('head').append(popoverSettings);

}

// Returns all of the DOM nodes that contains text nodes
function textNodesUnder(el){
	var pred;
	var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
	while(n=walk.nextNode()){
		if (pred != n.parentNode)
		a.push(n.parentNode);
		pred = n.parentNode;
	}
	return a;
}

/*********************************************
**** Search through textNode and add icons ***
**********************************************/

/* The hashmap we use in the following functions has this structure
0 : num				5 : last name
1 : id				6 : birth date
2 : party			7 : city
3 : photoID			8 : job
4 : first name					*/

// List of the prefixes :
var prefixes = {"De":true, "Van":true, "Di":true, "Vanden":true, "Ver":true};


// Scan textNode for politicians
function scanText(parent, nodeIndex, textNode, counter, pdf) {
	// Array containing the spans we will display next to the spotted names
	var toDisplay = [];
	// Array containing the politicians to add to the extension popup
	var politiciansToAdd = []
	// The raw text we will scan
	var body;
	if (pdf)
		body = textNode;
	else
		body = textNode.textContent;

	// Prev is the previous match of the regex
	// Pref is a prefix
	// Word is the current match of the regex
	var prev, pref, word;
	// Number of politicians pushed on politiciansToAdd the last time we pushed
	var pushed = 0;
	// Possible lastnames' prefixes
	var prefix = ["", "den ", "der ", "de ", "van "];
	// Match the word beginning with an uppercase letter
	var reg = /[A-Z]+[a-z\-]*/gm;
	while(word = reg.exec(body)){
		if (word in prefixes){
			pref = word;
			continue;
		}
		var name;
		var found = false;
		var iter = 0;
		while (!found && iter < prefix.length) {
			// Search for prefixes
			if (pref != null) {
				name = pref + " " + prefix[iter] + word;
			} else {
				name = prefix[iter] + word;
			}
			// Search for the name in the hashmap
			if (name in hashmap){
				found = true;
				var mapIndex = null;
				// If only one politician has this name
				var twoNames = false;
				if(hashmap[name].length == 1) {
					mapIndex = 0;
				}
				// If a politician has his first name cited just before his last name in the text
				else for (var i in hashmap[name]) {
					if (prev == hashmap[name][i][4]) { //Matching also firstname
						// We delete the politicians we found that matched the first names
						toDisplay.pop()
						for(var j = 0; j < pushed; j++) {
							politiciansToAdd.pop();
						}
						// Position of the politician in the hashmap
						mapIndex = i;
						// We spotted the two names of the politician
						twoNames = true;
					}
				}
				var nameLength = name.length;
				if(twoNames) {
					prev += " "
					nameLength += prev.length;
				}
				else {
					prev = "";
				}
				// pushed is the number of politicians we found with this name
				pushed = pushPoliticians(mapIndex, hashmap, name, politiciansToAdd, toDisplay, counter, nameLength, reg.lastIndex, prev);
				pref = null;
			}
			prev = word;
			iter++;
		}
	}
	for(var i = 0; i < politiciansToAdd.length; i++) {
		// We add the politicians we found in this part of the text in politiciansInfo, which is useful for the popup
		politiciansInfo[politiciansToAdd[i].name+politiciansToAdd[i].surname] = politiciansToAdd[i];
	}
	// Display the images that toggle the popovers
	if(toDisplay.length > 0 && !pdf) {
		displayIcons(textNode, parent, toDisplay);
	}
}

// Add politicians to toDisplay, to display to display it later netx to the names
function pushPoliticians(mapIndex, hashmap, name, politiciansToAdd, toDisplay, counter, nameLength, HTMLindex, firstName) {
	// First name of the politician was spotted
	if (mapIndex != null) {
		person = hashmap[name][mapIndex];
		// Add it to politiciansToAdd
		addPolitician(politiciansToAdd, person)
		pushed = 1;
		// Add it in the list that will be displayed in the text
		if(!pdf)
			toDisplay.push({
				"index" : HTMLindex,
				"nameLength" : nameLength,
				"span" : firstName + person[5] + createSinglePopover(hashmap, person[5], mapIndex, counter)
			});
	}
	//Multiple policitians
	else {
		for(i = 0; i < hashmap[name].length; i++){
			person = hashmap[name][i]
			// Add it to politiciansToAdd
			addPolitician(politiciansToAdd, person);
		}
		pushed = hashmap[name].length;
		if(!pdf)
		// Add it in the list that will be displayed in the text
			toDisplay.push({
				"index" : HTMLindex,
				"nameLength" : nameLength,
				"span" : name + createListPopover(hashmap, person[5], counter)
			});
	}
	// pushed is the number of politicians we pushed in politiciansToAdd
	return pushed;
}

// Push person in politiciansToAdd, which will extend politiciansInfo
function addPolitician(politiciansToAdd, person) {
	var info = cleanData(person);
	var img = imgBuild(info[5], info[3]);
	var url = urlBuild(info[5], info[4], info[0]);
	politiciansToAdd.push({
		name: info[4],
		surname: info[5],
		birthDate: info[6],
		politicalParty: info[2],
		city: info[7],
		job: info[8],
		photo: img,
		link: url}
	);
}

// Display icons next to politicians names. These will toggle popovers with more info
function displayIcons(textNode, parent, toDisplay) {
	// The text when we place the icons
	var text = textNode.nodeValue;

	var fragment = document.createDocumentFragment();

	// We add icons starting from the end
	for(var i = 0; i < toDisplay.length; i++) {
		var icon = toDisplay.pop();
		// Add the end of the textNode
		if((icon.index) < text.length)
			fragment.insertBefore(document.createTextNode(text.substr(icon.index)), fragment.firstChild);

		// Add the span containing the icon and the popover
		var toAdd = document.createElement("span");
		toAdd.innerHTML = icon.span;
		fragment.insertBefore(toAdd, fragment.firstChild);

		// Now we handle the rest of the names, the ones in the beginning of the text
		text = text.substr(0, icon.index-icon.nameLength);
	}
	// We prepend the start of the text, where no icons have to be added
	fragment.insertBefore(document.createTextNode(text), fragment.firstChild);
	// Replace the original node with the modified one
	parent.replaceChild(fragment, textNode);
}
