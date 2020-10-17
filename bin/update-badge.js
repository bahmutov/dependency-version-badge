#!/usr/bin/env node
// @ts-check

const arg = require('arg')
const debug = require('debug')('dependency-version-badge')
const pEachSeries = require('p-each-series')
const { updateBadge } = require('../src/utils')

const args = arg({
  '--from': [String], // remote github repo(s) to check
  '--short': Boolean, // only put the version string into to the badge without dependency name
  '--behind': Boolean, // color code dependencies behind latest
})
debug('args: %o', args)

const names = args._
debug('names to process: %o', names)

if (names.length < 1) {
  console.error('Usage: update-version <package name> <package name2> ...')
  process.exit(1)
}

const from = args['--from'] || []
if (names.length > 1 && from.length > 1) {
  console.error(
    'Cannot combine multiple dependency names with multiple --from parameters',
  )
  process.exit(1)
}

if (from.length > 1) {
  debug('updating dependency "%s" from repos %o', names[0], from)
} else {
  debug('updating names: %o', names)
  pEachSeries(names, (name) => {
    const options = {
      name,
      from: from[0],
      short: args['--short'],
      behind: args['--behind'],
    }
    return updateBadge(options)
  }).catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
