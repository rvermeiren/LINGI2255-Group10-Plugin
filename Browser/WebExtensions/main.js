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

			if(word == name){
					var image = '<img data-toggle="popover" title="Nom du politicien" data-trigger="hover"\
					id="popover'+counter.i+'" class="politicianFind" alt="sarko" data-html="true"\
					src="https://s15.postimg.org/pei4ci3fv/fdp.png" class="politicianFind"\
					data-content="'+name+'"\
					 >';
					$(context).html(body.replace(word, word + " " + image));
					chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
					  console.log(response.farewell);
					});
					counter.i++;
			}
	}
}




function openModal(word){
    // TODO check db if match
}
