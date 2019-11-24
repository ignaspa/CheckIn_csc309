import React, { Component } from "react";
import "../../css/App.css";
import { Redirect } from "react-router";
import ps from "./pics/pikachu_sad.PNG";
import psur from "./pics/pikachu_surprised.PNG";
import pa from "./pics/pikachu_annoyed.PNG";
import rob from "./pics/robarts.PNG";
import ap from "./pics/airpods.PNG";
import bt from "./pics/bubbletea.PNG";
import tb from "./pics/trublu.PNG";

const actual_pics = [ps, psur, pa, rob, ap, bt, tb];
const pic_paths = ["./pics/pikachu_sad.PNG", "./pics/pikachu_surprised.PNG", "./pics/pikachu_annoyed.PNG", "./pics/bubbletea.PNG", "./pics/robarts.PNG", "./pics/airpods.PNG", "./pics/trublu.PNG"]

export default class changePicture extends Component {
    constructor(props) {
        super(props);
        // currentpic = GET current user image...
        this.state = {
            user: props.userid,
            currently_selected: bt
        }
        this.saveProfilePic = this.saveProfilePic.bind(this);
        this.cancelProfilePic = this.cancelProfilePic.bind(this);
        this.selectPic = this.selectPic.bind(this);
    }

    render() {
        // choose users current profile image and set to the states 
        return (
            <div>
                <div className="pagetitle">
                    <h3>Select Profile Picture</h3>
                </div>
                <table>
                    <tr>
                        <td>
                            <button type="button" className="btn btn-primary attractionbutton" onClick={this.cancelProfilePic}>
                                Cancel
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-primary attractionbutton" onClick={this.saveProfilePic} >
                                Save
                            </button>
                        </td>
                    </tr>
                </table>
                <h4 className="text-center">
                    Current Profile Selected:
                </h4>
                <div className="text-center">
                    <img src={this.state.currently_selected} className="profile-pic rounded-circle border m-3 text-center" />
                </div>
                <div className="pagetitle">
                    <h5>Choose New:</h5>
                </div>
                <PicsTable selectProfile={this.selectPic} />
            </div>
        );
    }

    saveProfilePic = (event) => {
        console.log("saved")
        // push new pic to update data of user
        return (
            <Redirect
                to={{
                    pathname: '/profile',
                }}
                push={true} />
        );
    }
    cancelProfilePic = (event) => {
        console.log("canceled")
        return (
            <Redirect
                to={{
                    pathname: '/profile',
                }}
                push={true} />
        );
    }

    selectPic = (pic) => {
        console.log("selecting...");
        this.setState({ currently_selected: pic });
        console.log(this.state.currently_selected);
    }

}

function PicsTable(props) {

    const tb_profile_pics = actual_pics.map(pic => (
        <tr key={pic}>
            <td>
                <button
                    onClick={() => props.selectProfile(pic)}
                    className="btn btn-success">
                    Select
              </button>
            </td>
            <td>
                <img src={pic} className="profile-pic rounded-circle border m-3 text-center" />
            </td>
        </tr>
    ));
    console.log(tb_profile_pics)
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