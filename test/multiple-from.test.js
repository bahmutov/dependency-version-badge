const test = require('ava')
const arg = require('arg')
const debug = require('debug')('test')

// how does arg parse multiple --from ... --from ... arguments?
const argOptions = {
  '--from': [String],
}
test('parsing empty list', (t) => {
  const parsed = arg(argOptions, { argv: [] })
  debug('parsed %o', parsed)
  t.deepEqual(parsed, {
    _: [],
  })
})

test('parsing a few names', (t) => {
  const parsed = arg(argOptions, { argv: ['a', 'b'] })
  debug('parsed %o', parsed)
  t.deepEqual(parsed, {
    _: ['a', 'b'],
  })
})

test('parsing a few names followed by --from', (t) => {
  const parsed = arg(argOptions, { argv: ['a', 'b', '--from', 'foo'] })
  debug('parsed %o', parsed)
  t.deepEqual(parsed, {
    '--from': ['foo'],
    _: ['a', 'b'],
  })
})

test('parsing --from then a few names', (t) => {
  const parsed = arg(argOptions, { argv: ['--from', 'foo', 'a', 'b'] })
  debug('parsed %o', parsed)
  t.deepEqual(parsed, {
    '--from': ['foo'],
    _: ['a', 'b'],
  })
})

test('multiple --from', (t) => {
  const parsed = arg(argOptions, {
    argv: ['--from', 'foo', 'a', 'b', '--from', 'bar'],
  })
  debug('parsed %o', parsed)
  t.deepEqual(parsed, {
    '--from': ['foo', 'bar'],
    _: ['a', 'b'],
  })
})
