# GolMask Browser Extension

## Building locally

 - Install [Node.js](https://nodejs.org/en/) version 6.3.1 or later.
 - Install local dependencies with `npm install`.
 - Install gulp globally with `npm install -g gulp-cli`.
 - Build the project to the `./dist/` folder with `gulp build`.
 - Optionally, to rebuild on file changes, run `gulp dev`.
 - To package .zip files for distribution, run `gulp zip`, or run the full build & zip with `gulp dist`.

 Uncompressed builds can be found in `/dist`, compressed builds can be found in `/builds` once they're built.

## Development

```bash
npm install
npm start
```

## Build for Publishing

```bash
npm run dist
```
