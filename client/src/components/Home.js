import React, { Component } from "react";
import uoftbackground from "../uofthighres.jpeg";
import uoftbackground2 from "../uofthighres2.jpeg";
import Slider from "./SlideComponents/Slider"

const mission_description = "We know what if feels like to be a commuter student on campus who is working around strangers. We know what it feels like to be hungry but lacking a motivation to spend the time eating alone. We know what it's like to be bored studying  alone. Our platform is a tool friends can use to more easily find common places of interest, live. Suddenly, you always know where to head for good vibes!";

export default class Home extends Component {

  render() {
    console.log("Rendering Home");
    return (
      <div>
        <BigTitle />
        <Slider firstSlide={uoftbackground} secondSlide={uoftbackground2}/>
      </div>
    );
  }
}

function BigTitle(props) {
  console.log("Making big title");
  return (
    <div className="jumbotron hometitle">
      <h1 className="display-4">Check In</h1>
      <p class="lead">Come together.</p>
      <hr className="my-4" />
      <p>{mission_description}</p>
    </div>
  );
}
