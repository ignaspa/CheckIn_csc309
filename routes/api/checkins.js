const express = require('express')
const router = express.Router()

// load checkin model
const Checkin = require("../../models/Checkin")
// load user model 
const User = require("../../models/User")

// Get all checkins
router.get('/', async (req, res) => {
    try {
        const checkins = await Checkin.find()
        res.json(checkins)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
  
// Get Checkins for given user id
router.get('/:id', async (req, res) => {
  try {
    const checkins = await Checkin.find({userid: req.params.id})
    res.json(checkins)
  } catch (error) {
    return res.status(500).json( {message: err.message} )
  }
}) 


// Create one checkin
router.post('/', async (req, res) => {

    const checkin = new Checkin({
        action: req.body.action, 
        location: req.body.location, 
        time: req.body.time, 
        message: req.body.message, 
        userid: req.body.userid
    })
    
    try {
        const newCheckin = await checkin.save()
        User.findOneAndUpdate({_id: req.body.userid},
            { $push: { "pastCheckins": newCheckin.id }})
        .catch((err) => {
            res.status(400).json({message: err.message})
          })

        res.status(201).json(newCheckin)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete one checkin
router.delete('/:id', async (req, res) => {
  
  let removed = await Checkin.findOneAndDelete({_id: req.params.id})
  .catch((err) => {
    res.status(400).json({message: err.message})
  })
  
  await User.findOneAndUpdate({_id: removed.userid},
    { $pull: { "pastCheckins": removed.id }})
  .catch((err) => {
    res.status(400).json({message: err.message})
  })

  res.json({ message: 'Deleted checkin', 
      checkin: removed })  

  })

  module.exports = router

