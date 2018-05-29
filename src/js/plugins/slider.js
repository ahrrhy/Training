;(function ($, window, document, undefined) {

    var pluginName = 'dvSlider',
        /**
         * @type {{speed: number, pause: number, transition: string, direction: string, controlPrev: string, controlNext: string}}
         */
        defaults = {
            /**
             * speed number, animation speed
             * pause number, time to change slide in auto sliding
             * transition string, determine type of animation
             * direction string, direction of auto sliding: "forward" "backward"
             * controlPrev string, css selector of element with click event, set from parents node to this selector
             * controlNext string, css selector of element with click event, set from parents node to this selector
             */
            speed : 2000,
            pause : 5000,
            transition : 'slide',
            direction: 'forward',
            controlPrev: '.previous-slide',
            controlNext: '.next-slide'
        };

        class Slider{

            constructor(element, options) {
                // Save the element reference, both as a jQuery
                // reference and a normal reference
                this.element = element;
                this.$element = $(element);

                this.start = null;

                // Mix in the passed-in options with the default options
                this.options = $.extend({}, defaults, options);
                this._defaults = defaults;

                // Set slider wraps with basic sliders styles
                this._wrapSlide = '<div class="slider-wrap__slide"></div>';
                this._wrapFade = '<div class="slider-wrap__fade"></div>';
            }

            init() {

                //Find control elements in DOM
                this.nextBtn = $(defaults.controlNext);
                this.prevBtn = $(defaults.controlPrev);

                this.build();
                this.findActive(this.$element);

            }

            //Wraps Slider element in order of slider animation type
            build() {

                if (this._defaults === 'fade') {

                    //Wrap slider-list in correct wrap
                    this.$element.wrap(this._wrapFade);

                    //Starting slides auto change
                    this.autoFade();
                }

                if (this._defaults === 'slide') {

                    //Wrap slider-list in correct wrap
                    this.$element.wrap(this._wrapSlide);

                    //Setting width for slider-list and margin-left
                    this.$element.width(this.activeSlide().width() * this.items().length);
                    this.$element.css('marginLeft', - this.activeSlide().width());
                    this.lastSlide().prependTo(this.$element);

                    //Starting slides auto change
                    this.autoSlide();
                }
            }

            //Check if any Slider li element has active class and set it if not
            findActive(parent) {
                let active = $('.active', parent);
                if (active[0]) {
                    return;
                }
                parent.find('li').first().addClass('active');
            }


            //Work with slider's li
            items() {
                return this.$element.find('li');
            }
            activeSlide() {
                return this.items().filter('.active');
            }
            nextSlide() {
                return this.activeSlide().next();
            }
            prevSlide() {
                return this.activeSlide().prev();
            }
            firstSlide() {
                return this.items().first();
            }
            lastSlide() {
                return this.items().last();
            }

            //Slider moves functions

            nextSlideMove() {
                this.$element.animate({ left: - this.nextSlide().width() }, this._defaults.speed,  () => {
                    this.firstSlide().appendTo(this.$element);
                    this.$element.css('left', '');
                    this.activeSlide().removeClass('active').next().addClass('active');
                });
            }

            prevSlideMove() {
                this.$element.animate({ left: + this.prevSlide().width() }, this._defaults.speed,  () => {
                    this.lastSlide().prependTo(this.$element);
                    this.$element.css('left', '');
                    this.activeSlide().removeClass('active').prev().addClass('active');
                });
            }

            nextFadeMove() {
                this.nextSlide().css('zIndex', +this.activeSlide().css('zIndex') - 1);
                this.activeSlide().animate({ opacity: 0 }, this._defaults.speed,  () => {
                    this.activeSlide().css('opacity', 1).removeClass('active').next().addClass('active');
                    this.firstSlide().appendTo(this.$element);
                    this.firstSlide().css('zIndex','');
                });
            }

            prevFadeMove() {
                this.lastSlide().css('zIndex', +this.activeSlide().css('zIndex')-1);
                this.activeSlide().animate({ opacity: 0 }, this._defaults.speed,  () => {
                    this.lastSlide().prependTo(this.$element);
                    this.activeSlide().css('opacity', '').removeClass('active');
                    this.firstSlide().addClass('active').css('zIndex', '');
                });
            }

            autoSlide() {
                if (options.direction === 'forward') {
                    this.start = setInterval( () => {
                        this.nextSlideMove();
                    }, options.pause);
                }
                if (options.direction === 'backward') {
                    this.start = setInterval( () => {
                        this.prevSlideMove();
                    }, options.pause);
                }
            }

            autoFade() {
                if (options.direction === 'forward') {
                    this.start = setInterval( () => {
                        this.nextFadeMove();
                    }, options.pause);
                }
                if (options.direction === 'backward') {
                    this.start = setInterval( () => {
                        this.prevFadeMove();
                    }, options.pause);
                }
            }
        }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                    new Slider( this, options ));
            }
        });
    };


        ////*******************************////
    //
    // $.fn.dvSlider = function (options) {
    //
    //     /**
    //      * @type {{speed: number, pause: number, transition: string, direction: string, controlPrev: string, controlNext: string}}
    //      */
    //     var defaults = {
    //             speed : 2000,
    //             pause : 5000,
    //             transition : 'slide',
    //             direction: 'forward',
    //             controlPrev: '.previous-slide',
    //             controlNext: '.next-slide'
    //         },
    //         options = $.extend(defaults, options),
    //         $this = $(this);
    //
    //     var wrap;
    //     var start;
    //
    //     if (options.speed === options.pause) {
    //         options.pause += 300;
    //     }
    //
    //     function findActive(parent) {
    //         var active = $('.active', parent);
    //         if (active[0]) {
    //             return;
    //         }
    //         parent.find('li').first().addClass('active');
    //     }
    //
    //     $this.each(function () {
    //         findActive($this);
    //     });
    //
    //     $this.each(function () {
    //
    //         var nextBtn = $(options.controlNext),
    //             prevBtn = $(options.controlPrev);
    //
    //         var $this = $(this);
    //
    //         var items = function() { return $this.find('li'); },
    //             activeSlide = function() { return items().filter('.active') },
    //             nextSlide = function () { return activeSlide().next(); },
    //             prevSlide = function () { return activeSlide().prev() },
    //             firstSlide = function () { return items().first() },
    //             lastSlide = function () { return items().last() };
    //         /**
    //          * This is the slide animation case
    //          */
    //
    //         if (options.transition === 'slide') {
    //
    //             findActive($this);
    //
    //             wrap = '<div class="slider-wrap__slide"></div>';
    //             $this.wrap(wrap);
    //
    //             $this.width(activeSlide().width() *items().length);
    //             $this.css('marginLeft', -activeSlide().width());
    //             lastSlide().prependTo($this);
    //
    //             autoSlide();
    //
    //             nextBtn.on('click', function() {
    //                 clearInterval(start);
    //                 nextSlideMove();
    //                 autoSlide();
    //             });
    //             prevBtn.on('click', function() {
    //                 clearInterval(start);
    //                 prevSlideMove();
    //                 autoSlide();
    //             });
    //
    //             function autoSlide() {
    //                 if (options.direction === 'forward') {
    //                     start = setInterval(function () {
    //                         nextSlideMove();
    //                     }, options.pause);
    //                 }
    //                 if (options.direction === 'backward') {
    //                     start = setInterval(function () {
    //                         prevSlideMove();
    //                     }, options.pause);
    //                 }
    //             }
    //
    //             function nextSlideMove() {
    //                 $this.animate({ left: - nextSlide().width() }, options.speed, function () {
    //                     firstSlide().appendTo($this);
    //                     $this.css('left', '');
    //                     activeSlide().removeClass('active').next().addClass('active');
    //                 });
    //
    //             }
    //
    //             function prevSlideMove() {
    //                 $this.animate({ left: + prevSlide().width() }, options.speed, function () {
    //                     lastSlide().prependTo($this);
    //                     $this.css('left', '');
    //                     activeSlide().removeClass('active').prev().addClass('active');
    //                 });
    //             }
    //
    //             return this;
    //         }
    //
    //         /**
    //          * Case fade animation
    //          */
    //
    //         if (options.transition === 'fade') {
    //             wrap = '<div class="slider-wrap__fade"></div>';
    //             $this.wrap(wrap);
    //
    //             autoFade();
    //
    //             nextBtn.on('click', function() {
    //                 clearInterval(start);
    //                 nextFadeMove();
    //                 autoSlide();
    //             });
    //             prevBtn.on('click', function() {
    //                 clearInterval(start);
    //                 prevFadeMove();
    //                 autoSlide();
    //             });
    //
    //             function autoFade() {
    //                 if (options.direction === 'forward') {
    //                     start = setInterval(function () {
    //                         nextFadeMove();
    //                     }, options.pause);
    //                 }
    //                 if (options.direction === 'backward') {
    //                     start = setInterval(function () {
    //                         prevFadeMove();
    //                     }, options.pause);
    //                 }
    //             }
    //
    //             function nextFadeMove() {
    //                 nextSlide().css('zIndex', +activeSlide().css('zIndex') - 1);
    //                 activeSlide().animate({opacity: 0}, options.speed, function () {
    //                     activeSlide().css('opacity', '').removeClass('active').next().addClass('active');
    //                     firstSlide().appendTo($this);
    //                     firstSlide().css('zIndex','');
    //                 });
    //             }
    //
    //             function prevFadeMove() {
    //                 lastSlide().css('zIndex', +activeSlide().css('zIndex')-1);
    //                 activeSlide().animate({opacity: 0}, options.speed, function () {
    //                     lastSlide().prependTo($this);
    //                     activeSlide().css('opacity', '').removeClass('active');
    //                     firstSlide().addClass('active').css('zIndex', '');
    //                 })
    //             }
    //         }
    //     });
    // };
})(jQuery, window, document);