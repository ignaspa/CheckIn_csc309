import React, { Component } from "react";
import { Username } from "../components/SignUp.js";
import { Password } from "../components/SignUp.js";
import { Button } from "../components/SignUp.js";

// This will be replaced by server-side code
const user = {
  id: 0,
  isAdmin: false,
  name: 'John',
  current_location: 'BA 3200',
  friends: [3, 5, 1, 3],
  friend_request: [4, 6, 7],
  picture: '/image/john.png',
  username: 'john',
  password: '1234'
}

const users = [user]

export default class LoginComponent extends Component {
  submitHandler = event => {
    event.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (this.state && users[i].username == this.state['username'] && users[i].password == this.state['password']) {
        event.target.className += " was-validated";
        // TODO: Route to Dashboard
        return;
      }
    }
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
              changeHandler={this.changeHandler}
            />
            <Password
              label={"Password"}
              disclaimer={""}
              feedback="Please enter a valid Password"
              changeHandler={this.changeHandler}
            />
            <Button label={"Submit"} />{" "}
          </form>{" "}
        </article>{" "}
      </div>
    );
  }
}
