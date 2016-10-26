// import * as Papa from "node_modules/papaparse/papaparse.min"
//import * as db_reader from "utils/db_reader";

//import * as db_reader from "utils/db_reader";

var sarko = "Sarkozy";

$(document).ready(function(){

	$('head').append(
		'<div class="panel panel-default" id="boxes">\
			<div class="panel-heading">\
			<h4 class="panel-title">\
				<a data-toggle="collapse" data-target="#collapsing" href="#collapsing" class="collapsed">Séverine Blampin</a>\
			</h4>\
		</div>\
		<div id="collapsing" class="panel-collapse collapse in">\
		<div class="panel-body">\
			<div class="row">\
			<div class="col-xs-2" id="photo"> <i class="material-icons md-60">face</i> </div>\
			<div class="col-xs-10">\
			<div class="row">\
				FN\
			</div>\
			<div class="row">\
				69/05/1969\
			</div>\
			<div class="row">\
				Houte-Si-Ploue\
			</div>\
					<div class="row">\
						<a href="https://www.youtube.com/watch?v=AmYrTp-JdnY">Voir sur wecitizens</a>\
					</div>\
				</div>\
			</div>\
		</div>\
		</div>\
		</div>'
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
                var image = "<img alt=\"sarko\" src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
                + " class=\"politicianFind\">";

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
		$('#mask').css({'width':'750px','height':'750px'});
		$('.image').css({'width':'750px','height':'670px'});
		$('.image').attr({'src':fullImagePath});

		//transition effect
		$('#mask').fadeIn(500);
		$('#mask').fadeTo("slow",0.9);

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
