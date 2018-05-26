/**
 * This is simple jQuery slider plugin
 *
 * */
;(function ($) {
    $.fn.dvSlider = function (options) {
       var defaults = {
           speed : 2000,
           pause : 5000,
           transition : 'slide',
           controlPrev: '.previous-slide',
           controlNext: '.next-slide'
       },
           options = $.extend(defaults, options),
           nextBtn = $(options.controlNext),
           prevBtn = $(options.controlPrev);

       this.each(function () {
           var $this = $(this);
           if (options.transition === 'slide') {
               var wrap = '<div id="slider-wrap__slide"></div>';
               $this.wrap(wrap);

               var activeSlide = $this.find('li.active');
               console.log(activeSlide);

               function moveActive(direction) {

               }
           }

       });
    };
})(jQuery);