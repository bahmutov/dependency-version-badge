const test = require('ava')
const debug = require('debug')('test')
const {
  replaceVersionShield,
  parseGitHubRepo,
  getColorBehind,
} = require('../src/utils')

const green = 'brightgreen'

test('without latest version', (t) => {
  const color = getColorBehind('1.2.3')
  t.is(color, green)
})

test('compares same version', (t) => {
  const color = getColorBehind('1.2.3', '1.2.3')
  t.is(color, green)
})

test('ten patches behind', (t) => {
  const color = getColorBehind('1.2.20', '1.2.30')
  t.is(color, green)
})

test('one minor behind', (t) => {
  const color = getColorBehind('1.1.20', '1.2.30')
  t.is(color, green)
})

test('two minors behind', (t) => {
  const color = getColorBehind('1.0.20', '1.2.30')
  t.is(color, green)
})

test('three minors behind', (t) => {
  const color = getColorBehind('1.0.20', '1.3.30')
  t.is(color, 'yellow')
})

test('four minors behind', (t) => {
  const color = getColorBehind('1.0.20', '1.4.30')
  t.is(color, 'yellow')
})

test('one major behind', (t) => {
  const color = getColorBehind('1.10.0', '2.4.0')
  t.is(color, 'red')
})

test('three majors behind', (t) => {
  const color = getColorBehind('1.10.0', '4.4.0')
  t.is(color, 'red')
})

test('edge case: new version is above latest tag', (t) => {
  const color = getColorBehind('5.99.99', '1.2.30')
  t.is(color, green)
})

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

test('replacing yellow dependency badge with green', (t) => {
  const markdown = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-1.2.3-yellow)

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

test('replacing yellow dependency badge with yellow', (t) => {
  const markdown = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-1.2.3-yellow)

    some other text
  `
  const replaced = replaceVersionShield({
    markdown,
    name: 'X',
    newVersion: '4.5.6',
    latestVersion: '4.8.0',
  })
  const expected = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-4.5.6-yellow)

    some other text
  `
  t.is(replaced, expected)
})

test('replacing green dependency badge with red', (t) => {
  const markdown = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield({
    markdown,
    name: 'X',
    newVersion: '4.5.6', // major version behind the latest!
    latestVersion: '5.0.0',
  })
  const expected = `
    this is readme markdown

    ![X version](https://img.shields.io/badge/X-4.5.6-red)

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

test('replacing green dependency badge with red (short)', (t) => {
  const markdown = `
    this is readme markdown

    ![X short](https://img.shields.io/badge/1.2.3-brightgreen)

    some other text
  `
  const replaced = replaceVersionShield({
    markdown,
    name: 'X',
    newVersion: '4.5.6', // major version behind the latest!
    latestVersion: '5.0.0',
    short: true,
  })
  const expected = `
    this is readme markdown

    ![X short](https://img.shields.io/badge/4.5.6-red)

    some other text
  `
  t.is(replaced, expected)
})
