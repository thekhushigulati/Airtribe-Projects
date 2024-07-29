const axios = require('axios');
const User = require('../models/user');

async function GetNewsService(req) {
    try {
        const user = await User.find({_id: req.user._id});
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'in',
                category: user[0].preferences[1],
                apiKey: '867dd7c1ae454a27b71c813be18895ed'
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