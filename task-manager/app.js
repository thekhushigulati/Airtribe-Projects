const express = require('express');
const tasks = require('./task.json').tasks;
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

//Filter tasks based on Query Parameters
// app.get('/tasks/qp?', (req, res) => {
//     const queryParams = req.query;
//     const {title,description,completed,priority} = queryParams;
//     const filteredByTitle = tasks.filter(task => task.title.includes(title));
//     let tasksToUse = title ? filteredByTitle : tasks;
//     const filteredByDescription = tasksToUse.filter(task => task.description.includes(description));
//     tasksToUse = description ? filteredByDescription : tasksToUse;
//     const filteredByCompleted = tasksToUse.filter(task => task.completed === Boolean(completed));
//     console.log(filteredByCompleted);
//     tasksToUse = completed ? filteredByCompleted : tasksToUse;
//     const filteredTasks = tasksToUse.filter(task => task.priority === priority);
//     if(!filteredTasks)
//         return res.status(404).send('Any task matching with the given criteria was not found.');
//     res.json(filteredTasks);
// });

//Get ALL tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
  
//Get Single Task
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task)
            return res.status(404).send('The task with the given ID was not found.');
    res.json(task);
});

//Get Task with given priority
app.get('/tasks/priority/:level', (req, res) => {
    const level = req.params.level;
    const filteredTasks = tasks.filter(task => task.priority === level);
    res.json(filteredTasks);
});

//Create Task
app.post('/tasks', (req, res) => {
    const task = {
            id: tasks.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            priority: req.body.priority
    };
    if(task.title && task.description){
        if(typeof req.body.completed === 'boolean'){
            tasks.push(task);
            res.status(201).json(task);
        } else {
            res.status(400).send('Please provide a boolean value for \'completed\' field.');
        }
    } else {
        res.status(400).send('Please provide both title and description for the task.');
    }
    
});

//Update Task with PUT
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task)
            return res.status(404).send('The task with the given ID was not found.');
    if(req.body.title && req.body.description){
        if(typeof req.body.completed === 'boolean'){
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;
            task.priority = req.body.priority;
            res.json(task);
        } else {
            res.status(400).send('Please provide a boolean value for the \'completed\' field.');
        }
    } else {
        res.status(400).send('Please provide both title and description for the task.');
    }
});

//Delete Task
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task)
            return res.status(404).send('The task with the given ID was not found.');
    const index = tasks.indexOf(task);
    tasks.splice(index,1);
    res.json(task);
});

module.exports = app;