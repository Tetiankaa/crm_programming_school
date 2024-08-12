
# Project Setup Instructions

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

```bash
$ npm install
```

## Running the app

```bash

# start docker
Ensure Docker Desktop is running on your computer.

# run the following command to start the Docker containers:
$ npm run start:docker:db

# run Existing Migration
npm run migration:run 

# generate migration for creating all other tables
npm run migration:generate -name=createTables
npm run migration:run

# start the Development Server
$ npm run start:dev


```


