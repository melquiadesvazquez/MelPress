# MelPress

[![MIT License][license-image]][license-url]

Website similar to https://medium.com (blogging platform) built with Webpack, ES6 and SASS.

Live demo available on http://melpress.surge.sh

## Prerequisites

You need to install the following software on your machine before running this project:

1. Node.js  &ndash; <https://github.com/joyent/node/wiki/Installation>
2. npm (Node package manager)  &ndash; <https://github.com/isaacs/npm>
3. JSON Server (Database)  &ndash; <https://github.com/typicode/json-server>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Download the repository from GitHub

```shell
git clone https://github.com/melquiadesvazquez/MelPress.git
```

Install de project with NPM

```shell
cd MelPress
npm install
```

Copy .env.example to .env and review the values to match your preferences.

```shell
mv .env.example .env
```

Initialize JSON Server

```shell
npm run server
```

Get a development environment running

```shell
npm run start
```

## Testing

Open your browser and go to:

+ Website &ndash; http://localhost:3030
+ Alternatively, check the live demo [here](http://melpress.surge.sh)

![Melpress homepage](https://raw.githubusercontent.com/melquiadesvazquez/MelPress/master/src/assets/web1.jpg)

![Melpress post page](https://raw.githubusercontent.com/melquiadesvazquez/MelPress/master/src/assets/web2.jpg)

## Built with

+ [Nodejs](https://nodejs.org/) - JavaScript run-time environment
+ [Webpack](https://webpack.js.org/) - JavaScript module bundler
+ [JSON server](https://github.com/typicode/json-server) - REST API with CRUD operations based on a json file
+ [SASS](https://sass-lang.com/) - CSS preprocessor scripting language

## Restrictions

+ The live demo is connected with a third party JSON server on https://my-json-server.typicode.com, due to this, database updates are not allowed and new comments won't be created. However, that functionality should work on local.

## License

[MIT][license-url]


[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
