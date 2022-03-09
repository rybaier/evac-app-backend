require('../models/MeetingPlace')
const express = require('express')
const mongoose = require('mongoose')
const userAuth = require('../middleware/userAuth')
const MeetingPlace = mongoose.model('MeetingPlace')

const router = express.Router()
router.use(userAuth)

router.get('/meetingplaces', async (req, res, next) => {
    const meetingPlaces = await MeetingPlace.find({ userID: req.user._id })
    res.send(meetingPlaces)
})

router.post('/meetingplaces', async ( req, res, next) => {
    const { name, address, compass_direction } = req.body
    if(!name || !address || !compass_direction){
        return res.status(404).send({ error: 'please provide required fields'})
    }
    try {
        const meetingPlace = new MeetingPlace({ name, address, compass_direction, userID: req.user._id})
        await meetingPlace.save()
    } catch (err) {
        res.status(402).send(err.message)
    }
})

router.get('/meetingplaces/:id', async (req,res, next) => {
    try {
        const detailsForPlace = await MeetingPlace.findById(req.params.id)
        res.json(detailsForPlace)
    } catch (err) {
        next(err)
    }
})

router.put('/meetingplaces/:id', async (req,res, next) => {
    try {
        const changeMeetingPlace = await MeetingPlace.findByIdAndUpdate(
            req.params.id, req.body, {new:true})
            res.status(200).json(changeMeetingPlace)
    } catch (err) {
        next(err)
    }
})

router.delete('/meetingplaces/:id', async (req,res, next) => {
    try {
        const deleteMeetingPlace = await MeetingPlace.findById(req.params.id)
        if(deleteMeetingPlace){
            res.sendStatus(204)
        } else{
            res.sendStatus(404)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router

