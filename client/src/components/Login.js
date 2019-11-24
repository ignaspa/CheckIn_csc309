import React, { Component } from "react";
import { Username } from "../components/SignUp.js";
import { Password } from "../components/SignUp.js";
import { Button } from "../components/SignUp.js";
import { Redirect } from "react-router";
import { Link } from "react-router-dom"
import { login } from '../redux/actions.js'

import { connect } from 'react-redux';
import {authenticateUser, getUserFromId } from './MockData.js'

function SignUpLink(props) {
  return (
    <div className="mb-3">
      Don't have an account? <Link to="/signup">Sign up!</Link>
    </div>
  );
}


class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvalid: false,
      authenticated: false,
    }
    this.user = null;
      this.authenticated = false;
      this.showInvalid = false;
  };
    submitHandler = event => {
      event.preventDefault();
      const userId = authenticateUser(this.state['username'], this.state['password']);
        if (this.state && userId != null) {
          event.target.className += " was-validated";
          this.userId = userId;
          this.props.loginUser(userId);
          this.user = getUserFromId(this.userId);
            console.log("Setting state");
            this.setState({
                showInvalid: false
            });
      }
      else {
          event.target.reset();
          this.setState({
              showInvalid: true
         });
      }
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
      console.log("Rendering...")
    const disclaimerEmail = "We'll never share your email with anyone else";
      console.log("this.user: " + this.user)
      if (this.user != null) {
          if (this.user.isAdmin) {
              return <Redirect to="/admin-dashboard"/>
          }
          return <Redirect to='/user-dashboard'/>
      }

    return (
      <div className="container">
        <LoginHeader/>
        <article className="auth-form card-body mx-auto">
          <h4 className="card-title mt-3 text-center"> Log In </h4>{" "}
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <InvalidCredentials
             show={this.state.showInvalid}
            />
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
            <SignUpLink/>
            <Button label={"Submit"} />{" "}
          </form>{" "}
        </article>{" "}
      </div>
    );
  }
}

function LoginHeader(props) {
  return (
    <div>
      <h1 className="text-center mt-3 text-primary">Check-In</h1>
    </div>
  );
}

function InvalidCredentials(props) {
  if (!props.show) {
    return ""
  }
  return (
    <div className="alert alert-danger">
      Invalid username or password
    </div>
  )
}

const mapStateToProps = store => ({
    userId: store.userId
});

const mapDispatchToProps = dispatch => ({
    loginUser: (id) => dispatch(login(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
