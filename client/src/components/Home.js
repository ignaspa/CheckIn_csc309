import React, { Component } from "react";


const style = {
  font: "Montserrat, sans-serif", 
  color: "#4287f5", 
}

const mission_description = "We know what if feels like to be a commuter student on campus who is working around strangers. We know what it feels like to be hungry but lacking a motivation to spend the time eating alone. We know what it's like to be bored studying  alone. Our platform is a tool friends can use to more easily find common places of interest, live. Suddenly, you always know where to head for good vibes!";

export default class Home extends Component {

  render() {
    return (
      <div>
      {/* <nav_bar/> */}
      <BigTitle/>
      <Mission/>
      </div>
    );
  }
}

function BigTitle(props) {
  const styleJumbotron = {
    backgroundColor: "#4287f5"
  };

  const styleDisplay = {
    fontFamily: "Montserrat, sans-serif",
    color: "Azure"
  };

  const styleLead = {
    fontFamily: "Montserrat, sans-serif",
    textAlign: "center", 
    color: "azure" 
  };

  return (
    <div class="jumbotron vertical-center" style={styleJumbotron}>
      <h1 class="display-3" style={styleDisplay}>CheckIn</h1>
      <p class="lead" style={styleLead}>
        <b>COME TOGETHER</b>
      </p>
    </div>
  );
}
function Mission(props) {
  return (
    <div>
      <h3 className = "text-left" style={style} >OUR MISSION</h3>
      <p classNames = "text-left" style={style} >{mission_description}</p>
    </div>

  );
}