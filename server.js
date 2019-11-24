const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const passport = require("passport");

//bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//load routes
const users = require("./routes/api/users");
const checkins = require("./routes/api/checkins");
const friends = require("./routes/api/friends");
const changePassword = require("./routes/api/changePassword");
const requests = require("./routes/api/requests")

//connect to mongo db
const db = config.get("mongoURI");
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./utils/passportMiddleware")(passport);

//User routes
app.use("/api/users", users);

// Checkin routes
app.use("/api/checkins", checkins);

//change password routes
app.use("/api/changePassword", changePassword);

// Friend routes
app.use("/api/friends", friends);

// Requests routes 
app.use("/api/requests", requests);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Backend Server Running On Port ${PORT}`));
