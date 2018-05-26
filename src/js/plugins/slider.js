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
           direction: 'forward',
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
               var currentSliderPosition = 0,
                   items = function() { return $this.find('li'); },
                   activeSlide = function() { return items().filter('.active')},
                   nextSlide = function () { return activeSlide().next(); },
                   prevSlide = function () { return activeSlide().prev() },
                   firstSlide = function () { return items().first() },
                   lastSlide = function () { return items().last()};
               $this.width(nextSlide().width() * items().length);

               var start, stop;


               nextBtn.on('click', function() {
                   nextSlideMove();
               });
               prevBtn.on('click', function() {
                   prevSlideMove();
               });

               function autoSlide() {
                   if (options.direction === 'forward') {
                       start = setInterval(nextSlideMove(), options.pause);
                   }
               }


               function nextSlideMove() {

                   if (nextSlide().length) {
                       $this.stop().animate({ right: currentSliderPosition + nextSlide().width() }, options.speed);
                       currentSliderPosition += nextSlide().width();
                       activeSlide().removeClass('active').next().addClass('active');

                   } else {
                       activeSlide().removeClass('active');
                       firstSlide().addClass('active');
                       $this.stop().animate({ right: currentSliderPosition = 0 }, options.speed);
                   }
               }

               function prevSlideMove() {

                   if (prevSlide().length) {
                       console.log('done');
                       $this.stop().animate({ right: currentSliderPosition - prevSlide().width() }, options.speed);
                       currentSliderPosition -= prevSlide().width();
                       activeSlide().removeClass('active').prev().addClass('active');
                   } else {
                       console.log(prevSlide().length);
                       activeSlide().removeClass('active');
                       lastSlide().addClass('active');
                       $this.stop().animate({ right: currentSliderPosition = $this.width() - activeSlide().width() }, options.speed);
                       console.log(prevSlide().length);
                   }
               }
           }
       });
    };
})(jQuery);