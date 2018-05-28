/**
 * This is simple jQuery slider plugin
 *
 * */
;(function ($) {
    $.fn.dvSlider = function (options) {
        var defaults = {
           speed : 2000,
           pause : 10000,
           transition : 'slide',
           direction: 'backward',
           controlPrev: '.previous-slide',
           controlNext: '.next-slide'
        },
           options = $.extend(defaults, options),
           nextBtn = $(options.controlNext),
           prevBtn = $(options.controlPrev);

        this.each(function () {
            var $this = $(this);
            console.log(this);

            /**
             * This is the slide animation case
             */

            if (options.transition === 'slide') {
                var wrap = '<div class="slider-wrap__slide"></div>';
                $this.wrap(wrap);

                var currentSliderPosition = 0,
                    items = function() { return $this.find('li'); },
                    activeSlide = function() { return items().filter('.active')},
                    nextSlide = function () { return activeSlide().next(); },
                    prevSlide = function () { return activeSlide().prev() },
                    firstSlide = function () { return items().first() },
                    lastSlide = function () { return items().last()};
                $this.width(nextSlide().width() * items().length);

                var start;

                autoSlide();

                nextBtn.on('click', function() {
                    clearInterval(start);
                    nextSlideMove();
                    autoSlide();
                });
                prevBtn.on('click', function() {
                    clearInterval(start);
                    prevSlideMove();
                    autoSlide();
                });

                function autoSlide() {
                    if (options.direction === 'forward') {
                        start = setInterval(function () {
                            nextSlideMove();
                        }, options.pause);
                    }
                    if (options.direction === 'backward') {
                        start = setInterval(function () {
                            prevSlideMove();
                        }, options.pause);
                    }
                }


                function nextSlideMove() {
                    console.log(1);
                    if (nextSlide().length) {
                        $this.animate({ right: currentSliderPosition + nextSlide().width() }, options.speed);
                        currentSliderPosition += nextSlide().width();
                        activeSlide().removeClass('active').next().addClass('active');
                    } else {
                        activeSlide().removeClass('active');
                        firstSlide().addClass('active');
                        $this.animate({ right: currentSliderPosition = 0 }, options.speed);
                    }
                }

                function prevSlideMove() {

                    if (prevSlide().length) {
                        $this.animate({ right: currentSliderPosition - prevSlide().width() }, options.speed);
                        currentSliderPosition -= prevSlide().width();
                        activeSlide().removeClass('active').prev().addClass('active');
                    } else {
                        activeSlide().removeClass('active');
                        lastSlide().addClass('active');
                        $this.animate({ right: currentSliderPosition = $this.width() - activeSlide().width() }, options.speed);
                    }
                }
            }

            if (options.transition === 'fade') {

            }
        });
    };
})(jQuery);