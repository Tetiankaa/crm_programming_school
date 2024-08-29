
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

# run existing migrations
npm run migration:run 

# start the Development Server
$ npm run start:dev


## API Documentation

This project includes API documentation generated with Swagger. 

Once the application is running, you can access the Swagger documentation in your web browser by navigating to the following URL: http://localhost:3000/api

# Using the Documentation

 - Explore Endpoints: Browse all available API endpoints, view request parameters, response schemas, and possible HTTP status codes.
 - Test Endpoints: Use the interactive interface to send requests directly to the API from your browser.
 - Authorization: You can input a JWT token within the Swagger UI to test protected endpoints.
```


