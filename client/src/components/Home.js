import React, { Component } from "react";
import "../css/App.css";
import Slider from "./SlideComponents/Slider";
import { Link } from "react-router-dom";
import { redirect } from "../utils/utils";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const mission_description =
  "We know what if feels like to be a commuter student on campus who is working around strangers. We know what it feels like to be hungry but lacking a motivation to spend the time eating alone. We know what it's like to be bored studying  alone. Our platform is a tool friends can use to more easily find common places of interest, live. Suddenly, you always know where to head for good vibes!";

class Home extends Component {
  componentDidMount() {
    //if logged in go to dashboard
    redirect(this.props.user, this.props.history);
  }
  render() {
    return (
      <div>
        <BigTitle />
        <hr className="my-4" />
        <Slider />
        <br></br>
        <h3 className="homesubl text-primary"> About Us</h3>
        <p className="text-info hometxt">
          {" "}
          We are a Toronto, CANADA based group of developers looking to use
          technology to improve student life! We have a variety of experiences
          including lowlevel development, android dev, web development, etc that
          make us a capable group. Our team includes: Sonia Zaldana (developer),
          Abdullah Sumsum (developer), Marco Angeli (developer) and Ignas Panero
          Armoska (developer). Catch us around campus!
        </p>
        <h3 className="homesubr text-primary"> Contact</h3>
        <p className="text-info hometxtr"> Phone: 585-474-6090</p>
      </div>
    );
  }
}

function BigTitle(props) {
  return (
    <div className="jumbotron hometitle">
      <h1 className="display-4 text-light">Check In</h1>
      <p class="lead text-light">Come together.</p>
      <hr className="my-4 homeline" />
      <p className="text-light">{mission_description}</p>
      <span>
        <button type="button" class="btn btn-primary attractionbutton">
          <Link to={"/login"} className="nav-link text-white">
            Login
          </Link>
        </button>
      </span>
      <span>
        <button type="button" class="btn btn-primary attractionbutton">
          <Link to={"/signup"} className="nav-link text-white">
            Sign Up
          </Link>
        </button>
      </span>
    </div>
  );
}

const mapStateToProps = store => ({
  user: store.user,
  errors: store.errors
});

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
