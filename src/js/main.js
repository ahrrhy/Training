$(document).ready(function () {
    $('.menu-toggle').menuToggle('.header-navigation .list');

    $('.header-slider-list').dvSlider({'transition' : 'fade'});

    $('.footer-slider-list').dvSlider({
        'transition' : 'fade',
        'pause' : '2000'});

});
