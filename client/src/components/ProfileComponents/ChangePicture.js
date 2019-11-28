import React, { Component } from "react";
import "../../css/App.css";
import { Redirect } from "react-router";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { updateProfilePic, getUserData } from "../../redux/actions";

const pic_paths = ["https://i.imgur.com/YBU8Zuq.png", "https://i.imgur.com/bnAlZ3X.png", "https://i.imgur.com/zWTxtlQ.png", "https://i.imgur.com/VM9iOl5.png", "https://i.imgur.com/DvuC4vb.png", "https://i.imgur.com/B7KGaN6.png", "https://i.imgur.com/BEpJcyk.png", "https://i.imgur.com/BBW93ax.png", "https://i.imgur.com/27cDPQb.png", "https://i.imgur.com/dEtzlVD.png", "https://i.imgur.com/eDljJSu.png", "https://i.imgur.com/kaPPeNr.png"]

class ChangePicture extends Component {
    constructor(props) {
        super(props);
        this.props.getThisUser();
        this.state = {
            user: {},
            currently_selected: "https://i.imgur.com/YBU8Zuq.png",
            redirect: "",
        }
        this.saveProfilePic = this.saveProfilePic.bind(this);
        this.cancelProfilePic = this.cancelProfilePic.bind(this);
        this.selectPic = this.selectPic.bind(this);
    }
    componentDidMount() {
        this.props.getThisUser();
        console.log(this.props.user);
    }
    componentWillReceiveProps(nextProps) {
        let cu = nextProps.user.userData;
        console.log("cu", cu);
        let initial_img = "";
        if(cu.profilepic){
            console.log("this is it", cu.profilepic);
            initial_img = cu.profilepic;
        }
        this.setState({ user: cu, currently_selected: initial_img});
    }

    render() {
        if (this.state.redirect === '/profile') {
            return <Redirect
                to={{
                    pathname: '/profile/' + this.state.user.username,
                    state: {profile_user_id: this.state.user._id}
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
                    <img src={this.state.currently_selected} className="profile-pic rounded-circle border-primary border m-2 text-center" />
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
        this.props.updatePic(this.state.currently_selected);
        return (
            this.setState({ redirect: '/profile' })
        );
    }
    cancelProfilePic = (event) => {
        console.log("canceled")
        return (
            this.setState({ redirect: '/profile' })
        );
    }

    selectPic = (pic) => {
        this.setState({ currently_selected: pic });
    }

}

function PicsTable(props) {

    const tb_profile_pics = pic_paths.map(pic => (
        <tr key={pic}>
            <td align="center">
                <button
                    onClick={() => props.selectProfile(pic)}
                    className="btn btn-success">
                    Select
              </button>
            </td>
            <td>
                <img src={pic} className="profile-pic rounded-circle border border-primary m-3 text-center" />
            </td>
        </tr>
    ));
    return (
        <div>
            <table className="table container-fluid text-center">
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
    user: store.userData,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({updatePic: updateProfilePic, getThisUser: getUserData}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePicture);
