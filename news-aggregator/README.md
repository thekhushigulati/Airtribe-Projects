
# News Aggregator API

This project involves building a RESTful API for a simple news aggragator application with user authentication using Node.js, Express.js, and NPM packages.

## Description
The API enables users to retrieve news based on user preferences and caches the API results, revalidate the cache and update the cache periodically. The project includes setting up a basic Node.js environment with Express.js and other necessary NPM packages. The API supports input validation, error handling, and is tested using Postman or Curl.
## API Endpoints

RESTful API with the following endpoints:

- POST /users/signup: Create a user with name, email, password, and preferences.
- POST /users/login: Authenticate a user and return jwt token
- GET /users/preferences: Retrieve user preferences after authorising the user
- PUT /users/preferences: Update the user preferences after authorising the user
- GET /news: Retrieve all news from external news API based on user prefernce.

External News Api: https://newsapi.org/v2/top-headlines


## Features
- MongoDB to store users.
- Proper error handling for invalid requests
## Installation 
### Prerequisites

- Install Node.js

    
### Run Locally

Clone the project

```bash
  git clone https://github.com/thekhushigulati/Airtribe-Projects.git
```

Go to the project directory

```bash
  cd news-aggregator
```

Install dependencies

```bash
  npm i
```

Create .env file
```bash
MONGO_CONNECTION = your_connection_details
MONGO_DATABASE = your_DB_name
API_SECRET = your_jwt_secret
```

Start the server

```bash
  npm run server
```

The API will be available at http://localhost:3000.
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Tech Stack

**Client:** Postman

**Server:** Node, Express


## Authors

- [@thekhushigulati](https://www.github.com/thekhushigulati)


## Feedback

If you have any feedback, please reach out to us at khushi.gulati.799@gmail.com

