import test from 'ava'
import lolex from 'lolex'
import createTicker from '../dist/tickr'

const clock = lolex.install()

test('uses default options when not specified', t => {
  t.false(createTicker().getOptions().autoStart)
  t.is(createTicker().getOptions().delay, 0)
  t.false(createTicker().getOptions().immediate)
})

test('uses third options when specified', t => {
  t.true(createTicker({ autoStart: true }).getOptions().autoStart)
  t.is(createTicker({ delay: 1500 }).getOptions().delay, 1500)
  t.true(createTicker({ immediate: true }).getOptions().immediate)
})

clock.uninstall()
