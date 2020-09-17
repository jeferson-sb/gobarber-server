<div align="center">
  <img src=".github/logo.svg" />

  ![](https://img.shields.io/badge/GoStack-12.0-success?style=flat-square)
  ![](https://img.shields.io/badge/TypeScript-4.0.2-blue?style=flat-square)
  ![](https://img.shields.io/badge/coverage-99%-success?style=flat-square)
</div>

## 💡 Project

Gobarber is a full-stack application to help barbers scheduling appointments with their customers built with React, React Native and Node.js

- [Gobarber Web](https://github.com/jeferson-sb/gobarber-web)
- Gobarber Server
- [Gobarber Mobile]()

## 🚀 Quick start

### Pre-requisites

- Node.js >= 12.18
- Docker >= 19.03.12

> Copy .env.example to .env and fill out with your own enviroment credentials

### Installation (Node)

```
$ cd gobarber-server
$ yarn
```

### Usage

Run all migrations

```sh
$ yarn typeorm migration:run
```

Start development server

```sh
$ yarn dev:server
```

### Installation (Docker)

Starting containers

```sh
$ docker-compose up
```

Stoping containers

```sh
$ docker-compose stop
```

## Tests

```sh
$ yarn test
```

## Docs

Start server
```
$ yarn dev:server
```

Access swagger docs by opening: [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

## Lint

```sh
$ yarn lint
```

## 📝 License

This project is licensed under the terms of the [MIT](https://github.com/jeferson-sb/gobarber-server/blob/master/LICENSE) license

`Made with ♥ by Jeferson © 2020`
