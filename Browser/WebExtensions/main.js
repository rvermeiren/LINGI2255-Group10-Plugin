var sarko = "Nicolas";

$(document).ready(function(){
	console.log('Document is ready.. scanning for politicians...');

	$('head').prepend('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>\
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'
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
			if(word == sarko){
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
