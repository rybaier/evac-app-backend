require('../models/EvacGrabItem')
const express = require('express')
const mongoose = require('mongoose')
const userAuth = require('../middleware/userAuth')
const EvacGrabItem = mongoose.model('EvacGrabItem')

const router = express.Router()
router.use(userAuth)

router.get('/items', async (req, res, next) => {
    try {
        const items = await EvacGrabItem.find({ userID: req.user._id })
        res.json(items)
    } catch (err) {
        console.log(err)
    }
})

router.post('/items', async ( req, res, next) => {
    const {  priority, name, location, instructions } = req.body
    if(!name || !priority || !location || !instructions){
        return res.status(404).send({ error: 'please provide required fields'})
    }
    try {
        const newItem = new EvacGrabItem({ priority, name, location, instructions, userID: req.user._id})
        await newItem.save()
        res.send(newItem)
    } catch (err) {
        res.status(402).send(err.message)
    }
})

router.get('/items/:id', async (req,res, next) => {
    try {
        const itemDetails = await EvacGrabItem.findById(req.params.id)
        res.json(itemDetails)
    } catch (err) {
        next(err)
    }
})

router.put('/items/:id', async (req,res, next) => {
    try {
        const changeEvacGrabItem = await EvacGrabItem.findByIdAndUpdate(
            req.params.id, req.body, {new:true})
            res.status(200).send(changeEvacGrabItem)
    } catch (err) {
        next(err)
    }
})

router.delete('/items/:id', async (req,res, next) => {
    try {
        const deleteItem = await EvacGrabItem.findByIdAndDelete(req.params.id)
        if(deleteItem){
            res.sendStatus(204)
        } else{
            res.sendStatus(404)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router