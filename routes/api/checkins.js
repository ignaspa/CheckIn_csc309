const express = require('express')
const router = express.Router()

// load user model
const Checkin = require("../../models/Checkin")

// middleware functions
async function getCheckin(req, res, next) {
    try {
      checkin = await Checkin.findById(req.params.id)
      if (checkin == null) {
        return res.status(404).json({ message: 'Cant find checkin'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.checkin = checkin
    next()
  }

// Get all checkins
router.get('/', async (req, res) => {
    try {
        const checkins = await Checkin.find()
        res.json(checkins)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get one Checkin
router.get('/:id', getCheckin, (req, res) => {
    res.json(res.checkin)
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
        res.status(201).json(newCheckin)
    } catch (error) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one checkin
router.delete('/:id', getCheckin, async (req, res) => {
    try {
      await res.checkin.remove()
      res.json({ message: 'Deleted checkin' })
    } catch(err) {
      res.status(500).json({ message: err.message })
    }
  })

  module.exports = router

