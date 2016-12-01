/** init_popover.js
 * This script handles the initialisation of the popovers that contain the info
 */

function createSinglePopover(hashmap, name, index, counter, node) {
	var cleanD = cleanData(hashmap[name][index]);

	var img = imgBuild(name, hashmap[name][index][3]);

	var url = urlBuild(name, hashmap[name][index][4], hashmap[name][index][0]);

	var html = initSinglePanel(img, cleanD[2], hashmap[name][index][2], cleanD[1], cleanD[0], url);

	var popover = String(' <span id="popoverWeCitizens"><img data-popover="true" data-placement="left" data-toggle="popover" data-trigger="hover" title="') + hashmap[name][index][4] + " " + hashmap[name][index][5] + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://i.imgur.com/neBExfj.png" class="politicianFind pop" data-content="')
	+ html + String('"></span>');

	counter.i++;

	return popover;
}


function createListPopover(hashmap, name, counter, node){
	var html = "<div class='container' id='content-main'>\
		<div class='panel-group' id='accordion'>";
	for(i = 0; i < hashmap[name].length; i++){
		var person = hashmap[name][i];
		var cleanD = cleanData(person);

		var img = imgBuild(name, person[3]);

		var url = urlBuild(name, person[4], person[0]);

		html += initMultiplePanel(counter.i, person[4], person[5], img, cleanD[2], person[2], cleanD[1], cleanD[0], url);

		counter.i++;
	}
	html += "</div></div>";

	var popover = String(' <span id="popoverWeCitizens"><img data-popover="true" data-placement="left" data-toggle="popover" data-trigger="hover" title="Politicians found" id="popover')
	+ counter.i + String('"data-html="true" src="http://i.imgur.com/neBExfj.png" class="politicianFind" data-content="')
	+ html + String('"></span>');

	return popover;
}

/*********************************************
***** Boring HTML templates functions ********
**********************************************/
function initMultiplePanel(i, firstName, lastName, img, job, party, city, bdate, url) {
	return "<div class='panel panel-default'>\
	<div class='panel-heading'>\
		<h4 class='panel-title'>\
			<a data-toggle='collapse' href='javascript:;' data-target='#collapsing"+i+"' class='collapsed'>" + firstName + " "+ lastName + "</a>\
		</h4>\
	</div>\
	<div id='collapsing"+i+"' class='panel-collapse collapse'>\
		<div class='panel-body'>\
			<div class='col-xs-4' id='photo'>"+ img +" </div>\
			<div class=\'col-xs-8\'>\
				<div class=\'row\'>\
					<strong>Job</strong>: "+ job +"\
				</div>\
				<div class=\'row\'>\
					<strong>Political party</strong>: "+ party +"\
				</div>\
				<div class=\'row\'>\
					<strong>City</strong>: "+ city +"\
				</div>\
				<div class=\'row\'>\
					<strong>Age</strong>: "+ bdate +"\
				</div>\
				<div class='row'>\
					<a target=\'_blank\' href='"+ url +"'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>"
}

function initSinglePanel(img, job, party, city, bdate, url) {
	return "<div class='panel-body'>\
		<div class='row'>\
			<div class='col-xs-3' id='photo'>"+ img +" </div>\
			<div class='col-xs-9'>\
				<div class='row'>\
					"+ job + "\
				</div>\
				<div class='row'>\
					"+ party +"\
				</div>\
				<div class='row'>\
					"+ city +"\
				</div>\
				<div class='row'>\
					"+ bdate +"\
				</div>\
				<div class='row'>\
					<a target=\'_blank\' href='"+ url +"'>Voir sur wecitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>"
}
