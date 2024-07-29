const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function UserRegService(body) {
    try {
        const { name, password, email, preferences } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        //calling DB to store user's name, password, email and preferences
        const user = new User({
            name,
            password: hashedPassword,
            email,
            preferences
        });
        await user.save();
        //responding to client request with registration successful message
        return {
            message: "User Registered successfully!!"
        };
    } catch (error) {
        throw new Error(error);
    }
}

async function UserLoginService(body) {
    try {
        const { email, password } = body;
        const user = await User.find({ email: email });
        if (!user[0]) {
            return {
                status: 404,
                message: "User not found!"
            };
        }
        //comparing passwords
        const passwordValid = await bcrypt.compare(
            password,
            user[0].password
        );
        //checking if password was valid and send response accordingly
        if (!passwordValid) {
            return {
                status: 401,
                message: "Invalid Password!"
            };
        }
        //signing token with user id
        var token = jwt.sign({
            id: user[0].id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });
        //responding to client request with user profile, success message and access token
        return {
            status: 200,
            user: {
                id: user[0]._id,
                email: user[0].email,
                name: user[0].name,
                preferences: user[0].preferences
            },
            message: "Login successful!",
            token: token,
        };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { UserRegService, UserLoginService };