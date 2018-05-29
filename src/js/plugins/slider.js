;(function ($) {
    $.fn.dvSlider = function (options) {

        /**
         * @type {{speed: number, pause: number, transition: string, direction: string, controlPrev: string, controlNext: string}}
         */
        var defaults = {
            // animation speed
                speed : 2000,
            // animation pause time
                pause : 5000,
            //animation type
                transition : 'slide',
            //auto animating direction
                direction: 'forward',
            //control elements selectors
                controlPrev: '.previous-slide',
                controlNext: '.next-slide'
            },
            options = $.extend(defaults, options),
            $this = $(this);

        var wrap;
        var start;

        //Check if animation pause is bigger than animation speed
        if (options.speed === options.pause) {
            options.pause += 300;
        }

        //Check if active slide exist
        function findActive(parent) {
            var active = $('.active', parent);
            if (active[0]) {
                return;
            }
            parent.find('li').first().addClass('active');
        }

        //Setting active for every slider which doesn't have it
        $this.each(function () {
            findActive($this);
        });

        $this.each(function () {

            //Setting controls elements
            var nextBtn = $(options.controlNext),
                prevBtn = $(options.controlPrev);

            var $this = $(this);

            //Find all needed slides
            var items = function() { return $this.find('li'); },
                activeSlide = function() { return items().filter('.active') },
                nextSlide = function () { return activeSlide().next(); },
                prevSlide = function () { return activeSlide().prev() },
                firstSlide = function () { return items().first() },
                lastSlide = function () { return items().last() };
            /**
             * This is the slide animation case
             */

            if (options.transition === 'slide') {

                //Wrap slider for correctly styled div
                wrap = '<div class="slider-wrap__slide"></div>';
                $this.wrap(wrap);

                //Setting sliders real width
                $this.width(activeSlide().width() *items().length);
                $this.css('marginLeft', -activeSlide().width());
                lastSlide().prependTo($this);

                //Start auto slide change
                autoSlide();

                //Catching click events on control elements
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

            /**
             * Case fade animation
             */

            if (options.transition === 'fade') {
                wrap = '<div class="slider-wrap__fade"></div>';
                $this.wrap(wrap);

                autoFade();

                nextBtn.on('click', function() {
                    clearInterval(start);
                    nextFadeMove();
                    autoSlide();
                });
                prevBtn.on('click', function() {
                    clearInterval(start);
                    prevFadeMove();
                    autoSlide();
                });

                function autoFade() {
                    if (options.direction === 'forward') {
                        start = setInterval(function () {
                            nextFadeMove();
                        }, options.pause);
                    }
                    if (options.direction === 'backward') {
                        start = setInterval(function () {
                            prevFadeMove();
                        }, options.pause);
                    }
                }

                function nextFadeMove() {
                    nextSlide().css('zIndex', +activeSlide().css('zIndex') - 1);
                    activeSlide().animate({opacity: 0}, options.speed, function () {
                        activeSlide().css('opacity', '').removeClass('active').next().addClass('active');
                        firstSlide().appendTo($this);
                        firstSlide().css('zIndex','');
                    });
                }

                function prevFadeMove() {
                    lastSlide().css('zIndex', +activeSlide().css('zIndex')-1);
                    activeSlide().animate({opacity: 0}, options.speed, function () {
                        lastSlide().prependTo($this);
                        activeSlide().css('opacity', '').removeClass('active');
                        firstSlide().addClass('active').css('zIndex', '');
                    })
                }
            }
        });
    };
})(jQuery);