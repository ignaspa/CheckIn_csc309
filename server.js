const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const passport = require("passport");

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to mongo db
const db = config.get("mongoURI");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// route for checkins 
const checkinRouter = require('./routes/checkins')
app.use('/checkins', checkinRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Backend Server Running On Port ${PORT}`));
