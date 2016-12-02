/** init_popover.js
 * This script handles the initialisation of the popovers that contain the info
 */

function createSinglePopover(hashmap, name, index, counter) {
	var cleanD = cleanData(hashmap[name][index]);

	var img = imgBuild(name, hashmap[name][index][3]);

	var url = urlBuild(name, hashmap[name][index][4], hashmap[name][index][0]);

	var html = initSinglePanel(img, cleanD[8], hashmap[name][index][2], cleanD[7], cleanD[6], url);

	var popover = String(' <span id="popoverWeCitizens">\
	<style scoped><link href=\'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\' rel=\'stylesheet\' integrity=\'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\' crossorigin=\'anonymous\'></style>\
	<img data-popover="true" data-placement="left" data-toggle="popover" data-trigger="hover" title="') + hashmap[name][index][4] + " " + hashmap[name][index][5] + String('" id="popover')
	+ counter.i + String('"data-html="true" src="http://i.imgur.com/neBExfj.png" class="politicianFind pop" data-content="')
	+ html + String('"></span>');

	counter.i++;

	return popover;
}


function createListPopover(hashmap, name, counter){
	var html = "<div class='container' id='content-main'>\
		<div class='panel-group' id='accordion'>";
	for(i = 0; i < hashmap[name].length; i++){
		var person = hashmap[name][i];
		var cleanD = cleanData(person);

		var img = imgBuild(name, person[3]);

		var url = urlBuild(name, person[4], person[0]);

		html += initMultiplePanel(counter.i, person[4], person[5], img, cleanD[8], person[2], cleanD[7], cleanD[6], url);

		counter.i++;
	}
	html += "</div></div>";

	var popover = String(' <span id="popoverWeCitizens">\
	<style scoped><link href=\'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\' rel=\'stylesheet\' integrity=\'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\' crossorigin=\'anonymous\'></style>\
	<img data-popover="true" data-placement="left" data-toggle="popover" data-trigger="hover" title="Politicians found" id="popover')
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
					<a target=\'_blank\' href='"+ url +"'>Show on WeCitizens</a>\
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
					<strong>Job</strong>: "+ job + "\
				</div>\
				<div class='row'>\
					<strong>Party</strong>: "+ party +"\
				</div>\
				<div class='row'>\
					<strong>City</strong>: "+ city +"\
				</div>\
				<div class='row'>\
					<strong>Age</strong>: "+ bdate +"\
				</div>\
				<div class='row'>\
					<a target=\'_blank\' href='"+ url +"'>Show on WeCitizens</a>\
				</div>\
			</div>\
		</div>\
	</div>"
}

var popoverSettings = "<script>\
function get_popover_placement(pop, dom_el) {\
	var width = window.innerWidth;\
	var left_pos = $(dom_el).offset().left;\
	if (width - left_pos > 600) return 'right';\
	return 'left';\
}\
var $ = jQuery.noConflict();\
	$(function(){\
		console.log($(\'[data-toggle=\"popover\"]\')\
		.popover);\
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
