(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        speed: 2000,
        pause: 5000,
        transition: 'slide',
        direction: 'forward',
        controlPrev: '.previous-slide',
        controlNext: '.next-slide'
    };

    var Slider = function () {
        function Slider(element, options) {
            _classCallCheck(this, Slider);

            // Save the element reference, both as a jQuery
            // reference and a normal reference
            this.element = element;
            this.$element = $(element);

            this.start = null;

            // Mix in the passed-in options with the default options
            this.options = $.extend({}, defaults, options);

            // Set slider wraps with basic sliders styles
            this._wrapSlide = '<div class="slider-wrap__slide"></div>';
            this._wrapFade = '<div class="slider-wrap__fade"></div>';

            this.nextBtn = null;
            this.prevBtn = null;
        }

        //Wraps Slider element in order of slider animation type


        _createClass(Slider, [{
            key: 'build',
            value: function build() {

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
                    this.$element.css('marginLeft', -this.activeSlide().width());
                    this.lastSlide().prependTo(this.$element);

                    //Starting slides auto change
                    this.autoSlide();
                }
            }

            //Check if any Slider li element has active class and set it if not

        }, {
            key: 'findActive',
            value: function findActive(parent) {
                var active = $('.active', parent);
                if (active[0]) {
                    return;
                }
                parent.find('li').first().addClass('active');
            }

            //Work with slider's li

        }, {
            key: 'items',
            value: function items() {
                return this.$element.find('li');
            }
        }, {
            key: 'activeSlide',
            value: function activeSlide() {
                return this.items().filter('.active');
            }
        }, {
            key: 'nextSlide',
            value: function nextSlide() {
                return this.activeSlide().next();
            }
        }, {
            key: 'prevSlide',
            value: function prevSlide() {
                return this.activeSlide().prev();
            }
        }, {
            key: 'firstSlide',
            value: function firstSlide() {
                return this.items().first();
            }
        }, {
            key: 'lastSlide',
            value: function lastSlide() {
                return this.items().last();
            }

            //Slider moves functions

        }, {
            key: 'nextSlideMove',
            value: function nextSlideMove() {
                var _this = this;

                this.$element.animate({ left: -this.nextSlide().width() }, this.options.speed, function () {
                    _this.firstSlide().appendTo(_this.$element);
                    _this.$element.css('left', '');
                    _this.activeSlide().removeClass('active').next().addClass('active');
                });
            }
        }, {
            key: 'prevSlideMove',
            value: function prevSlideMove() {
                var _this2 = this;

                this.$element.animate({ left: +this.prevSlide().width() }, this.options.speed, function () {
                    _this2.lastSlide().prependTo(_this2.$element);
                    _this2.$element.css('left', '');
                    _this2.activeSlide().removeClass('active').prev().addClass('active');
                });
            }
        }, {
            key: 'nextFadeMove',
            value: function nextFadeMove() {
                var _this3 = this;

                this.nextSlide().css('zIndex', +this.activeSlide().css('zIndex') - 1);
                this.activeSlide().animate({ opacity: 0 }, this.options.speed, function () {
                    _this3.activeSlide().css('opacity', 1).removeClass('active').next().addClass('active');
                    _this3.firstSlide().appendTo(_this3.$element);
                    _this3.firstSlide().css('zIndex', '');
                });
            }
        }, {
            key: 'prevFadeMove',
            value: function prevFadeMove() {
                var _this4 = this;

                this.lastSlide().css('zIndex', +this.activeSlide().css('zIndex') - 1);
                this.activeSlide().animate({ opacity: 0 }, this.options.speed, function () {
                    _this4.lastSlide().prependTo(_this4.$element);
                    _this4.activeSlide().css('opacity', '').removeClass('active');
                    _this4.firstSlide().addClass('active').css('zIndex', '');
                });
            }
        }, {
            key: 'autoSlide',
            value: function autoSlide() {
                var _this5 = this;

                if (this.options.direction === 'forward') {
                    this.start = setInterval(function () {
                        _this5.nextSlideMove();
                    }, this.options.pause);
                }
                if (this.options.direction === 'backward') {
                    this.start = setInterval(function () {
                        _this5.prevSlideMove();
                    }, this.options.pause);
                }
            }
        }, {
            key: 'autoFade',
            value: function autoFade() {
                var _this6 = this;

                if (this.options.direction === 'forward') {
                    this.start = setInterval(function () {
                        _this6.nextFadeMove();
                    }, this.options.pause);
                }
                if (this.options.direction === 'backward') {
                    this.start = setInterval(function () {
                        _this6.prevFadeMove();
                    }, this.options.pause);
                }
            }
        }, {
            key: 'init',
            value: function init() {
                //Find control elements in DOM
                this.nextBtn = $(defaults.controlNext);
                this.prevBtn = $(defaults.controlPrev);
                this.build();
                this.findActive(this.$element);
            }
        }]);

        return Slider;
    }();

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var _this7 = this;

            if (!$.data(this, pluginName)) {

                $.data(this, pluginName, new Slider(this, options));
            }

            $.data(this, pluginName).init();

            if ($.data(this, pluginName).options.transition === 'slide') {
                $.data(this, pluginName).nextBtn.on('click', function () {
                    clearInterval($.data(_this7, pluginName).start);
                    $.data(_this7, pluginName).nextSlideMove();
                    $.data(_this7, pluginName).autoSlide();
                });

                $.data(this, pluginName).prevBtn.on('click', function () {
                    clearInterval($.data(_this7, pluginName).start);
                    $.data(_this7, pluginName).prevSlideMove();
                    $.data(_this7, pluginName).autoSlide();
                });
            }

            if ($.data(this, pluginName).options.transition === 'fade') {
                $.data(this, pluginName).nextBtn.on('click', function () {
                    clearInterval($.data(_this7, pluginName).start);
                    $.data(_this7, pluginName).nextFadeMove();
                    $.data(_this7, pluginName).autoFade();
                });

                $.data(this, pluginName).prevBtn.on('click', function () {
                    clearInterval($.data(_this7, pluginName).start);
                    $.data(_this7, pluginName).prevFadeMove();
                    $.data(_this7, pluginName).autoFade();
                });
            }
        });
    };
})(jQuery);

},{}]},{},[1]);
