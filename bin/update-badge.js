#!/usr/bin/env node
// @ts-check

const arg = require('arg')
const debug = require('debug')('dependency-version-badge')
const { updateBadge } = require('../src/utils')

const args = arg({
  '--from': String,
})
debug('args: %o', args)

if (process.argv.length < 3) {
  console.error('Usage: update-version <package name> <package name2> ...')
  process.exit(1)
}

const names = process.argv.slice(2)
debug('names to process: %o', names)
names.forEach(updateBadge)
