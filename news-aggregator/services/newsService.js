const axios = require('axios');
const User = require('../models/user');

const NEWS_TOP = "https://newsapi.org/v2/top-headlines";

async function GetNewsService(req) {
    try {
        const user = await User.find({_id: req.user._id});
        if (!user[0]) {
            return {
                status: 404,
                message: "User not found!"
            };
        }
        const response = await axios.get(NEWS_TOP, {
            params: {
                country: 'in',
                category: "",//user[0].preferences[1],
                apiKey: process.env.NEWS_API_KEY
            }
        });
        return {
            status: 200,
            message: "News fetched successfully!",
            news: response.data.articles
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}
    
module.exports = { GetNewsService };