const express = require('express');

const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

app.get('/', (_, res) => {
  res
    .status(200)
    .send("Welcome to the Airtribe's Virtual Event Management App");
});

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

app.use('*', function(_, res) {
  return res.status(404).json({ error: 'This route does not exist!' });
});

module.exports = app;
