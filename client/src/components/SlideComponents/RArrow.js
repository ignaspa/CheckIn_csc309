import React from "react";
import "../../css/App.css";

const RArrow = (props) => {
    console.log("Rendering rightarrow");
    return (
        <div className="rarrow" onClick={props.after}>
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </div>
    );

}

export default RArrow;