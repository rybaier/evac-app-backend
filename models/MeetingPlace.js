const mongoose = require('mongoose')
const { Model } = require('../db/connection')

const MeetingPlaceSchema = new mongoose.Schema ({
    address: String,
    name: String,
    compass_direction: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    
)

const MeetingPlace = mongoose.model('MeetingPlace', MeetingPlaceSchema )

module.exports = MeetingPlace