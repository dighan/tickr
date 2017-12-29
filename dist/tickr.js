(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tickr = factory());
}(this, (function () { 'use strict';

/**
 * The default options, Tickr will use if none specified.
 */
var DEFAULT_OPTIONS = {
  /**
    * @type {Boolean} Start automatically the ticker after its creation.
    */
  autoStart: false,
  /**
    * @type {Number} The delay between tick in millisec.
    */
  delay: 0,

  /**
    * @type {Boolean} Invoke immediately the callback without waiting the first
    * tick is executed at specified delay.
    */
  immediate: false

  /**
   * Factories an independent ticker with its own timer.
   *
   * @param {Object} options An object containing options to customise the ticker.
   * @param {Function} callback A function that will be called at every tick.
   * @return {Object} A new ticker with helpers to control its internal timer.
   */
};function createTicker(options, callback) {
  var id = 0;
  var opt = Object.assign({}, DEFAULT_OPTIONS, options);

  if (opt.autoStart) {
    start();
  }

  function start() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? opt.delay : _ref$delay,
        _ref$immediate = _ref.immediate,
        immediate = _ref$immediate === undefined ? opt.immediate : _ref$immediate;

    if (delay !== opt.delay) {
      opt.delay = delay;
      stop();
    }

    if (immediate !== opt.immediate) {
      opt.immediate = immediate;
    }

    if (id === 0 && opt.delay > 0) {
      id = setInterval(tick, opt.delay);

      if (opt.immediate) {
        tick();
      }
    }
  }

  function tick() {
    callback();
  }

  function stop() {
    if (id > 0) {
      clearInterval(id);
      id = 0;
    }
  }

  function getOptions() {
    return opt;
  }

  return {
    getOptions: getOptions,
    start: start,
    stop: stop
  };
}

return createTicker;

})));
