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
               var currentSliderPosition = 0;

               function nextSlideMove() {
                   var items = $this.find('li'),
                       activeSlide = items.filter('.active'),
                       nextSlide = activeSlide.next(),
                       firstSlide = items.first();
                   if (nextSlide.length) {
                       $this.animate({right: currentSliderPosition + nextSlide.width()}, options.speed);
                       currentSliderPosition += nextSlide.width();
                       console.log(nextSlide.length);
                       activeSlide.removeClass('active').next().addClass('active');
                   } else {
                       firstSlide.clone().appendTo($this);
                       $this.animate({right: currentSliderPosition + nextSlide.width()}, options.speed);
                       activeSlide.removeClass('active').next().addClass('active');
                   }
               }

               function prevSlideMove() {
                   var items = $this.find('li'),
                       activeSlide = items.filter('.active'),
                       nextSlide = activeSlide.next(),
                       prevSlide = activeSlide.prev(),
                       firstSlide = items.first(),
                       lastSlide = items.last(),
                       wrapper = $('#slider-wrap__slide');

                   if (prevSlide.length) {
                       return activeSlide.removeClass('active').prev().addClass('active');
                   } else {
                       lastSlide.clone().prependTo($this);
                       lastSlide.remove();
                       return activeSlide.removeClass('active').prev().addClass('active');
                   }
               }

               nextBtn.on('click', function() {
                   console.log('fg');
                   nextSlideMove();
               });
               prevBtn.on('click', function() {
                   prevSlideMove();
               });
           }

           if (options.transition === 'fade') {
               $this.wrap('<div id="slider-wrap__fade"></div>');
               fade();
           }

           function fade() {

           }

           function removeActive(reqSlide) {
               reqSlide.addClass('active').siblings().removeClass('active');
           }
       });
    };
})(jQuery);