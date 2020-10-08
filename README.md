<img src="internals/img/erb-banner.png" width="100%" />

<br>

<p>
  Electron React Boilerplate uses <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/redux">Redux</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.github.io/docs/">Webpack</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for rapid application development (HMR).
</p>

<br>

<div align="center">
  <a href="https://facebook.github.io/react/"><img src="./internals/img/react-padded-90.png" /></a>
  <a href="https://webpack.github.io/"><img src="./internals/img/webpack-padded-90.png" /></a>
  <a href="https://redux.js.org/"><img src="./internals/img/redux-padded-90.png" /></a>
  <a href="https://github.com/ReactTraining/react-router"><img src="./internals/img/react-router-padded-90.png" /></a>
  <a href="https://eslint.org/"><img src="./internals/img/eslint-padded-90.png" /></a>
  <a href="https://facebook.github.io/jest/"><img src="./internals/img/jest-padded-90.png" /></a>
  <a href="https://yarnpkg.com/"><img src="./internals/img/yarn-padded-90.png" /></a>
</div>

<hr />
<br />

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Dependency Status][david-image]][david-url]
[![DevDependency Status][david-dev-image]][david-dev-url]
[![Github Tag][github-tag-image]][github-tag-url]

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/electron-react-blpt)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/sponsors/badge.svg)](#sponsors)
[![Good first issues open][good-first-issue-image]][good-first-issue-url]
[![StackOverflow][stackoverflow-img]][stackoverflow-url]

</div>

## Install

- **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/400)**

First, clone the repo via git and install dependencies:

```bash
git clone --depth 1 --single-branch https://github.com/electron-react-boilerplate/electron-react-boilerplate.git your-project-name
cd your-project-name
yarn
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
yarn dev
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## Docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## Donations

**Donations will ensure the following:**

- 🔨 Long term maintenance of the project
- 🛣 Progress on the [roadmap](https://electron-react-boilerplate.js.org/docs/roadmap)
- 🐛 Quick responses to bug reports and help requests

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/electron-react-boilerplate#backer)]

## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/electron-react-boilerplate-594#sponsor)]

## Maintainers

- [Amila Welihinda](https://github.com/amilajack)
- [John Tran](https://github.com/jooohhn)
- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)

[github-actions-status]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/workflows/Test/badge.svg
[github-actions-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/actions
[github-tag-image]: https://img.shields.io/github/tag/electron-react-boilerplate/electron-react-boilerplate.svg?label=version
[github-tag-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/releases/latest
[stackoverflow-img]: https://img.shields.io/badge/stackoverflow-electron_react_boilerplate-blue.svg
[stackoverflow-url]: https://stackoverflow.com/questions/tagged/electron-react-boilerplate
[david-image]: https://img.shields.io/david/electron-react-boilerplate/electron-react-boilerplate.svg
[david-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate
[david-dev-image]: https://img.shields.io/david/dev/electron-react-boilerplate/electron-react-boilerplate.svg?label=devDependencies
[david-dev-url]: https://david-dm.org/electron-react-boilerplate/electron-react-boilerplate?type=dev
[good-first-issue-image]: https://img.shields.io/github/issues/electron-react-boilerplate/electron-react-boilerplate/good%20first%20issue.svg?label=good%20first%20issues
[good-first-issue-url]: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"
