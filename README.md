## 💡 Project

Gobarber is a full-stack application for barbers to with their customers built with React, React Native and Node.js

## 🚀 Quick start

### Pre-requisites

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

```
Go to: http://localhost:3333/api-docs
```

## Lint

```sh
$ yarn lint
```

## 📝 License

This project is licensed under the terms of the [MIT](https://github.com/jeferson-sb/gobarber-server/blob/master/LICENSE) license

`Made with ♥ by Jeferson © 2020`
