import React from "react";
import "../css/App.css";

const Slide = ({image}) => {
    
        return (
        <div className="App-Slide">
            <img src={image} />
        </div>
        );
    
}

export default Slide