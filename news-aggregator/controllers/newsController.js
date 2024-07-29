const { GetNewsService } = require('../services/newsService');

async function getNews(req,res) {
    try {        
        const { message } = res;
        if(req.user === undefined){
            return res.status(req.status).send({ message });
        }
        const { news } = await GetNewsService(req);
        return res.status(200).send({news: news});
    } catch (error) {
        return res.status(401).send({ 
            message: error.message 
        });
    }
}

module.exports = { getNews };