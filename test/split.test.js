const test = require('ava')
const { splitCommas } = require('../src/utils')

test('empty array', (t) => {
  const result = splitCommas([])
  t.deepEqual(result, [])
})

test('no split necessary', (t) => {
  const result = splitCommas(['foo'])
  t.deepEqual(result, ['foo'])
})

test('no split necessary, multiple', (t) => {
  const result = splitCommas(['foo', 'bar', 'baz'])
  t.deepEqual(result, ['foo', 'bar', 'baz'])
})

test('split several', (t) => {
  const result = splitCommas(['foo,bar', 'bar2', 'baz,foo2'])
  t.deepEqual(result, ['foo', 'bar', 'bar2', 'baz', 'foo2'])
})
