export default function createTicker(options, callback) {
  const DEFAULT_OPT = {
    autoStart: false,
    delay: 0,
    immediate: false,
    maxTicks: Infinity
  }

  let id = 0
  let opt = Object.assign(DEFAULT_OPT, options)

  function start({ delay = opt.delay, immediate = opt.immediate, maxTicks = opt.maxTicks } = {}) {
    if (typeof delay !== 'number' || delay <= 0) {
      throw new TypeError(`Expect "delay" to be greater than 0, "${delay}" given`)
    }

    if (typeof callback !== 'function') {
      throw new TypeError(`Expect "callback" to be a function, "${callback}" given`)
    }

    opt.delay = delay
    opt.immediate = immediate
    opt.maxTicks = maxTicks

    if (id === 0) {
      id = setInterval(callback, opt.delay)
    }
  }

  function stop() {
    if (id > 0) {
      clearInterval(id)
      id = 0
    }
  }

  return {
    start,
    stop,
    getAutoStart: () => opt.autoStart,
    getDelay: () => opt.delay,
    getImmediate: () => opt.immediate,
    getMaxTicks: () => opt.maxTicks
  }
}
