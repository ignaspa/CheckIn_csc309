import React, { Component } from "react";
import { Username } from "../components/SignUp.js";
import { Password } from "../components/SignUp.js";
import { Button } from "../components/SignUp.js";

export default class LoginComponent extends Component {
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const disclaimerEmail = "We'll never share your email with anyone else";
    const style = {
      width: "400px"
    };

    return (
      <div className="container">
        <article className="card-body mx-auto" style={style}>
          <h4 className="card-title mt-3 text-center"> Log In </h4>{" "}
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <Username
              label={"Username"}
              disclaimer={disclaimerEmail}
              feedback="Please enter a valid username"
            />
            <Password
              label={"Password"}
              disclaimer={""}
              feedback="Please enter a valid Password"
            />
            <Button label={"Submit"} />{" "}
          </form>{" "}
        </article>{" "}
      </div>
    );
  }
}
