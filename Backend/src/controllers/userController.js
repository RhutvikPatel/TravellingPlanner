const userModel = require("../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { isValid, isValidRequestBody, isValidName, isValidEmail, isValidPassword } = require("../validators/validator");

const registerUser = async (req, res) => {
    try{
        let data = req.body
        let {name, email, password} = data

        // INPUT VALIDATION
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please provide data for creating user..." });
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Please provide Name..." });
        }  
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "Please Enter a valid Name..." });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide email..." });
        }

        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid Email..." });
        }
      
        const isRegisteredEmail = await userModel.findOne({ email });
        if (isRegisteredEmail) {
            return res.status(400).send({ status: false, message: "email already registered..." });
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide Password..." });
        }
          
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, messsage: "password is invalid (Should Contain Alphabets, numbers, quotation marks  & [@ , . ; : ? & ! _ - $], and the length should be between 8 to 15"});
        }

        // HASHING PASSWORD
        const bcryptPassword = await bcrypt.hash(password, 10);
        data.password = bcryptPassword;

        // CREATING USER DOCUMENTS
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

        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please enter login credentials..." });
        }
      
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Enter an email..." }); 
        }
      
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Email should be a valid email address..." });
        }
      
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "enter a password..." });
        }
      
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15..." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: false, message: "Email doesn't exist" });
        }

        let hashedPassword = user.password;

        const checkPassword = await bcrypt.compare(password, hashedPassword);

        if (!checkPassword)
            return res.status(401).send({ status: false, message: "Invalid login credentials , Invalid password..." });

        const token = jwt.sign({
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