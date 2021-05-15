This boilerplate is build on top of the amazing course taught by [Luis Henrique Bizarro](https://github.com/lhbizarro) on awwwards.academy.

The main differences from what was taught are:

* A more "standard" `eslint` configuration;
* It uses `stylelint` to lint our `css` and `scss`;
* `prettier` working together with `eslint` and `stylelint`;
* VSCode configuration to fix code errors on save;
* It includes a simple GitHub action that checks our code when a Pull Request is open;
* `husky` and `lint-staged` configured to lint and fix our code on `pre-commit`;
* A different folder structure, `styles` and `assets` live inside a `src` folder;
* New folder on the root for `static` assets;
* Some of the webpack configurations were not needed and were removed from the file;
* Setup of different `alias` on webpack, also set on the `jsconfig.json` to work properly on VSCode;
* Individual `postcss` configuration.

## Getting Started

Install the project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other commands:

Lint scripts and styles:

```bash
npm run lint
```

Only lint the scripts:

```bash
npm run lint:scripts
```

Only lint the styles:

```bash
npm run lint:styles
```
