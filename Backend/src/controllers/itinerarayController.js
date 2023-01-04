const userModel = require("../models/user")
const itineraryModel = require("../models/itinerary")

const createItinerary = async (req, res) => {
    try{
        let {from, to, date, activities, accommodation, totalCost} = req.body
        let result = await itineraryModel.create(req.body)
        res.status(201).send({status: true, message:"Success..", data: result})
    }catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const updateItinerary = async (req, res) => {
    try{
        let itineraryId = req.params.id
        let data = req.body

        // let findData = await itineraryModel.findById(itineraryId)
        
        let updatedData = await itineraryModel.findByIdAndUpdate({_id: itineraryId},{...data}, {new: true})
        res.status(200).send({status: true, message:"Success..", data: updatedData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const getItinarary = async (req, res) => {
    try{
        let id = req.params.id
        let result = await itineraryModel.findById(id)
        res.status(200).send({status: true, message:"Success..", data: result})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const addActivitiyAccommodation = async (req, res) => {
    try{
        let itineraryId = req.params.id
        let data = req.body
        let updatedData = await itineraryModel.findByIdAndUpdate({itineraryId}, {...data}, {new: true})
        res.status(200).send({status: true, message:"Success..", data: updatedData})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const getSummary = async (req, res) => {
    try{
        let userId = req.params.id
        let data = await itineraryModel.find({userId})
        res.status(200).send({status: true, message:"Success..", data: data})
    } catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = {createItinerary, updateItinerary, getItinarary, addActivitiyAccommodation, getSummary}