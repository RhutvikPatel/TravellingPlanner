const mongoose = require('mongoose')

//email validation
const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9]{1,}@g(oogle)?mail\.com$/
    return emailRegex.test(email)
}

//validation for Value
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value !== 'string' || value.trim().length === 0 || value=="") return false
    return true;
}

// Name Validation
const isValidName = function(name){
    const nameRegex =/^[A-Za-z]+$/i
    return nameRegex.test(name)
}

//validation for Request Body
const isValidRequestBody = function (request) {
    return (Object.keys(request).length > 0)
}

//validation for ObjectId
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//password validation
const isValidPassword = function (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return passwordRegex.test(password)
}

// Number Validation
const isValidNumber=function(number){
    if(!number || number.toString().trim().length==0) return false;
    if(isNaN(Number(number.toString().trim()))) return false 
    return true
}

module.exports={ isValid, isValidRequestBody, isValidObjectId, isValidEmail, isValidNumber, isValidPassword, isValidName, }