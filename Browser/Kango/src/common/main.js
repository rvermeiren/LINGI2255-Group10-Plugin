//==UserScript==
// @name main
// @include http://*
// @include https://*
// @require jquery-1.9.1.min.js
// ==/UserScript==
var $ = window.$.noConflict(true); // Required for IE

$(document).ready(function(){

    // function get_word(text, index) {
    //     var end = index+1;
    //     while(text.charAt(end) != ' '){
    //         end++;
    //     }
    //     return text.slice(index, end);
    // }

    function openModal(word){
        // TODO check db if match
    }


    // $('p').each(function(index) {
        var body = $(this).innerHTML();
        var word;
        var str = "";
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){

            var image = $(document.createElement('img')).attr({
                src: 'http://www.citizensforeurope.eu/wp-content/uploads/2015/05/M17-140220-kompas1.png',
                id: 'politicianFind'
                onclick: 'openModal(word)'
            });

            $(this).innerHTML=$(this).innerHTML.replace(word, image + word);
        }
        body = $(this).innerHTML();
        // if (str != "")
            // alert(str);
    // });

});


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
