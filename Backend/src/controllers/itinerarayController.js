const userModel = require("../models/user")
const itineraryModel = require("../models/itinerary")
const { isValid, isValidRequestBody, isValidObjectId, isValidName } = require("../validators/validator");
const { isValidNumber } = require("../validators/validator");
const redis = require("redis");
const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    14000,
    "redis-14000.c212.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth("Lru5FXx8zmsl3Yndea7aR7Fkaj5bSAkw", function (err) {
    if (err) throw err;
})

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const createItinerary = async (req, res) => {
    try{
        let {userId, from, to, date, activities, accommodation, totalCost} = req.body

        if(!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please enter details of itinerary" });
        }
        if(!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid UserId" });
        }
        if(isValid(from)) {
            return res.status(400).send({ status: false, message: "Please enter From" });
        }
        if(isValid(to)) {
            return res.status(400).send({ status: false, message: "Please enter To" });
        }
        if(isValid(date)) {
            return res.status(400).send({ status: false, message: "Please enter Date" });
        }
        if(isValid(activities)) {
            return res.status(400).send({ status: false, message: "Please enter Activities" });
        }
        if(!Array.isArray(activities)) {
            return res.status(400).send({ status: false, message: "Please enter Activities in Array" });
        }
        if(isValid(accommodation)) {
            return res.status(400).send({ status: false, message: "Please enter Accommodation" });
        }
        if(!Array.isArray(accommodation)) {
            return res.status(400).send({ status: false, message: "Please enter Activities in Array" });
        }
        if(isValid(totalCost)) {
            return res.status(400).send({ status: false, message: "Please enter Total Cost" });
        }
        if(isValidNumber(totalCost)) {
            return res.status(400).send({ status: false, message: "Please enter Valid Total Cost" });
        }

        let result = await itineraryModel.create(req.body)
        res.status(201).send({status: true, message:"Success..", data: result})
    }catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateItinerary = async (req, res) => {
    try{
        let itineraryId = req.params.id
        if(!isValidObjectId(itineraryId)) {
            return res.status(400).send({ status: false, message: "Please enter valid itineraryId" });
        }
        let data = req.body
        if(!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please enter details of itinerary for update" });
        }
        if(!isValidObjectId(data.userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid UserId" });
        }
        
        let updatedData = await itineraryModel.findByIdAndUpdate({_id: itineraryId},{...data}, {new: true})
        if(!updatedData) {
            return res.status(404).send({ status: false, message: "No Data Found" });
        }
        res.status(200).send({status: true, message:"Success..", data: updatedData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const getSummary = async (req, res) => {
    try{
        let userId = req.params.id
        if(!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Please enter valid itineraryId" });
        }
        let userIdCache = await GET_ASYNC(`${userId}`)
        if(userIdCache){
            let data = JSON.parse(userIdCache)
            return res.status(200).send({status: true, message:"Success..", data: data});
        } else {
            let data = await itineraryModel.find({userId})
            if(data) {
                await SET_ASYNC(`${userId}`, JSON.stringify(data));
                res.status(200).send({status: true, message:"Success..", data: data})
            } else {
                return res.status(404).send({ status: false, message: "No Data Found" });
            }
            
        }
        
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const getItinerary = async (req, res) => {
    try{
        let id = req.params.id
        if(!isValidObjectId(id)) {
            return res.status(400).send({ status: false, message: "Please enter valid itineraryId" });
        }
        let itineraryIdCache = await GET_ASYNC(`${id}`)
        if(itineraryIdCache){    
            let data = JSON.parse(itineraryIdCache)
            return res.status(200).send({status: true, message:"Success..", data: data});
        } else{
            let result = await itineraryModel.findById({_id: id})
            if(result) {
                await SET_ASYNC(`${id}`, JSON.stringify(result));
                res.status(200).send({status: true, message:"Success..", data: result})
            } else {
                return res.status(404).send({ status: false, message: "No Data Found" });
            }
        }
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const addActivitiyAccommodation = async (req, res) => {
    try{
        let itineraryId = req.params.id
        if(!isValidObjectId(itineraryId)) {
            return res.status(400).send({ status: false, message: "Please enter valid itineraryId" });
        }
        let data = req.body
        if(!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please enter details of Activities and Accommodations" });
        }
        let updatedData = await itineraryModel.findByIdAndUpdate({_id: itineraryId}, {$push: data}, {new: true})
        if(!updatedData) {
            return res.status(404).send({ status: false, message: "No Data Found to add Activities and Accommodation" });
        }
        res.status(200).send({status: true, message:"Success..", data: updatedData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const removeActivitiyAccommodation = async (req, res) => {
    try{
        let itineraryId = req.params.id
        if(!isValidObjectId(itineraryId)) {
            return res.status(400).send({ status: false, message: "Please enter valid itineraryId" });
        }
        let data = req.body
        if(!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please enter details of Activities and Accommodations" });
        }
        let updatedData = await itineraryModel.findByIdAndUpdate({_id: itineraryId}, {$pull: data}, {new: true})
        if(!updatedData) {
            return res.status(404).send({ status: false, message: "No Data Found to add Activities and Accommodation" });
        }
        res.status(200).send({status: true, message:"Success..", data: updatedData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {createItinerary, updateItinerary, getItinerary, addActivitiyAccommodation, getSummary, removeActivitiyAccommodation}