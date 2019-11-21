import React, { Component } from "react";
import { Username } from "../components/SignUp.js";
import { Password } from "../components/SignUp.js";
import { Button } from "../components/SignUp.js";
import { Redirect } from "react-router";
import { Link } from "react-router-dom"
import {login} from '../redux/actions.js'

import { useDispatch } from 'react-redux'

// This will be replaced by server-side code

const users = [
  {
    id: 0,
    isAdmin: false,
    name: 'John',
    current_location: 'BA 3200',
    friends: [3, 5, 1, 3],
    friend_request: [4, 6, 7],
    picture: '/image/john.png',
    username: 'user',
    password: 'user'
  },
  {
    id: 1,
    isAdmin: true,
    name: 'admin',
    current_location: '',
    friends: [],
    friend_request: [],
    picture: '/image/john.png',
    username: 'admin',
    password: 'admin'
  }
]

function SignUpLink(props) {
  return (
    <div className="mb-3">
      Don't have an account? <Link to="/signup">Sign up!</Link>
    </div>
  );
}

function Authenticated(props) {
    const dispatch = useDispatch();
    dispatch(login(props.user));
    if (props.user.isAdmin) {
        return <Redirect to="/admin-dashboard"/>
    }
    return <Redirect to='/user-dashboard'/>
}

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInvalid: false,
      authenticated: false,
    }
    this.user = {};
      this.authenticated = false;
      this.showInvalid = false;
  }
  submitHandler = event => {
    event.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (this.state && users[i].username === this.state['username'] && users[i].password === this.state['password']) {
        event.target.className += " was-validated";
          this.user = users[i];
          this.setState({
              showInvalid: false,
              authenticated: true
          });
        return;
      }
    }
    event.target.reset();
    this.setState({
      showInvalid: true
    })
    
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const disclaimerEmail = "We'll never share your email with anyone else";
    
      if (this.state.authenticated) {
          return <Authenticated user={this.user}/>
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
