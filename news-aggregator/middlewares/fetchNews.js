const { fetchNews } = require('../middlewares/fetchNews');

async function getNews () {
    try {
        const { response } = await fetchNews();
        return next();
    } catch (error) {
        res.status(500).send({
          message: error.message
        });
    }
};