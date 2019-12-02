import React from "react";
import "../../css/App.css";

const LArrow = (props) => {
    return (
        <div className="larrow" onClick={props.before}>
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        </div>
    );

}

export default LArrow;