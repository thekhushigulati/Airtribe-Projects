const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userRoute = require('./routes/userRoute');
// const newsInfo = require('./routes/newsRoute');
const { verifyToken } = require("./middlewares/authJWT");
const { getNews } = require("./controllers/newsController");

const port = 3000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const connectionString = process.env.MONGO_CONNECTION;
const database = process.env.MONGO_DATABASE;
try {
    mongoose.connect(connectionString + database, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connected to DB!");
} catch (error) {
    handleError(error);
}

app.get('/', (req, res)=>{
    res.status(200).send("Welcome to the Airtribe's News Aggregator App");
});  

app.use("/users", userRoute);

// app.get("/news", newsInfo);
app.get('/news', verifyToken, getNews);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;


//News API Key: 867dd7c1ae454a27b71c813be18895ed