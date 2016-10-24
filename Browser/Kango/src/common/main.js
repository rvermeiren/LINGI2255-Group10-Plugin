//==UserScript==
// @name main
// @include http://*
// @include https://*
// @require jquery-1.9.1.min.js
// ==/UserScript==
var $ = window.$.noConflict(true); // Required for IE

$(document).ready(function(){

    $('a').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
            + " id=\"politicianFind\" onclick=\"alert(word)\">";

            $(this).html(body.replace(word, image + word));
        }
    });

    $('p').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
            + " id=\"politicianFind\" onclick=\"alert(word)\">";

            $(this).html(body.replace(word, image + word));
        }
    });

    $('li').each(function(index) {

        var body = $(this).html();
        console.log(body);
        var word;
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            var image = "<img src=\"https://s15.postimg.org/pei4ci3fv/fdp.png\""
            + " id=\"politicianFind\" onclick=\"alert(word)\">";

            $(this).html(body.replace(word, image + word));
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
