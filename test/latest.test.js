const test = require('ava')
const debug = require('debug')('test')
const { getLatestVersion } = require('../src/utils')

test('fetches latest cypress version', async (t) => {
  const latest = await getLatestVersion('cypress')
  debug('latest Cypress version %s', latest)
  t.true(/^\d+\.\d+\.\d+$/.test(latest), 'is x.y.z version')
})

test('throws for non-existent packages', async (t) => {
  await t.throwsAsync(() => getLatestVersion('does-not-exist-probably-xyz123'))
})
