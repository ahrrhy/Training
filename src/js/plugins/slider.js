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
           direction: 'backward',
           controlPrev: '.previous-slide',
           controlNext: '.next-slide'
        },
           options = $.extend(defaults, options),
           nextBtn = $(options.controlNext),
           prevBtn = $(options.controlPrev);

        this.each(function () {
            var $this = $(this);

            /**
             * This is the slide animation case
             */

            if (options.transition === 'slide') {
                var wrap = '<div class="slider-wrap__slide"></div>';
                $this.wrap(wrap);

                var items = function() { return $this.find('li'); },
                    activeSlide = function() { return items().filter('.active')},
                    nextSlide = function () { return activeSlide().next(); },
                    firstSlide = function () { return items().first() },
                    lastSlide = function () { return items().last()};


                $this.width(nextSlide().width() * items().length);

                console.log($this);

                console.log($this.width());
                $this.css({
                    width : nextSlide().width() * items().length,
                    marginLeft: - nextSlide().width()
                });
                lastSlide().prependTo($this);



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
                    $this.animate({ left: - nextSlide().width() }, options.speed, function () {
                        firstSlide().appendTo($this);
                        $this.css('left', '');
                    });
                    activeSlide().removeClass('active').next().addClass('active');
                }

                function prevSlideMove() {
                    $this.animate({ left: + nextSlide().width() }, options.speed, function () {
                        lastSlide().prependTo($this);
                        $this.css('left', '');
                    });
                    activeSlide().removeClass('active').prev().addClass('active');
                }
            }

            if (options.transition === 'fade') {

            }
        });
    };
})(jQuery);