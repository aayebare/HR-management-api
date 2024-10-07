# HR System Backend

## Overview

The HR System Backend is a RESTful API designed to support the staff onboarding process. It provides functionalities for registering staff members, retrieving staff details, and updating staff information.

## Technologies Used

- **Node.js**: JavaScript runtime for building scalable applications.(20+)
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing staff information.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Features

- Staff registration with optional ID photo upload.
- Retrieve staff details based on various parameters.
- Update staff information, including date of birth and ID photo.
- Environment variable configuration for API settings.
- Error handling and response management.

## API Endpoints

### Staff Registration

- **POST** `/api/staff/register`
  - **Description**: Registers a new staff member.
  - **Request Body**:
    - `surname`: string (required)
    - `otherNames`: string (required)
    - `dob`: date (required)
    - `idPhoto`: file (optional)
    - `authCode`: string (exactly 10 characters, required)
  - **Response**: 
    - 201 Created: Returns the registered employee number.
    - 400 Bad Request: Validation errors.

### Staff Retrieval

- **GET** `/api/staff`
  - **Description**: Retrieves all staff members.
  - **Response**: 
    - 200 OK: Returns an array of staff members.

- **GET** `/api/staff/:id`
  - **Description**: Retrieves a specific staff member by ID.
  - **Response**: 
    - 200 OK: Returns the staff member's details.
    - 404 Not Found: If the staff member does not exist.

### Staff Update

- **PUT** `/api/staff/:id`
  - **Description**: Updates an existing staff member's details.
  - **Request Body**:
    - `dob`: date (optional)
    - `idPhoto`: file (optional)
  - **Response**:
    - 200 OK: Successfully updated staff member.
    - 404 Not Found: If the staff member does not exist.
    - 400 Bad Request: Validation errors.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aayebare/HR-management-api.git
   cd hr-management-api

2. npm install

3. create a .ENV FILE and populate it with:

 ```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yourdb
```

## NOTE: You need to have DB set up locally or you can follow the guide here for a free use test cluster [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 

4. node.app.js

