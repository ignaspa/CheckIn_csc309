import React, { Component } from "react";

const mission_description = "We know what if feels like to be a \
commuter student on campus who is working around strangers. We know\
 what it feels like to be hungry but lacking a motivation to spend \
 the time eating alone. We know what it's like to be bored studying \
 alone. Our platform is a tool friends can use to more easily find \
 common places of interest, live. Suddenly, you always know where \
 to head for good vibes!";

const style = "font-family: 'Montserrat', sans-serif; color:#4287f5; text-align: left";

export default class Home extends Component {

  render() {
    return (
      <div>
      <nav_bar/>
      <big_title/>
      <mission/>
      </div>
    );
  }
}

function nav_bar() {
  return (
    <nav class="navbar navbar-expand-lg fixed-top ">
      <a class="navbar-brand" href="#">Home</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav mr-4">
          <li class="nav-item">
            <a class="nav-link" data-value="Log-in" href="#">Log-in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " data-value="Register" href="#">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " data-value="about" href="#">About us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " data-value="team" href="#">Team</a>
          </li>
          <li class="nav-item">
            <a class="nav-link " data-value="contact" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function big_title() {
  return (
    <div class="jumbotron vertical-center" style="background-color:#4287f5;">
      <h1 class="display-3" style="font-family: 'Montserrat', sans-serif; color: azure">CheckIn</h1>
      <p class="lead" style="font-family: 'Montserrat', sans-serif; text-align: center; color: azure">
        <b>COME TOGETHER</b>
      </p>
    </div>
  );
}
function mission() {
  return (
    <div>
      <h3 style={style} >OUR MISSION</h3>
      <p style={style} >{mission_description}</p>
    </div>

  );
}