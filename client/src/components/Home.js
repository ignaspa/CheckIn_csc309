import React, { Component } from "react";
import uoftbackground from "../uofthighres2.jpeg";

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
        <SlideTiles />
        <Mission />
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
function SlideTiles(props) {
  return (
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src={uoftbackground} alt="First slide"/>
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src={uoftbackground} alt="Second slide"/>
        </div>
        <div class="carousel-item">
            <img class="d-block w-100" src={uoftbackground} alt="Third slide"/>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  );
}
function Mission(props) {
  return (
    <div>
            <h3 className="text-left" style={style} >OUR MISSION</h3>
            <p classNames="text-left" style={style} >{mission_description}</p>
          </div>

          );
}