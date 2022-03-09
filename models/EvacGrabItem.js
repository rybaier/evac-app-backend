const mongoose = require('mongoose')

const EvacGrabItemSchema = new mongoose.Schema(
    {
    priotity: Number,
    name: String,
    location: String,
    instructions: String,
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

const EvacGrabItem = mongoose.model('EvacGrabItem', EvacGrabItemSchema)