import React from "react";
import "../../css/App.css";

const Slide = (props) => {
        console.log("Rendering Slide");
        return (
        <div className="App-Slide">
            <img src={props.image} alt="image of uoft"/>
        </div>
        );
    
}

export default Slide