import React from "react";
import "../css/App.css";

const RArrow = (props) => {

    return (
        <div className="rarrow" onClick={props.after}>
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        </div>
    );

}

export default RArrow;