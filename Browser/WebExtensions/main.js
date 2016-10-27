
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
		// console.log("while");
			if(word == name){
				// console.log(word);
					var image = '<a href="#" data-toggle="popover" title="Popover Header" data-content="A wonderful content" id="popover'+counter.i+'" class="politicianFind">\
						<img alt="name" src="https://s15.postimg.org/pei4ci3fv/fdp.png">\
					</a>';
					// console.log("Replacing HTML");
					$(context).html(body.replace(word, word + " " + image));
					counter.i++;
			}
	}
}

function openModal(word){
    // TODO check db if match
}
