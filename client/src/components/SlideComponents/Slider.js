import React, { Component } from "react";
import "../../css/App.css";
import Food from "../../eating.JPG";
import Study from "../../studying.JPG";
import Walk from "../../walking.JPG";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const images = [Food, Study, Walk];
const quotes = [
    "Share custom locations unlike a map app. (The table in the back with graffiti)",
    "Know who is working on the same thing, not just where they are. ( Studying CSC309 )",
    "Meet up to go somewhere!"
]
export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
        };
        this.forward = this.forward.bind(this);
        this.back = this.back.bind(this);
    }

    forward = () => {
        if (this.state.currentSlide != 2) {
            this.setState({ currentSlide: this.state.currentSlide + 1 });
        }
        else {
            this.setState({ currentSlide: 0 });
        }
    }
    back = () => {
        if (this.state.currentSlide != 0) {
            this.setState({ currentSlide: this.state.currentSlide - 1 });
        }
        else {
            this.setState({ currentSlide: 2 });
        }
    }

    render() {
        console.log("Rendering Slider");
        return (
            <div className="App-Slider">
                <h5 className="homequote text-primary" >{quotes[this.state.currentSlide]} </h5>
                <div>
                    <table className="slidertable" align="center">
                        <tr className="sliderTableRow">
                            <td>
                                <FontAwesomeIcon icon={faAngleLeft} className="arrow" size="2x" onClick={this.back} />
                            </td>
                            <td>
                                <img src={images[this.state.currentSlide]} className="img-fluid rounded mx-auto d-block center homeimg" alt="Responsive image" />
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faAngleRight} className="arrow" size="2x" onClick={this.forward} />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}


