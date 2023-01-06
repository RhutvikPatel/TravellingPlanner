const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const itineraryController = require("../controllers/itinerarayController")
const {verifyTokenAndAuthorization} = require("../middleware/auth")

// User APIs
router.post("/register", userController.registerUser)

router.post("/login", userController.login)

// Itinarary APIs
router.post("/addItinarary", verifyTokenAndAuthorization, itineraryController.createItinerary)

router.put("/UpdateItinarary/:id", verifyTokenAndAuthorization, itineraryController.updateItinerary)

router.get("/getItinarary/:id", itineraryController.getItinerary)

router.get("/summary/:id", itineraryController.getSummary)

router.put("/addActAndAcco/:id", itineraryController.addActivitiyAccommodation)

router.put("/removeActAndAcco/:id", itineraryController.removeActivitiyAccommodation)

module.exports = router