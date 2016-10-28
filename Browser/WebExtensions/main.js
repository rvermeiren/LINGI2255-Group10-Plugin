var name = "Nicolas";

$(document).ready(function(){
	// console.log('Document is ready.. scanning for politicians...');


    //var hashmap = db_reader.getHashMap();

	var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.
    $('p').each(function(index) {
			addImage(this, counter);
	  });

    $('li').each(function(index) {
			addImage(this, counter)
    });

	$('head').append(
		"<script>$(function(){$('[data-toggle=\"popover\"]').popover();});\
		</script>"
	);

});



function addImage(context, counter) {
	var body = $(context).text();
	var word;
	var reg = /[A-Z]+[a-z]*/gm;
	while(word = reg.exec(body)){
		for (var n in hashmap){
			if (n == word){
				var html = "\
				<div class='panel-body'>\
					<div class='row'>\
						<div class='col-xs-2' id='photo'> <i class='material-icons md-60'>face</i> </div>\
						<div class='col-xs-10'>\
							<div class='row'>\
								FN\
							</div>\
							<div class='row'>\
								69/05/1969\
							</div>\
							<div class='row'>\
								Houte-Si-Ploue\
							</div>\
							<div class='row'>\
								<a href='https://www.youtube.com/watch?v=AmYrTp-JdnY'>Voir sur wecitizens</a>\
							</div>\
						</div>\
					</div>\
				</div>"

				var image = String('<span id="popoverWeCitizens"><img data-toggle="popover" title="Nom du politicien" data-trigger="hover" id="popover')
				+ counter.i + String('"data-html="true" src="https://s15.postimg.org/pei4ci3fv/fdp.png" class="politicianFind" data-content="')
				+ html + String('"></span>');
				console.log(image);
				$(context).html(body.replace(word, word + " " + image));
				chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
				  console.log(response.farewell);
				});
				counter.i++;
			}
		}
	}
}




function openModal(word){
    // TODO check db if match
}
