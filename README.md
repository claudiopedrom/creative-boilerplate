# Creative Boilerplate

Before using this boilerplate, it is important to note that some things are missing:
- [ ] Finish the Server part;
- [ ] Fallback to Prismic CMS;
- [ ] Add some base components (Preloader, etc.);
- [ ] Add missing part of JavaScript / WebGL;
- [ ] Possibly add TypeScript.

## About

This boilerplate is build on top of the amazing course taught by [Luis Henrique Bizarro](https://github.com/lhbizarro) on awwwards.academy.

The main differences from what was taught are:

* A more "standard" `eslint` configuration;
* It uses `stylelint` to lint our `css` and `scss`;
* `prettier` working together with `eslint` and `stylelint`;
* VSCode configuration to fix code errors on save;
* It includes a simple GitHub action that checks our code when a Pull Request is open;
* `husky` and `lint-staged` configured to lint and fix our code on `pre-commit`;
* A different folder structure, `styles` and `assets` live inside a `src` folder;
* `fonts` are stored inside the `assets` folder;
* New folder on the root for `static` assets;
* Some of the webpack configurations were not needed and were removed from the file;
* Webpack was set up to use `Asset Modules` instead of the old webpack 4 way with loaders;
* Setup of different `alias` on webpack, also set on the `jsconfig.json` to work properly on VSCode;
* Individual `postcss` configuration;
* It uses Bootstrap 5 reboot instead of Meyer's reset;
* Everything related to Express are inside the `server` folder.

## Getting Started

Create a `.env` file and update with your Prismic details (use the `.env.example` as reference).

Make sure you already have a website installed on Prismic CMS in order for everything to work as expected.

To fill in the `.env` information just create a new project in Prismic CMS and in Settings / API & Secutiry generate an Access Token.

For boilerplate basics just create a new _Custom Type_ called Meta with the following fields:
* `Key Text` field - Title
* `Key Text` field - Description
* `Image` field - Image

Don't forget to create a document with the information filled in afterwards.

Install the project dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
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
