;(function ($) {
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

    class Slider {

        constructor(element, options) {
            // Save the element reference, both as a jQuery
            // reference and a normal reference
            this.element = element;
            this.$element = $(element);

            // this will be an interval
            this.start = null;

            // Mix in the passed-in options with the default options
            this.options = $.extend({}, defaults, options);

            // Set slider wraps with basic sliders styles
            this._wrapSlide = '<div class="slider-wrap__slide"></div>';
            this._wrapFade = '<div class="slider-wrap__fade"></div>';


            // this will be control buttons
            this.nextBtn = null;
            this.prevBtn = null;
        }

        //Wraps Slider element in order of slider animation type
        build() {

            if (this.options.transition === 'fade') {

                //Wrap slider-list in correct wrap
                this.$element.wrap(this._wrapFade);

                //Starting slides auto change
                this.autoFade();
            }

            if (this.options.transition === 'slide') {

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
            this.$element.animate({ left: - this.nextSlide().width() }, this.options.speed,  () => {
                this.firstSlide().appendTo(this.$element);
                this.$element.css('left', '');
                this.activeSlide().removeClass('active').next().addClass('active');
            });
        }

        prevSlideMove() {
            this.$element.animate({ left: + this.prevSlide().width() }, this.options.speed,  () => {
                this.lastSlide().prependTo(this.$element);
                this.$element.css('left', '');
                this.activeSlide().removeClass('active').prev().addClass('active');
            });
        }

        nextFadeMove() {
            this.nextSlide().css('zIndex', +this.activeSlide().css('zIndex') - 1);
            this.activeSlide().animate({ opacity: 0 }, this.options.speed,  () => {
                this.activeSlide().css('opacity', 1).removeClass('active').next().addClass('active');
                this.firstSlide().appendTo(this.$element);
                this.firstSlide().css('zIndex','');
            });
        }

        prevFadeMove() {
            this.lastSlide().css('zIndex', +this.activeSlide().css('zIndex')-1);
            this.activeSlide().animate({ opacity: 0 }, this.options.speed,  () => {
                this.lastSlide().prependTo(this.$element);
                this.activeSlide().css('opacity', '').removeClass('active');
                this.firstSlide().addClass('active').css('zIndex', '');
            });
        }

        autoSlide() {
            if (this.options.direction === 'forward') {
                this.start = setInterval( () => {
                    this.nextSlideMove();
                }, this.options.pause);
            }
            if (this.options.direction === 'backward') {
                this.start = setInterval( () => {
                    this.prevSlideMove();
                }, this.options.pause);
            }
        }

        autoFade() {
            if (this.options.direction === 'forward') {
                this.start = setInterval( () => {
                    this.nextFadeMove();
                }, this.options.pause);
            }
            if (this.options.direction === 'backward') {
                this.start = setInterval( () => {
                    this.prevFadeMove();
                }, this.options.pause);
            }
        }


        init() {
            //Find control elements in DOM
            this.nextBtn = $(defaults.controlNext);
            this.prevBtn = $(defaults.controlPrev);
            this.build();
            this.findActive(this.$element);
        }
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {

            if (!$.data(this, pluginName)) {

                $.data(this, pluginName,
                    new Slider( this, options )
                );
            }

            $.data(this, pluginName).init();

            if ($.data(this, pluginName).options.transition === 'slide') {
                $.data(this, pluginName).nextBtn.on('click', () => {
                    clearInterval($.data(this, pluginName).start);
                    $.data(this, pluginName).nextSlideMove();
                    $.data(this, pluginName).autoSlide();
                });

                $.data(this, pluginName).prevBtn.on('click', () => {
                    clearInterval($.data(this, pluginName).start);
                    $.data(this, pluginName).prevSlideMove();
                    $.data(this, pluginName).autoSlide();
                });
            }

            if ($.data(this, pluginName).options.transition === 'fade') {
                $.data(this, pluginName).nextBtn.on('click', () => {
                    clearInterval($.data(this, pluginName).start);
                    $.data(this, pluginName).nextFadeMove();
                    $.data(this, pluginName).autoFade();
                });

                $.data(this, pluginName).prevBtn.on('click', () => {
                    clearInterval($.data(this, pluginName).start);
                    $.data(this, pluginName).prevFadeMove();
                    $.data(this, pluginName).autoFade();
                });
            }

        });
    };

})(jQuery);