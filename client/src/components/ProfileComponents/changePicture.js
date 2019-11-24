import React, { Component } from "react";
import "../../css/App.css";
import { Redirect } from "react-router";
import { connect } from 'react-redux'
import {getUserFromId, changePicture} from "../MockData";

const pic_paths = ["https://i.imgur.com/YBU8Zuq.png", "https://i.imgur.com/zWTxtlQ.png", "https://i.imgur.com/VM9iOl5.png", "https://i.imgur.com/B7KGaN6.png", "https://i.imgur.com/bnAlZ3X.png", "https://i.imgur.com/BEpJcyk.png", "https://i.imgur.com/DvuC4vb.png"]

class ChangePicture extends Component {
    constructor(props) {
        super(props);
        this.current_user = getUserFromId(props.userId);
        this.state = {
            user: props.userId,
            currently_selected: pic_paths[0],
            redirect: "",
        }
        this.saveProfilePic = this.saveProfilePic.bind(this);
        this.cancelProfilePic = this.cancelProfilePic.bind(this);
        this.selectPic = this.selectPic.bind(this);
    }

    render() {
        if (this.state.redirect === '/profile') {
            return <Redirect
                to={{
                    pathname: '/profile/' + this.current_user.username,
                }}
                push={true} /> 
        }
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
        changePicture(this.state.user, this.state.currently_selected);
        return (
            this.setState({redirect: '/profile'})
        );
    }
    cancelProfilePic = (event) => {
        console.log("canceled")
        return(
        this.setState({redirect: '/profile'})
        );
    }

    selectPic = (pic) => {
        this.setState({ currently_selected: pic });
    }

}

function PicsTable(props) {

    const tb_profile_pics = pic_paths.map(pic => (
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
const mapStateToProps = store => ({
    userId: store.userId
})

export default connect(mapStateToProps)(ChangePicture);