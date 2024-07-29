async function UpdatePrefService(req,res) {
   try {
        const { message } = res;
        if(req.user === undefined){
            return res.status(req.status).send({ message });
        }
        req.user.preferences = req.body.preferences;
        await req.user.save();
        return { 
            status: 200,
            message: "Preferences updated successfully!",
            preferences: req.user.preferences
        };
    } catch (error) {
        return {
            status: 500,
            message: error.message
        };
    }
}

module.exports = { UpdatePrefService };