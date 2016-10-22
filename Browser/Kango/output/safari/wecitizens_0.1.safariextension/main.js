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

    $('p').each(function(index) {
        var body = $(this).text();
        var word;
        var str = "";
        var reg = /[A-Z]+[a-z]*/gm;
        while(word = reg.exec(body)){
            str += word + "\n";
        }
        if (str != "")
            alert(str);
    });

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
