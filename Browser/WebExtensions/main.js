// import * as Papa from "node_modules/papaparse/papaparse.min"
//import * as db_reader from "utils/db_reader";

//import * as db_reader from "utils/db_reader";

var sarko = "Nicolas";

$(document).ready(function(){
	console.log('Document is ready.. scanning for politicians...');

	$('head').prepend('<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>\
  <script src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap.min.js"></script>'
	);


	$('body').append(
		'<script>\
		$(document).ready(function(){\
		    $(\'[data-toggle="popover"]\').popover();\
		});\
		</script>'
	);



    //var hashmap = db_reader.getHashMap();

		var counter = {i: 0}; //Occurences. Singleton to be passed by reference and not by value.
    $('p').each(function(index) {
			addImage(this, counter);
	  });

    $('li').each(function(index) {
			addImage(this, counter)
    });

});

function addImage(context, counter) {
	var body = $(context).text();
	var word;
	var reg = /[A-Z]+[a-z]*/gm;
	while(word = reg.exec(body)){
		console.log("while");
			if(word == sarko){
				console.log(word);
					var image = '<a href="#" data-toggle="popover" title="Popover Header" data-content="Florian a une petite bite" id="popover'+counter.i+'" class="politicianFind">\
						<img alt="sarko" src="https://s15.postimg.org/pei4ci3fv/fdp.png" class="politicianFind">\
					</a>';
					console.log("Replacing HTML");
					$(context).html(body.replace(word, word + " " + image));
					counter.i++;
					$("#popover"+counter.i).on("click",function(){
						// Select a specified element
						$('#popover'+counter.i).show();
						console.log("Click");
						window.scrollTo(0,0);
					});
			}
	}
}

function openModal(word){
    // TODO check db if match
}
