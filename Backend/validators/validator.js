const mongoose = require('mongoose')

//email validation
const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9]{1,}@g(oogle)?mail\.com$/
    return emailRegex.test(email)
}

// mobile validation
const isValidPhone = function (Phone) {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(Phone)
}

//validation for Value
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value !== 'string' || value.trim().length === 0 || value=="") return false
    return true;
}

//title validation
const isValidScripts= function(title){
    const scriptRegex = /^(?![0-9]*$)[A-Za-z0-9\s\-_,\.;:()]+$/
    return scriptRegex.test(title)
}

// Name Validation
const isValidName = function(name){
    const nameRegex =/^[A-Za-z]+$/i
    return nameRegex.test(name)
}

//validation of  empty string
const validString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
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

// Pincode validation
const isValidPincode = function (pincode) {
    if (!pincode || pincode.toString().trim().length == 0 || pincode.toString().trim().length != 6 ) return false;
    if(isNaN(Number(pincode.toString().trim())))return false
    return true;
    
}

// Number Validation
const isValidNumber=function(number){
    if(!number || number.toString().trim().length==0) return false;
    if(isNaN(Number(number.toString().trim()))) return false 
    return true
}

// Installment validation
const validInstallment = function isInteger(value) {
    if(value < 0) return false
     if(value % 1 == 0 ) return true
}

// Quantity validation
const validQuantity = function isInteger(value) {
    if(typeof value !== "number") return false
    if(value < 1) return false
    return true
}

// Status validation
const isValidStatus = function(status) {
    if( ['pending', 'completed', 'cancelled'].indexOf(status) == -1)
        return false
    return true
}

 

module.exports={ isValid, isValidRequestBody, isValidObjectId, isValidEmail, isValidStatus, isValidScripts, isValidNumber, isValidPhone, isValidPincode, isValidPassword, isValidName, validString, validInstallment, validQuantity }