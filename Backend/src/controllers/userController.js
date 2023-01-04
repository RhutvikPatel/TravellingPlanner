const userModel = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try{
        let data = req.body
        let {name, email, password} = data

        const bcryptPassword = await bcrypt.hash(password, 10);
        data.password = bcryptPassword;

        let createdData = await userModel.create(data)
        res.status(201).send({status: true, message: "User Created...", data: createdData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const login = async (req, res) => {
    try{
        let data = req.body
        const { email, password } = data
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: false, message: "Email doesn't exist" });
        }

        let hashedPassword = user.password;

        const checkPassword = await bcrypt.compare(password, hashedPassword);

        if (!checkPassword)
            return res.status(401).send({ status: false, message: "Invalid login credentials , Invalid password..." });

        const token = jwt.sign(
        {
            userId: user._id.toString(),
            iat: Math.floor(Date.now() / 1000),
        },
        process.env.JWT_SEC,
        { expiresIn: Math.floor(Date.now() / 1000) + 168 * 60 * 60 });

        res.status(200).send({ status: true, messsge: "User Logged in Successfully", data: { userId: user._id, token: token } });
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {registerUser, login}