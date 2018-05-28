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
            $this = $(this);

        $this.each(function () {

            /**
             * This is the slide animation case
             */

            if (options.transition === 'slide') {

                var nextBtn = $(options.controlNext),
                    prevBtn = $(options.controlPrev);

                var $this = $(this);

                var items = function() { return $this.find('li'); },
                    activeSlide = function() { return items().filter('.active')},
                    nextSlide = function () { return activeSlide().next(); },
                    prevSlide = function () { return activeSlide().prev() },
                    firstSlide = function () { return items().first() },
                    lastSlide = function () { return items().last()};

                var wrap = '<div class="slider-wrap__slide"></div>';
                $this.wrap(wrap);

                $this.width(activeSlide().width() *items().length);
                $this.css('marginLeft', -activeSlide().width());
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
                        activeSlide().removeClass('active').next().addClass('active');
                    });

                }

                function prevSlideMove() {
                    $this.animate({ left: + prevSlide().width() }, options.speed, function () {
                        lastSlide().prependTo($this);
                        $this.css('left', '');
                        activeSlide().removeClass('active').prev().addClass('active');
                    });
                }

                return this;
            }

            if (options.transition === 'fade') {
                var wrap = '<div class="slider-wrap__fade"></div>';
                $this.wrap(wrap);
            }
        });
    };
})(jQuery);