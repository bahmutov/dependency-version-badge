# dependency-version-badge [![demo CI][demo image]][demo url] [![CI][ci image]][ci url]

> A little script to update README file with dependency version badge

Badge examples ![prettier version](https://img.shields.io/badge/prettier-2.0.5-brightgreen) ![debug version](https://img.shields.io/badge/debug-4.1.1-brightgreen)

Example badge (in this readme) for dev dependency `prettier` (showing incorrect version 4.0.1)

    ![prettier version](https://img.shields.io/badge/prettier-4.0.1-brightgreen)

Can be updated by installing this module and running:

```shell
$ npm i -D dependency-version-badge
$ npx update-badge prettier
saving updated readme with prettier@2.0.5
# alternative without dev dependency
$ npx -p dependency-version-badge update-badge prettier
```

The README is updated to

    ![prettier version](https://img.shields.io/badge/prettier-2.0.5-brightgreen)

Good use: run this tool on `push` to `master` branch using [GitHub Action](https://glebbahmutov.com/blog/trying-github-actions/), then push updated code (if any) back to the repository. See [.github/workflows/demo.yml](.github/workflows/demo.yml).

You can pass multiple names at once

```shell
npx update-badge prettier debug ...
```

If a badge is not found, a new badge will be inserted on the first line of the README file. If the version contains special characters like `~` or `^`, they will be removed. If the version is `*`, then this tool will fail and exit with non-zero exit code.

## Examples

[cypress-svelte-unit-test](https://github.com/bahmutov/cypress-svelte-unit-test), [cy-rollup](https://github.com/bahmutov/cy-rollup)

## Versions in remote repositories

You can look up dependency versions in `package.json` files in remote repositories

```
npx update-badge dependency-version-badge --from https://github.com/bahmutov/cypress-svelte-unit-test
```

Will update the badge below

```
![dependency-version-badge used in cypress-svelte-unit-test version](... badge url ...)
```

For GitHub urls, you can simply use `--from <organization name>/<repo name>` like this

```
npx update-badge dependency-version-badge --from bahmutov/cypress-svelte-unit-test
```

You can pass a single dependency name and multiple `--from` parameters

```
npx update-badge X --from bahmutov/repo1 --from bahmutov/repo2 --from bahmutov/repo3
```

You can shorten multiple `--from` parameters using commas without spaces

```
npx update-badge X --from bahmutov/repo1,bahmutov/repo2,bahmutov/repo3
```

Examples table

<!-- prettier-ignore-start -->
Badge | Example repo
--- | ---
![dependency-version-badge used in cypress-svelte-unit-test version](https://img.shields.io/badge/dependency--version--badge-1.9.1-brightgreen) | [cypress-svelte-unit-test](https://github.com/bahmutov/cypress-svelte-unit-test)
![dependency-version-badge used in cy-rollup version](https://img.shields.io/badge/dependency--version--badge-1.2.0-brightgreen) | [cy-rollup](https://github.com/bahmutov/cy-rollup)
<!-- prettier-ignore-end -->

**Tip:** you can set a GitHub workflow to run using a schedule to update those badges periodically. For example, to update the badges every night:

```yml
on:
  schedule:
    # update badges every night
    # because we have a few badges that are linked
    # to the external repositories
    - cron: '0 3 * * *'
```

See example in [cypress-react-unit-test](https://github.com/bahmutov/cypress-react-unit-test#external-examples)

## Short badge

You can update a "short" badge where only the version of the dependency is listed. Use `--short` flag:

```shell
npx update-badge dependency-version-badge --short --from bahmutov/cy-rollup
```

The badge is below

![dependency-version-badge used in cy-rollup short](https://img.shields.io/badge/1.2.0-brightgreen)

## Behind the latest version

By default every badge is bright green. But you can look up the latest version of the dependency and color code the badge depending on how far the current version is behind the latest version. If the current version is the latest, or a couple of minor versions behind, the badge is green. If the current version is more than a couple of minor releases behind, but is still on the same major version, the badge is yellow. If the current version is 1 or more major versions behind, the badge is red.

<!-- prettier-ignore-start -->
Latest version | Current version | Badge
--- | --- | ---
2.3.0 | 2.2.0 | ![up-to-date badge](https://img.shields.io/badge/2.2.0-brightgreen)
2.3.0 | 2.0.0 | ![a few minor versions behind badge](https://img.shields.io/badge/2.0.0-yellow)
2.3.0 | 1.19.12 | ![major version behind badge](https://img.shields.io/badge/1.19.12-red)
<!-- prettier-ignore-end -->

To get a color-coded badge, use CLI flag `--behind`

Example color-coded badges for `ava` and `execa` dependencies are below

```shell
$ npm run demo:behind
```

<!-- prettier-ignore-start -->
Dependency Badge | Short badge
--- | ---
![ava version](https://img.shields.io/badge/ava-3.13.0-brightgreen) | ![ava short](https://img.shields.io/badge/3.13.0-brightgreen)
![execa version](https://img.shields.io/badge/execa-4.0.3-brightgreen) | ![execa short](https://img.shields.io/badge/4.0.3-brightgreen)
<!-- prettier-ignore-end -->

## Debugging

Run with environment variable `DEBUG=dependency-version-badge` to see verbose logs

## License

MIT license

[demo image]: https://github.com/bahmutov/dependency-version-badge/workflows/Demo/badge.svg?branch=master
[demo url]: https://github.com/bahmutov/dependency-version-badge/actions
[ci image]: https://github.com/bahmutov/dependency-version-badge/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/dependency-version-badge/actions
