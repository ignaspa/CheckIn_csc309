import React, { Component } from "react";
import "../../css/App.css";
import RArrow from "./RArrow";
import LArrow from "./LArrow";
import Slide from "./Slide";

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [props.firstSlide, props.secondSlide],
            currentSlide: 0,
            maxSlides: 2,
            spot: 0
        };
        this.before = this.before.bind(this);
        this.after = this.after.bind(this);
    }
    after = () => {
        this.setState((state, props) => {
            return {
                currentSlide: this.state.currentSlide + 1,
                spot: this.state.spot + -(this.slideSize)
            }
        });
    }
    before = () => {
        this.setState( (state, props) => { return { currentSlide: this.state.currentSlide - 1 } });
    }
    slideSize = () => {
        return document.querySelector(".App-Slide").clientWidth;
    }
    render() {
        console.log("Rendering Slider");
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

                <LArrow before={this.before} />
                <RArrow after={this.after} />
            </div>
        );
    }
}


