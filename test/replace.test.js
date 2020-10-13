const test = require('ava')
const debug = require('debug')('test')
const { replaceVersionShield } = require('../src/utils')

test('replacing dependency badge', (t) => {
  const markdown = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield(markdown, 'X', '4.5.6')
  const expected = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-4.5.6-brightgreen)

    some other text
  `
  t.is(replaced, expected)
})

test('replacing dependency badge for longer name', (t) => {
  const markdown = `
    this is readme markdown

    ![my-library version](https://img.shields.io/badge/my--library-1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield(markdown, 'my-library', '4.5.6')
  const expected = `
    this is readme markdown

    ![my-library version](https://img.shields.io/badge/my--library-4.5.6-brightgreen)

    some other text
  `
  t.is(replaced, expected)
})

test('replacing dependency badge used by another repo', (t) => {
  const markdown = `
    this is readme markdown

    ![my-library used in my-library-example version](https://img.shields.io/badge/my--library-1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield(
    markdown,
    'my-library',
    '4.5.6',
    'my-library-example',
  )
  const expected = `
    this is readme markdown

    ![my-library used in my-library-example version](https://img.shields.io/badge/my--library-4.5.6-brightgreen)

    some other text
  `
  t.is(replaced, expected)
})
