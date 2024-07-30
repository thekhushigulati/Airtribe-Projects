const express = require('express');
const routes = express.Router();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const userRoute = require('./routes/userRoute');
const { verifyToken } = require("./middlewares/authJWT");
const { getNews } = require("./controllers/newsController");

const port = 3000;
const app = express();
app.use(cors());
app.use(routes);
routes.use(express.urlencoded({ extended: false }));
routes.use(express.json());

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

app.get('/', (_, res)=>{
    res.status(200).send("Welcome to the Airtribe's News Aggregator App");
});  

routes.use("/users", userRoute);

routes.get('/news', verifyToken, getNews);

app.use("*", function (_, res) {
    res.status(404).json({ error: "This route does not exist!"});
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app;
