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

If a badge is not found, a new badge will be inserted on the first line of the README file

## Examples

[cypress-svelte-unit-test](https://github.com/bahmutov/cypress-svelte-unit-test), [cy-rollup](https://github.com/bahmutov/cy-rollup)

## Debugging

Run with environment variable `DEBUG=dependency-version-badge` to see verbose logs

## License

MIT license

[demo image]: https://github.com/bahmutov/dependency-version-badge/workflows/Demo/badge.svg?branch=master
[demo url]: https://github.com/bahmutov/dependency-version-badge/actions
[ci image]: https://github.com/bahmutov/dependency-version-badge/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/dependency-version-badge/actions
