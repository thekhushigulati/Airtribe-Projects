const express = require('express');
const app = express();
app.use(express.json());
const { UpdatePrefService } = require('../services/prefService');

function getPreferences(req, res) {
    const { message } = res;
    if(req.user === undefined){
        return res.status(req.status).send({ message });
    }
    return res.status(req.status).send({ 
        message,
        preferences: req.user.preferences 
    });
}

async function updatePreferences(req, res) {
    try {
        const { status, message, preferences } = await UpdatePrefService(req,res);
        if(status === 200) {
            return res.status(status).send({
                preferences: preferences,
                message: message
            });
        } else {
            return res.status(status).send({
                message: message
            });
        }
    } catch (error) {
        return res.status(500).send({
          message: error.message
        });
    }
}

module.exports = { getPreferences, updatePreferences }