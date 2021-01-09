# TO-DO-WEBAPP

This app is built using;

### React, for the client.

- Setup and configured using [create-react-app](https://create-react-app.dev/).
- Uses [react-bootstrap](https://react-bootstrap.github.io/) library for UI components.

### Node.js(Express), for the server.

Exposes four API endpoints for managing ToDos:

- `GET` `/todos`
- `POST` `/todos`
- `PUT` `/todos/:id`
- `DELETE` `/todos/:id`

### MongoDB, as the database layer.

The application uses database name `todos-db` and collection name `todolist`, and is reachable on `localhost`, port `27017`. See setup instructions below.

## Setup

### Prerequisites

#### Node.js.

[Install for your operating system.](https://nodejs.org/en/)

#### Mongo DB.

1. [Install Docker for your operating system](https://docs.docker.com/get-docker/).
2. Run the `mongo:4.4` docker image.

```sh
docker run -d --name todolist-db -p 27017:27017 mongo:4.4
```

3.

a. To stop the mongodb docker container, run:

```sh
docker stop todolist-db
```

b. To start mongodb docker container again, run:

```sh
docker start todolist-db
```

### Install Dependencies

Run `npm run install-deps`

### Start Development Server

Run `npm start`

If successful, client should be running on `http://localhost:3000/` and server should be running on `http://localhost:5000/`.

Have fun creating ToDos. :D
