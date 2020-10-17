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

const froms = args['--from'] || []
if (names.length > 1 && froms.length > 1) {
  console.error(
    'Cannot combine multiple dependency names with multiple --from parameters',
  )
  process.exit(1)
}

const onError = (err) => {
  console.error(err.message)
  process.exit(1)
}

const short = args['--short']
const behind = args['--behind']

if (froms.length > 1) {
  const name = names[0]
  debug('updating dependency "%s" from repos %o', name, froms)
  pEachSeries(froms, (from) => {
    const options = {
      name,
      from,
      short,
      behind,
    }
    return updateBadge(options)
  }).catch(onError)
} else {
  debug('updating names: %o', names)
  pEachSeries(names, (name) => {
    const options = {
      name,
      from: froms[0],
      short,
      behind,
    }
    return updateBadge(options)
  }).catch(onError)
}
