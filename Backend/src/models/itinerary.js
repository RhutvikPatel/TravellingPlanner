const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const ItinerarySchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "user"
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    activities: [{
        name: String,
        location: String,
        duration: Number
    }],
    accommodation: [{
        from: {
            type: Date
        },
        to: {
            type: Date
        },
        hotelName: String,
        location: String
    }],
    totalCost: {
        type: Number,
    },
    public: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("itinerary", ItinerarySchema)