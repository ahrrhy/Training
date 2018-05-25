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

               nextBtn.on('click', function() {
                   console.log('fg');
                   if (nextSlide.length) {
                       findReqPos(nextSlide);
                       removeActive(nextSlide);
                   } else {
                       findReqPos(firstSlide);
                       removeActive(prevSlide);
                   }
                   $this.css('left', '-=' + reqPos + 'px');
               });
               prevBtn.on('click', function() {
                   if (prevSlide.length) {
                       findReqPos(nextSlide);
                       removeActive(nextSlide);
                   } else {
                       findReqPos(lastSlide);
                       removeActive(prevSlide);
                   }
                   $this.css('left', '-=' + reqPos + 'px');
               });
           }

           if (options.transition === 'fade') {
               $this.wrap('<div id="slider-wrap__fade"></div>');
               fade();
           }

           function slide() {
               console.log(nextBtn);

           }

           function fade() {

           }

           function findReqPos(slide) {
               reqPos = slide.offset().left - sliderOffset;
           }
           
           function removeActive(reqSlide) {
               reqSlide.addClass('active').siblings().removeClass('active');
           }
       });
    };
})(jQuery);