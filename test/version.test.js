const test = require('ava')
const { cleanVersion, getAnyDependency } = require('../src/utils')

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

test('getAnyDependency understands optional dependencies', (t) => {
  const package = {
    dependencies: {
      foo: '1.2.3',
    },
    optionalDependencies: {
      bar: '2.3.4',
    },
  }
  const version = getAnyDependency(package, 'bar')
  t.is(version, '2.3.4')
})
