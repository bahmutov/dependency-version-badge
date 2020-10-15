#!/usr/bin/env node
// @ts-check

const arg = require('arg')
const debug = require('debug')('dependency-version-badge')
const pEachSeries = require('p-each-series')
const { updateBadge } = require('../src/utils')

const args = arg({
  '--from': String,
  '--short': Boolean,
})
debug('args: %o', args)

const names = args._
debug('names to process: %o', names)

if (names.length < 1) {
  console.error('Usage: update-version <package name> <package name2> ...')
  process.exit(1)
}

pEachSeries(names, (name) => {
  return updateBadge({ name, from: args['--from'] })
}).catch((err) => {
  console.error(err.message)
  process.exit(1)
})
