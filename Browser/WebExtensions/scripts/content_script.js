/** content-script.js
 * This script is executed for every page
 * It searches for politicians names, and adds an image next to them.
 * When hovering the image, it displays more info about the corresponding
 * politician(s)
 */

// indicates if the page is a pdf or not
var pdf = false;
// hashmap that contains infomation about the politicians
var politicianInfos = {};


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
		var retrievedObject = chrome.storage.local.get('database_csv',
			function(result){
				hashmap = CSVToHashmap(result.database_csv);
				if (pdf){
					launchPDFSearch(hashmap, url);
				}
				else {
					launchHTMLSearch(hashmap);
				}
			}
		);
	}

	// Message passing with the popup - useful to pass the politician infos for
	// the popup, the notification and the badge.
	chrome.runtime.onMessage.addListener(function (msg, sender, response) {
		if ((msg.from === 'popup') && (msg.subject === 'politicianInfos')) {
			response(politicianInfos);
		}
		else if ((msg.from === 'popup') && (msg.subject === 'badge')) {
			response({notification: pdf, count: Object.keys(politicianInfos).length});
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
						inspectTextNode(null, null, textContent.items[i].str, counter, true);
					}
				});
			});
		}
	});
}

function launchHTMLSearch(hashmap) {
	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.
	var arr = textNodesUnder(document.body);
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[i].childNodes.length; j++) {
			if (arr[i].childNodes[j].nodeType == Node.TEXT_NODE) {
				inspectTextNode(arr[i], j, arr[i].childNodes[j], counter, false);
				j++;
			}
		}
	}

	// Let the popover opened if we hover over it
	$('head').append(
		"<script>\
		function get_popover_placement(pop, dom_el) {\
			var width = window.innerWidth;\
			var left_pos = $(dom_el).offset().left;\
			if (width - left_pos > 600) return 'right';\
			return 'left';\
 		}\
		$(function(){\
			$(\'[data-toggle=\"popover\"]\')\
			.popover({ trigger: \"manual\", placement: get_popover_placement, html: true, animation:true})\
			.on(\"mouseenter\", function () {\
				var _this = this;\
				$(this).popover(\"show\");\
				$(\".popover\").on(\"mouseleave\", function () {\
					$(_this).popover('hide');\
				});\
			}).on(\"mouseleave\", function () {\
				var _this = this;\
				setTimeout(function () {\
					if (!$(\".popover:hover\").length) {\
						$(_this).popover(\"hide\");\
					}\
				}, 300);\
			});\
		});\
		</script> "
	);

}

//
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

function inspectTextNode(parent, nodeIndex, textNode, counter, pdf) {
	var toDisplay = [];
	var politiciansToAdd = []
	var body;
	var pushed = 0;
	if (pdf)
		body = textNode;
	else
		body = textNode.textContent;
	// console.log(body);
	var prev, pref, word;
	var prefix = ["", "den ", "der ", "de ", "van "];
	var reg = /[A-Z]+[a-z\-]*/gm;
	var i = 0;
	// for(i; i<word.length; i++) {
	while(word = reg.exec(body)){
		if (word == "De" || word == "Van" || word == "Di" || word == "Vanden" || word == "Ver"){		//Di Rupo rpz
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
				var matching = [];
				var pol = null;
				// If only one politician has this name
				var twoNames = false;
				if(hashmap[name].length == 1) {
					pol = 0;
				}
				// If a politician has his first name cited just before his last name in the text
				else for (var i in hashmap[name]) {
					matching.push(hashmap[name][i]);
					if (prev == hashmap[name][i][4]) { //Matching also firstname
						toDisplay.pop()
						for(var j = 0; j < pushed; j++) {
							politiciansToAdd.pop();
						}
						pol = i;
						twoNames = true;
					}
				}
				var nameLength = name.length;
				if(twoNames) {
					prev += " "
					nameLength += prev.length;
				}
				else {
					prev = ""
				}

				// Only one politician
				if (pol != null) {
					var lastName = hashmap[name][pol][4];
					var firstName = hashmap[name][pol][5];
					person = hashmap[name][pol];
					var infos = cleanData(person);
					pushed = 1;
					var img = imgBuild(name, person[3]);
					var url = urlBuild(name, person[4], person[0]);
					politiciansToAdd.push({name: lastName, surname: firstName, birthDate: infos[0], politicalParty: hashmap[name][pol][2], city: infos[1], job: infos[2], photo: img, link: url});
					if(!pdf)
						toDisplay.push({"index" : reg.lastIndex, "nameLength" : nameLength ,"span" : prev + name + createSinglePopover(hashmap, name, pol, counter, parent)});
				}
				//Multiple policitians
				else {
					for(i = 0; i < hashmap[name].length; i++){
						person = hashmap[name][i]
						var infos = cleanData(person)
						var img = imgBuild(name, person[3]);
						var url = urlBuild(name, person[4], person[0]);
						politiciansToAdd.push({name: person[4], surname: name, birthDate: infos[0], politicalParty: person[2], city: infos[1], job: infos[2], photo: img, link: url});
					}
					pushed = hashmap[name].length;
					if(!pdf)
						toDisplay.push({"index" : reg.lastIndex, "nameLength" : nameLength ,"span" : prev + name + createListPopover(hashmap, name, counter, parent)});
				}
				pref = null;
			}
			prev = word;
			iter++;
		}
	}
	for(var i = 0; i < politiciansToAdd.length; i++) {
		politicianInfos[politiciansToAdd[i].name+politiciansToAdd[i].surname] = politiciansToAdd[i];
	}
	if(toDisplay.length > 0 && !pdf) {
		displayIcons(textNode, parent, toDisplay);
	}
}

function displayIcons(textNode, parent, toDisplay) {
	var ret = textNode.nodeValue;

	var fragment = document.createDocumentFragment();
	for(var i = 0; i < toDisplay.length; i++) {
		var icon = toDisplay.pop();
		// console.log(icon.index);
		// Add the end of the textNode
		if((icon.index) < ret.length)
			fragment.insertBefore(document.createTextNode(ret.substr(icon.index)), fragment.firstChild);

		// Add the span containing the icon and the popover
		var toAdd = document.createElement("span");
		toAdd.innerHTML = icon.span;
		fragment.insertBefore(toAdd, fragment.firstChild);


		// Now we handle the rest of the names, the ones in the beginning of the text
		ret = ret.substr(0, icon.index-icon.nameLength);
	}
	fragment.insertBefore(document.createTextNode(ret), fragment.firstChild);
	parent.replaceChild(fragment, textNode);
}
