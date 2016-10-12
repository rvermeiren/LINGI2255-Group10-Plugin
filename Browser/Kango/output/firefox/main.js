// ==UserScript==
// @name main
// @include http://*
// @include https://*
// @require jquery-1.9.1.min.js
// ==/UserScript==
var $ = window.$.noConflict(true); // Required for IE

var title = $(document.createElement('img')).attr({
    src: 'https://img.pandawhale.com/post-61492-dancing-dickbutt-gif-imgur-tum-pTDg.gif',
    title: 'Christmas tree'
}).css({
    position: 'absolute',
    top: '10px',
    left: document.body.clientWidth - 280 + 'px',
    'z-index': '10000'
}).appendTo(document.body);

title.click(function() {
    alert('BIGGEST DICK IN THE WORLD');
});
