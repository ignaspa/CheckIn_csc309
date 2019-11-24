const express = require('express')
const router = express.Router()

// load checkin model
const Checkin = require("../../models/Checkin")
// load user model 
const User = require("../../models/User")

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
        
        User.findById(req.body.userid)
          .then(item => {
            let pastCheckins = item.pastCheckins
            pastCheckins.push(newCheckin.id)
            item.pastCheckins = pastCheckins
            item.activeCheckin = newCheckin.id
            item.save()
          })
          .catch((err) => {
            res.status(400).json({ message: err.message})
          })

        res.status(201).json(newCheckin)
    } catch (error) {
        res.status(400).json({ message: error.message })
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

