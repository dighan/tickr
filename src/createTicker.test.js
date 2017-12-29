import test from 'ava'
import sinon from 'sinon'
import createTicker from '../dist/tickr'

test.beforeEach(t => {
  t.context.clock = sinon.useFakeTimers({
    toFake: ['setInterval']
  })
})

test('Uses default options when not specified', t => {
  t.false(createTicker().getAutoStart())
  t.is(createTicker().getDelay(), 0)
  t.false(createTicker().getImmediate())
  t.is(createTicker().getMaxTicks(), Infinity)
})

test('Uses third options when specified', t => {
  t.true(createTicker({ autoStart: true }).getAutoStart())
  t.is(createTicker({ delay: 1000 }).getDelay(), 1000)
  t.true(createTicker({ immediate: true }).getImmediate())
  t.is(createTicker({ maxTicks: 5 }).getMaxTicks(), 5)
})

test('Throws an exception when the "delay" is invalid', t => {
  const ticker = createTicker({ delay: -1 }, () => {})

  const error = t.throws(
    () => ticker.start(),
    TypeError
  )

  t.is(error.message, 'Expect "delay" to be greater than 0, "-1" given')
})

test('Throws an exception when the "callback" is invalid', t => {
  const ticker = createTicker({ delay: 1000 }, null)

  const error = t.throws(
    () => ticker.start(),
    TypeError
  )

  t.is(error.message, 'Expect "callback" to be a function, "null" given')
})

test('Invokes callback when the "delay" is greater than 0', t => {
  const callback = sinon.spy()

  const ticker = createTicker({ delay: 1000 }, callback)
  ticker.start()
  t.context.clock.tick(1000)

  t.true(callback.calledOnce)
})

test.afterEach(t => {
  t.context.clock.restore()
  t.context.clock = null
})
