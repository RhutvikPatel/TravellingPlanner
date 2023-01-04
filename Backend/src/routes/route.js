const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const itineraryController = require("../controllers/itinerarayController")

// User APIs
router.post("/register", userController.registerUser)

router.post("/login", userController.login)

// Itinarary APIs
router.post("/addItinarary", itineraryController.createItinerary)

router.put("/UpdateItinarary/:id", itineraryController.updateItinerary)

router.get("/getItinarary/:id", itineraryController.getItinarary)

router.get("/summary/:id", itineraryController.getSummary)

router.put("/addActAndAcco/:id", itineraryController.addActivitiyAccommodation)

module.exports = router