#!/usr/bin/env node
// @ts-check

const debug = require('debug')('dependency-version-badge')
const path = require('path')
const fs = require('fs')

if (process.argv.length < 3) {
  console.error('Usage: update-version <package name> <package name2> ...')
  process.exit(1)
}

const names = process.argv.slice(2)
debug('names to process: %o', names)
names.forEach(updateBadge)

function updateBadge(name) {
  debug('updating badge "%s"', name)
  const pkgFilename = path.join(process.cwd(), 'package.json')
  const pkg = require(pkgFilename)
  const allDependencies = Object.assign(
    {},
    pkg.dependencies,
    pkg.devDependencies,
  )
  const currentVersion = allDependencies[name]
  if (!currentVersion) {
    console.error('Could not find dependency %s among dependencies', name)
    process.exit(1)
  }
  debug('current dependency version %s@%s', name, currentVersion)

  const readmeFilename = path.join(process.cwd(), 'README.md')
  const readmeText = fs.readFileSync(readmeFilename, 'utf8')

  function escapeName(name) {
    // for shields.io need to change each '-' into '--'
    return name.replace(/-/g, '--')
  }

  function replaceVersionShield(name, newVersion) {
    const escapedName = escapeName(name)
    const cypressVersionRe = new RegExp(
      'https://img\\.shields\\.io/badge/' +
        escapedName +
        '-(\\d+\\.\\d+\\.\\d+)-brightgreen',
    )
    const cypressNewVersion = `https://img.shields.io/badge/${escapedName}-${newVersion}-brightgreen`
    debug('new badge contents "%s"', cypressNewVersion)

    const updatedReadmeText = readmeText.replace(
      cypressVersionRe,
      cypressNewVersion,
    )
    return updatedReadmeText
  }

  // replaceVersionShield('cypress', '4.5.1')
  const maybeChangedText = replaceVersionShield(name, currentVersion)
  if (maybeChangedText !== readmeText) {
    console.log('saving updated readme with %s@%s', name, currentVersion)
    fs.writeFileSync(readmeFilename, maybeChangedText, 'utf8')
  } else {
    debug('no updates for dependency %s', name)
  }
}
