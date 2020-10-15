const test = require('ava')
const debug = require('debug')('test')
const { replaceVersionShield, parseGitHubRepo } = require('../src/utils')

test('get name from github url', (t) => {
  const url = 'https://github.com/bahmutov/dependency-version-badge'
  const name = parseGitHubRepo(url)
  t.is(name, 'dependency-version-badge')
})

test('replacing dependency badge', (t) => {
  const markdown = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield({
    markdown,
    name: 'X',
    newVersion: '4.5.6',
  })
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
  const replaced = replaceVersionShield({
    markdown,
    name: 'my-library',
    newVersion: '4.5.6',
  })
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
  const replaced = replaceVersionShield({
    markdown,
    name: 'my-library',
    newVersion: '4.5.6',
    usedIn: 'my-library-example',
  })
  const expected = `
    this is readme markdown

    ![my-library used in my-library-example version](https://img.shields.io/badge/my--library-4.5.6-brightgreen)

    some other text
  `
  t.is(replaced, expected)
})

test('replacing short badge', (t) => {
  // short badge does not include the library name
  const markdown = `
    this is readme markdown

    ![library-name short](https://img.shields.io/badge/1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield({
    markdown,
    name: 'library-name',
    newVersion: '4.5.6',
    short: true,
  })
  const expected = `
    this is readme markdown

    ![library-name short](https://img.shields.io/badge/4.5.6-brightgreen)

    some other text
  `
  t.is(replaced, expected)
})
