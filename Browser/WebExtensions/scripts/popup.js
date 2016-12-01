//Once the DOM is ready
window.addEventListener('DOMContentLoaded', function () {
	document.getElementById("checkbox").addEventListener("click", function(){
    	update_research(document.getElementById("checkbox"));
	});

	var retrievedObject = chrome.storage.local.get('search',
		function(result){
			if(JSON.stringify(result) != '{}')
				document.getElementById("checkbox").checked = result.search
			else document.getElementById("checkbox").checked = true
		}
	);

	//Query for the active tab
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
	//Send a request for the HTML info
		chrome.tabs.sendMessage(
	   	 	tabs[0].id,
	   		{from: 'popup', subject: 'politicianInfos'},
	   		//Specifying a callback to be called from the receiving end (content script)
	    	replaceHTML);
		console.log('Message sent from background.js');
	});

});

function update_research(cb) {
	chrome.storage.local.set({'search': cb.checked},
		function(){
			console.log("Search setted to: "+ cb.checked);
		});
}


function containsObject(obj, array) {
	var obj = JSON.stringify(obj);

    for (var i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) === obj) {
            return i;
        }
    }
    return -1;
}

// Update the relevant fields with the new data
function replaceHTML(politicianInfos) {

	for (var i in politicianInfos) {

		var name			= politicianInfos[i].name;
		var surname			= politicianInfos[i].surname;
		var birthDate		= politicianInfos[i].birthDate;
		var politicalParty	= politicianInfos[i].politicalParty;
		var city			= politicianInfos[i].city;
		var job 			= politicianInfos[i].job;
		var photo			= politicianInfos[i].photo;
		var link			= politicianInfos[i].link;

		$('#content-main').append('<div class="panel-group" id="accordion'+i+'">\
				                <div class="panel panel-default"">\
				                    <div class="panel-heading">\
				                        <h4 class="panel-title">\
				                            <a data-toggle="collapse" data-target="#collapsing'+i+'" href=\'javascript:;\' class="collapsed">' + name + " "
				                            + surname + '</a>\
				                        </h4>\
				                    </div>\
				                    <div id="collapsing'+i+'" class="panel-collapse collapse">\
				                        <div class="panel-body">\
				                        	<div class=\'col-xs-3\' id=\'photo\'>'+ photo +' </div>\
				                        	<div class=\'col-xs-9\'>\
												<div class=\'row\'>\
													<strong>Job</strong>: '+ job +'\
												</div>\
												<div class=\'row\'>\
													<strong>Political party</strong>: '+ politicalParty +'\
												</div>\
												<div class=\'row\'>\
													<strong>City</strong>: '+ city +'\
												</div>\
												<div class=\'row\'>\
													<strong>Age</strong>: '+ birthDate +' years old\
												</div>\
												<div class=\'row\'>\
													<a target="_blank" href=\''+ link +'\'>Voir sur wecitizens</a>\
												</div>\
											</div>\
				                        </div>\
				                    </div>\
				                </div>\
				            </div>');
	}
}
