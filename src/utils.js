// @ts-check
const debug = require('debug')('dependency-version-badge')
const path = require('path')
const fs = require('fs')
const os = require('os')

function escapeName(name) {
  // for shields.io need to change each '-' into '--'
  return name.replace(/-/g, '--')
}

function replaceVersionShield(readmeText, name, newVersion) {
  const escapedName = escapeName(name)
  const badgeVersionRe = new RegExp(
    'https://img\\.shields\\.io/badge/' +
      escapedName +
      '-(\\d+\\.\\d+\\.\\d+)-brightgreen',
  )
  const badgeUrl = `https://img.shields.io/badge/${escapedName}-${newVersion}-brightgreen`
  debug('new badge contents "%s"', badgeUrl)
  let found

  let updatedReadmeText = readmeText.replace(badgeVersionRe, (match) => {
    found = true
    return badgeUrl
  })

  if (!found) {
    console.log('⚠️ Could not find version badge for dependency "%s"', name)
    console.log('Insert new badge on the first line')
    const badge = `![${name} version](${badgeUrl})`
    debug('inserting new badge: %s', badge)

    const lines = readmeText.split(os.EOL)
    if (lines.length < 1) {
      console.error('README file has no lines, cannot insert version badge')
      return readmeText
    }
    lines[0] += ' ' + badge
    updatedReadmeText = lines.join(os.EOL)
  }
  return updatedReadmeText
}

function findVersionFromPackageFile(name) {
  debug('reading version of "%s" from package.json file', name)
  const pkgFilename = path.join(process.cwd(), 'package.json')
  const pkg = require(pkgFilename)
  const allDependencies = Object.assign(
    {},
    pkg.dependencies,
    pkg.devDependencies,
  )
  const currentVersion = allDependencies[name]
  return currentVersion
}

function findVersionFrom(name, from) {
  if (!from) {
    return Promise.resolve(findVersionFromPackageFile(name))
  }
}

/**
 * Updates the given badge (if found) with new version information
 * read from the "package.json" file. Returns a promise
 */
function updateBadge({ name, from }) {
  debug('updating badge "%s"', name)

  return findVersionFrom(name, from).then((currentVersion) => {
    if (!currentVersion) {
      const message = `Could not find dependency "${name}" among dependencies`
      debug(message)
      return Promise.reject(new Error(message))
    }
    debug('current dependency version %s@%s', name, currentVersion)

    const readmeFilename = path.join(process.cwd(), 'README.md')
    const readmeText = fs.readFileSync(readmeFilename, 'utf8')

    const maybeChangedText = replaceVersionShield(
      readmeText,
      name,
      currentVersion,
    )
    if (maybeChangedText !== readmeText) {
      console.log('saving updated readme with %s@%s', name, currentVersion)
      fs.writeFileSync(readmeFilename, maybeChangedText, 'utf8')
    } else {
      debug('no updates for dependency %s', name)
    }
  })
}

module.exports = {
  updateBadge,
}
