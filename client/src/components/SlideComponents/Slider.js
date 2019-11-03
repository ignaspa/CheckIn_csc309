import React, { Component } from "react";
import "../css/App.css";
import RArrow from "./RArrow";
import LArrow from "./LArrow";
import Slide from "./Slide";

export default class Slider extends Component {
    constructor(props) {
        this.state = {
            images: ["../uofthighres.jpeg", "../uofthighres2.jpeg"],
            currentSlide: 0,
            maxSlides: 2,
            spot: 0
        };
    }
    after = () => {
        this.setState({
            currentSlide: currentSlide + 1,
            spot: spot + -(this.slideSize)
        });
    }
    before = () => {
        this.setState({ currentSlide: currentSlide - 1 });
    }
    slideSize = () => {
        return document.querySelector(".App-Slide").clientWidth;
    }
    render() {
        return (
            <div className="App-Slider">
                <div className="slider-wrapper"
                    style={{
                        transform: `translateX(${this.state.spot}px)`,
                        transition: 'transform ease-out 0.45s'
                    }}>
                    {
                        this.state.images.map((image, i) => (
                            <Slide key={i} image={image} />
                        ))
                    }
                </div>

                <LArrow before={this.before.bind(this)} />
                <RArrow after={this.after.bind(this)} />
            </div>
        );
    }
}