const mongoose = require('mongoose')

const EvacGrabItemSchema = new mongoose.Schema(
    {
    priority: String,
    name: String,
    location: String,
    instructions: String,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    
)

const EvacGrabItem = mongoose.model('EvacGrabItem', EvacGrabItemSchema)

module.exports = EvacGrabItem