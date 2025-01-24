# CRM Programming School

CRM Programming School is a web application designed to manage student enrollments and administrative tasks for a programming school. It offers robust functionality for user authentication, role-based access control, and detailed management of enrollments and comments.

## Key Features

1. User Authentication and Role Management:
Implements secure JWT-based authentication and role-based access control for administrators and managers.
2.  Enrollment Management:
Enables creating, updating, deleting, and retrieving student enrollments with relevant filtering options.
3. Comments System:
Supports adding and managing comments for each enrollment, allowing better collaboration and tracking.
4. Swagger API Documentation:
Provides detailed and interactive API documentation via Swagger for easy testing and integration.
5. Data Validation and Error Handling:
Ensures data integrity with advanced input validation and comprehensive error handling.

## Technologies Used
- NestJS
- TypeORM
- MySQL
- Redis
- TypeScript
- JWT
- Swagger
- ReactJS
- Redux
- Bootstrap
- CSS


# Project Setup Instructions

## Prerequisites

- Node.js and npm installed on your machine.
- Docker Desktop is running on your computer

## Running the app

### Backend Setup

```bash

# 1. Navigate to the backend directory:
$ cd backend

# 2. Install dependencies:
$ npm install

# 3. Start Docker containers:
$ npm run start:docker:db

# 4. Run database migrations:
$ npm run migration:run 

# 5. Start the development server
$ npm run start:dev
```
### Frontend Setup

```bash

# 1. Navigate to the frontend directory:
$ cd frontend 

# 2. Install dependencies:
$ npm install

# 3. Start the frontend server:
$ npm run start

```
### API Documentation

This project includes API documentation generated with Swagger. Once the application is running, you can access the Swagger documentation by navigating to: **http://localhost:4000/api**

## Using the Documentation
- Explore Endpoints: Browse all available API endpoints, view request parameters, response schemas, and possible HTTP status codes.
- Test Endpoints: Use the interactive interface to send requests directly to the API from your browser.
- Authorization: You can input a JWT token within the Swagger UI to test protected endpoints.
