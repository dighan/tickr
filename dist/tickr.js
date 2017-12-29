(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tickr = factory());
}(this, (function () { 'use strict';

function createTicker(options, callback) {
  var DEFAULT_OPT = {
    autoStart: false,
    delay: 0,
    immediate: false,
    maxTicks: Infinity
  };

  var id = 0;
  var opt = Object.assign(DEFAULT_OPT, options);

  function start() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$delay = _ref.delay,
        delay = _ref$delay === undefined ? opt.delay : _ref$delay,
        _ref$immediate = _ref.immediate,
        immediate = _ref$immediate === undefined ? opt.immediate : _ref$immediate,
        _ref$maxTicks = _ref.maxTicks,
        maxTicks = _ref$maxTicks === undefined ? opt.maxTicks : _ref$maxTicks;

    if (typeof delay !== 'number' || delay <= 0) {
      throw new TypeError('Expect "delay" to be greater than 0, "' + delay + '" given');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('Expect "callback" to be a function, "' + callback + '" given');
    }

    opt.delay = delay;
    opt.immediate = immediate;
    opt.maxTicks = maxTicks;

    if (id === 0) {
      id = setInterval(callback, opt.delay);
    }
  }

  function stop() {
    if (id > 0) {
      clearInterval(id);
      id = 0;
    }
  }

  return {
    start: start,
    stop: stop,
    getAutoStart: function getAutoStart() {
      return opt.autoStart;
    },
    getDelay: function getDelay() {
      return opt.delay;
    },
    getImmediate: function getImmediate() {
      return opt.immediate;
    },
    getMaxTicks: function getMaxTicks() {
      return opt.maxTicks;
    }
  };
}

return createTicker;

})));
