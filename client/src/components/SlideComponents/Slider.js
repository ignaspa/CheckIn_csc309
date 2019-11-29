import React, { Component } from "react";
import "../../css/App.css";
import Dashboard from "../../components/assets/Dashboard.png"
import NewFriend from "../../components/assets/AddFriends.png"
import ProfilePic from "../../components/assets/ProfilePic.png"
import Profile from "../../components/assets/ProfileScreenshot.png"
import Eating from "../../components/assets/eating.JPG"
import Studying from "../../components/assets/studying.JPG"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = [Dashboard, ProfilePic, NewFriend, Profile, Eating, Studying];
const quotes = [
  "See where your friends are!",
  "Share custom locations unlike a map app.",
  "Add everyone you want to share your time with!",
  "Know who is working on the same thing, not just where they are.",
  "Update your friends on where you are!",
  "Meet up to go somewhere!"
];
export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0
    };
    this.forward = this.forward.bind(this);
    this.back = this.back.bind(this);
  }

  forward = () => {
    if (this.state.currentSlide !== 5) {
      this.setState({ currentSlide: this.state.currentSlide + 1 });
    } else {
      this.setState({ currentSlide: 0 });
    }
  };
  back = () => {
    if (this.state.currentSlide !== 0) {
      this.setState({ currentSlide: this.state.currentSlide - 1 });
    } else {
      this.setState({ currentSlide: 5 });
    }
  };

  render() {
    console.log("Rendering Slider");
    return (
      <div className="App-Slider">
        <h5 className="homequote text-primary">
          {quotes[this.state.currentSlide]}{" "}
        </h5>
        <div>
          <table className="slidertable" align="center">
            <tr className="sliderTableRow">
              <td>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="arrow"
                  size="2x"
                  onClick={this.back}
                />
              </td>
              <td>
                <img
                  src={images[this.state.currentSlide]}
                  className="img-fluid rounded mx-auto d-block center homeimg"
                  alt="Responsive image"
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="arrow"
                  size="2x"
                  onClick={this.forward}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
