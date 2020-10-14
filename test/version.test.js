const test = require('ava')
const { cleanVersion } = require('../src/utils')

test('cleaning already clean version', (t) => {
  const result = cleanVersion('4.2.0')
  t.is(result, '4.2.0')
})

test('cleaning ^', (t) => {
  const result = cleanVersion('^4.2.0')
  t.is(result, '4.2.0')
})

test('cleaning ~', (t) => {
  const result = cleanVersion('~4.2.0')
  t.is(result, '4.2.0')
})

test('cleaning *', (t) => {
  const result = cleanVersion('*')
  t.is(result, null)
})
