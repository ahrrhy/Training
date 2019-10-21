/**
 * This is simple jQuery plugin which toggles menu list without any animations
 * nav is a string of navigation's css selectors
 * */
;(function ($) {
    $.fn.menuToggle = function (nav) {
        var navList = $(nav);
        this.click(function () {
            navList.toggle();
        });
    };
})(jQuery);