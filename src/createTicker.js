/**
 * The default options, Tickr will use if none specified.
 */
const DEFAULT_OPTIONS = {
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
}

/**
 * Factories an independent ticker with its own timer.
 *
 * @param {Object} options An object containing options to customise the ticker.
 * @param {Function} callback A function that will be called at every tick.
 * @return {Object} A new ticker with helpers to control its internal timer.
 */
export default function createTicker(options, callback) {
  let id  = 0
  let opt = Object.assign({}, DEFAULT_OPTIONS, options)

  if (opt.autoStart) {
    start()
  }

  function start({ delay = opt.delay, immediate = opt.immediate } = {}) {
    if (delay !== opt.delay) {
      opt.delay = delay
      stop()
    }

    if (immediate !== opt.immediate) {
      opt.immediate = immediate
    }

    if (id === 0 && opt.delay > 0) {
      id = setInterval(tick, opt.delay) 

      if (opt.immediate) {
        tick()
      }
    }
  }

  function tick() {
    callback()
  }

  function stop() {
    if (id > 0) {
      clearInterval(id)
      id = 0
    }
  }

  function getOptions() {
    return opt
  }

  return {
    getOptions,
    start,
    stop
  }
}
