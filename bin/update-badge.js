#!/usr/bin/env node
// @ts-check

const arg = require('arg')
const debug = require('debug')('dependency-version-badge')
const { updateBadge } = require('../src/utils')

const args = arg({
  '--from': String,
})
debug('args: %o', args)

const names = args._
debug('names to process: %o', names)

if (names.length < 1) {
  console.error('Usage: update-version <package name> <package name2> ...')
  process.exit(1)
}

names.forEach(updateBadge)
