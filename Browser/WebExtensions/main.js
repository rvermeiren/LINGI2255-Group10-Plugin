// import * as Papa from "node_modules/papaparse/papaparse.min"
//import * as db_reader from "utils/db_reader";

//import * as db_reader from "utils/db_reader";

var sarko = "Sarkozy";

$(document).ready(function(){

	$('head').append(
	  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>\
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

    //$('head').append("<script type='text/javascript'> $(\".politicianFind\").click(function() {alert(\"WeCitizens\");}); </script>");

    $('p').each(function(index) {

        var body = $(this).html();
        // console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            if(word == sarko){
                var image = '<a href="#" data-toggle="popover" title="Popover Header" data-content="Florian a une petite bite" id="popover">\
									<img alt="sarko" src="https://s15.postimg.org/pei4ci3fv/fdp.png" class="politicianFind">\
								</a>';


                $(this).html(body.replace(word, word + " " + image));
            }

        }
    });

    $('li').each(function(index) {

        var body = $(this).html();
        // console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            if(word == sarko){
                var image = "<img alt=\"sarko\" src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
                + " class=\"politicianFind\">";

                $(this).html(body.replace(word, word + " "+ image));
            }

        }
    });

    // $('meta').each(function(index) {
	//
    //     var body = $(this).html();
    //     // console.log(body);
    //     var word;
    //     var reg = /[A-Z]+[a-z]*/gm;
    //     while(word = reg.exec(body)){
	//
    //         if(word == sarko){
    //             var image = "<img alt=\"sarko\" src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
    //             + " class=\"politicianFind\">";
	//
    //             $(this).html(body.replace(word, word + " " + image));
    //         }
	//
    //     }
    // });


	function showImage(fullPath){
		var id = '#dialog';

		//Get the screen height and width
		var maskHeight = $(window).height();
		var maskWidth = $(window).width();
		var fullImagePath = "http://www.hdbloggers.net/wp-content/uploads/2016/06/Nature.jpg";


		//Set heigth and width to mask to fill up the whole screen
		$('#mask').css({'width':'300px','height':'100px'});
		$('.image').css({'width':'50px','height':'75px'});
		$('.image').attr({'src':fullImagePath});

		$('.location').text("Rachecourt city bitch");

		//transition effect
		$('#mask').fadeIn(500);
		$('#mask').fadeTo("fast",0.9);

		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();

		//Set the popup window to center
		$(id).css('top',  '20px');
		$(id).css('bottom',  '20px');
		$(id).css('height',  '700px');
		$(id).css('left', winW/2-$(id).width()/2);

		//transition effect
		$(id).fadeIn(2000);

		//if close button is clicked
		$('.window .close').click(function (e) {
			//Cancel the link behavior
			e.preventDefault();

			$('#mask').hide();
			$('.window').hide();
		});

		//if mask is clicked
		$('#mask').click(function () {
			$(this).hide();
			$('.window').hide();
		});
	};

	$(".politicianFind").on("click",function(){
		// Select a specified element
		$('#popover').popover();
		console.log($(this).attr("alt"));
		window.scrollTo(0,0);
		showImage($(this).attr("alt"));
	});

});

function openModal(word){
    // TODO check db if match
}


// var title = $(document.createElement('img')).attr({
//     src: 'https://img.pandawhale.com/post-61492-dancing-dickbutt-gif-imgur-tum-pTDg.gif',
//     title: 'Christmas tree'
// }).css({
//     position: 'absolute',
//     top: '10px',
//     left: document.body.clientWidth - 280 + 'px',
//     'z-index': '10000'
// }).appendTo(document.body);
//
// title.click(function() {
//     alert('BIGGEST DICK IN THE WORLD');
// });
