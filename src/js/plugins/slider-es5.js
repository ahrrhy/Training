(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

;(function ($) {
    $.fn.dvSlider = function (options) {

        /**
         * @type {{speed: number, pause: number, transition: string, direction: string, controlPrev: string, controlNext: string}}
         */
        var defaults = {
            // animation speed
            speed: 2000,
            // animation pause time
            pause: 5000,
            //animation type
            transition: 'slide',
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
            var items = function items() {
                return $this.find('li');
            },
                activeSlide = function activeSlide() {
                return items().filter('.active');
            },
                nextSlide = function nextSlide() {
                return activeSlide().next();
            },
                prevSlide = function prevSlide() {
                return activeSlide().prev();
            },
                firstSlide = function firstSlide() {
                return items().first();
            },
                lastSlide = function lastSlide() {
                return items().last();
            };
            /**
             * This is the slide animation case
             */

            if (options.transition === 'slide') {
                var _autoSlide = function _autoSlide() {
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
                };

                var nextSlideMove = function nextSlideMove() {
                    $this.animate({ left: -nextSlide().width() }, options.speed, function () {
                        firstSlide().appendTo($this);
                        $this.css('left', '');
                        activeSlide().removeClass('active').next().addClass('active');
                    });
                };

                var prevSlideMove = function prevSlideMove() {
                    $this.animate({ left: +prevSlide().width() }, options.speed, function () {
                        lastSlide().prependTo($this);
                        $this.css('left', '');
                        activeSlide().removeClass('active').prev().addClass('active');
                    });
                };

                //Wrap slider for correctly styled div
                wrap = '<div class="slider-wrap__slide"></div>';
                $this.wrap(wrap);

                //Setting sliders real width
                $this.width(activeSlide().width() * items().length);
                $this.css('marginLeft', -activeSlide().width());
                lastSlide().prependTo($this);

                //Start auto slide change
                _autoSlide();

                //Catching click events on control elements
                nextBtn.on('click', function () {
                    clearInterval(start);
                    nextSlideMove();
                    _autoSlide();
                });
                prevBtn.on('click', function () {
                    clearInterval(start);
                    prevSlideMove();
                    _autoSlide();
                });

                return this;
            }

            /**
             * Case fade animation
             */

            if (options.transition === 'fade') {
                var autoFade = function autoFade() {
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
                };

                var nextFadeMove = function nextFadeMove() {
                    nextSlide().css('zIndex', +activeSlide().css('zIndex') - 1);
                    activeSlide().animate({ opacity: 0 }, options.speed, function () {
                        activeSlide().css('opacity', '').removeClass('active').next().addClass('active');
                        firstSlide().appendTo($this);
                        firstSlide().css('zIndex', '');
                    });
                };

                var prevFadeMove = function prevFadeMove() {
                    lastSlide().css('zIndex', +activeSlide().css('zIndex') - 1);
                    activeSlide().animate({ opacity: 0 }, options.speed, function () {
                        lastSlide().prependTo($this);
                        activeSlide().css('opacity', '').removeClass('active');
                        firstSlide().addClass('active').css('zIndex', '');
                    });
                };

                wrap = '<div class="slider-wrap__fade"></div>';
                $this.wrap(wrap);

                autoFade();

                nextBtn.on('click', function () {
                    clearInterval(start);
                    nextFadeMove();
                    autoSlide();
                });
                prevBtn.on('click', function () {
                    clearInterval(start);
                    prevFadeMove();
                    autoSlide();
                });
            }
        });
    };
})(jQuery);

},{}]},{},[1]);
