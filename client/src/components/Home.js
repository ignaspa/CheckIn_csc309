import React, { Component } from "react";
import uoftbackground from "../uofthighres.jpeg";
import uoftbackground2 from "../uofthighres2.jpeg";
import Slider from "./SlideComponents/Slider"
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
        <BigTitle />
        <Slider />
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
    <div>
      <h1 className="jumbotron">CheckIn</h1>
      <p class="lead" style={styleLead}>
        <b>COME TOGETHER</b>
      </p>
    </div>
  );
}

