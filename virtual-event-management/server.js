const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./index');

const connectionString = process.env.MONGO_CONNECTION;
const database = process.env.MONGO_DATABASE;
try {
  mongoose.connect(connectionString + database, {});
} catch (error) {
  throw new Error(error);
}

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server is listening on ${port}`);
});
