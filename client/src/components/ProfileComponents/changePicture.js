import React, { Component } from "react";
import "../css/App.css";
import { Link } from "react-router-dom";

export default class selectProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currently_selected: user
        }
        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.selectPic = this.selectPic.bind(this);
    }

    render() {
        // choose users current profile image and set to the states 
        return (
            <div>
                <div className="pagetitle">
                    <h3>Select Profile Picture</h3>
                </div>
                <button type="button" class="btn btn-primary attractionbutton" onClick={this.changeProfilePic} newpic={false}>
                        Cancel
                </button>
                <button type="button" class="btn btn-primary attractionbutton" onClick={this.changeProfilePic} newpic={true}>
                        Save
                </button>
                <h2>
                    Current Profile Selected:
                </h2>
                <img src={this.state.currently_selected} class="img-thumbnail  img-fluid profilePic"/>
                <div className="pagetitle">
                    <h5>Profile Pictures:</h5>
                </div>
                <picsTable selectProfile={this.selectPic} />
            </div>
        );
    }

    changeProfilePic = (event) => {
        if (this.props.newpic === false) {
            return (
                <Redirect
                    to={{
                        pathname: '/profile',
                    }} 
                    push={true}/>
            )
        }
        else{
            // push new pic to update data of user
            return (
                <Redirect
                    to={{
                        pathname: '/profile',
                    }} 
                    push={true}/>
            )
        }
        
    }

    selectPic = (pic) => {
        this.setState({currently_selected: pic});
            
    }

}

function picsTable(props) {

    let list_of_pics = ["./pics/pikachu_sad.png", "./pics/pikachu_surprised.png", "./pics/pikachu_annoyed.png", "./pics/robarts.png", "./pics/tru_blu.png", "./pics/airpods.png"];

    const tb_profile_pics = list_of_pics.map(pic => (
        <tr>
            <td>
            <button
                    onClick={() => props.selectProfile({pic})}
                    className="btn btn-success">
                    Select
              </button>
            </td>
            <td>
                <img src={pic} class="img-thumbnail profilePic"/>
            </td>
        </tr>
            ));
            return (
        <div>
                <table className="table container-fluid">
                    <thead>
                    </thead>
                    <tbody>
                        {tb_profile_pics}
                    </tbody>
                </table>
            </div>
            );
}