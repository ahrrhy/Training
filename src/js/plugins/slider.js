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
           options = $.extend(defaults, options);

       this.each(function () {
           var $this = $(this);

           if (options.transition === 'slide') {

               var wrap = '<div id="slider-wrap__slide"></div>';
               $this.wrap(wrap);

               var items = $this.find('.slide'),
                   activeSlide = items.filter('.active'),
                   nextSlide = activeSlide.next(),
                   prevSlide = activeSlide.prev(),
                   firstSlide = items.first(),
                   lastSlide = items.last(),
                   wrapper = $('.slider-box'),
                   sliderOffset = wrapper.offset().left,
                   reqPos = 0;




               slide();
           }

           if (options.transition === 'fade') {
               $this.wrap('<div id="slider-wrap__fade"></div>');
               fade();
           }

           function slide() {
               console.log(sliderOffset);
           }

           function fade() {

           }
       });
    };
})(jQuery);