# dependency-version-badge ![prettier version](https://img.shields.io/badge/prettier-2.0.5-brightgreen) [![demo CI][ci image]][ci url]

> A little script to update README file with dependency version badge

Example badge (in this readme) for dev dependency `prettier` (showing incorrect version 4.0.1)

    ![prettier version](https://img.shields.io/badge/prettier-4.0.1-brightgreen)

Can be updated by installing this module and running:

```shell
$ npm i -D dependency-version-badge
$ npx update-badge prettier
saving updated readme with prettier@2.0.5
```

The README is updated to

    ![prettier version](https://img.shields.io/badge/prettier-2.0.5-brightgreen)

Good use: run this tool on `push` to `master` branch using [GitHub Action](https://glebbahmutov.com/blog/trying-github-actions/), then push updated code (if any) back to the repository. See [.github/workflows/demo.yml](.github/workflows/demo.yml).

[ci image]: https://github.com/bahmutov/dependency-version-badge/workflows/Demo/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/dependency-version-badge/actions
