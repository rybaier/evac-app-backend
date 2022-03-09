const mongoose = require('mongoose')
const { Model } = require('../db/connection')

const MeetingPlaceSchema = new mongoose.Schema ({
    address: String,
    name: String,
    compass_direction: String,
    owner: {
        type: String,
        ref: 'User',
        required: true
      }
    },
    {
      timestamps: true,
    }
    
)

const MeetingPlace = mongoose.model('MeetingPlace', MeetingPlaceSchema )

module.exports = MeetingPlace