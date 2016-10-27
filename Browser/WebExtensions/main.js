$(document).ready(function(){
	var name = "Nicolas";
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
					var image = '<a href="#" data-toggle="popover" title="Popover Header" data-content="Florian a une petite bite" id="popover'+counter.i+'" class="politicianFind">\
						<img alt="sarko" src="https://s15.postimg.org/pei4ci3fv/fdp.png" class="politicianFind">\
					</a>';
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
