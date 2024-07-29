
# Task Manager

In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, a flag for completion status, and a priority.


## Appendix

RESTful API with the following endpoints:

- GET /tasks: Retrieve all tasks.
- GET /tasks/:id: Retrieve a single task by its ID.
- GET /tasks/priority/:level: Retrieve tasks based on priority level.
- POST /tasks: Create a new task.
- PUT /tasks/:id: Update an existing task by its ID.
- DELETE /tasks/:id: Delete a task by its ID.


## API Reference

#### Get all tasks

```http
  GET /tasks
```

#### Get a single task

```http
  GET /tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |

#### Get tasks based on priority

```http
   GET /tasks/priority/${level}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `level`      | `string` | **Required**. Priority of item to fetch |

#### Create a task

```http
  POST /tasks
```

#### Update an existing task based on ID 

```http
  PUT /tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |

#### Delete a task based on ID

```http
  DELETE /tasks/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to fetch |



## Installation

Install task-manager with npm

```bash
  npm install task-manager
  cd task-manager
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/thekhushigulati/Airtribe_Projects.git
```

Go to the project directory

```bash
  cd task-manager
```

Install dependencies

```bash
  npm install express
  npm install nodemon --save-dev
```

Start the server

```bash
  npm run server
```


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

