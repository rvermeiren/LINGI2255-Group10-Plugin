// import * as Papa from "node_modules/papaparse/papaparse.min"
//import * as db_reader from "utils/db_reader";

import * as db_reader from "utils/db_reader";

var sarko = "Sarkozy";

$(document).ready(function(){

    var hashmap = db_reader.getHashMap();
    kango.console.log(hashmap);

    //$('head').append("<script type='text/javascript'> $(\".politicianFind\").click(function() {alert(\"WeCitizens\");}); </script>");

    $('p').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            if(word == sarko){
                var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
                + " class=\"politicianFind\" onclick=\"openWeCitizens()\">";

                $(this).html(body.replace(word, image + " " + word));
            }
            
        }
    });

    $('li').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            if(word == sarko){
                var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
                + " class=\"politicianFind\" onclick=\"alert(word)\">";

                $(this).html(body.replace(word, image + " " + word));
            }
            
        }
    });

    $('meta').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            if(word == sarko){
                var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
                + " class=\"politicianFind\" onclick=\"alert(word)\">";

                $(this).html(body.replace(word, image + " " + word));
            }

        }
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
