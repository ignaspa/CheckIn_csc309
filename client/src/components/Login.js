import React, { Component } from "react";
import { Username } from "../components/SignUp.js";
import { Password } from "../components/SignUp.js";
import { Button } from "../components/SignUp.js";
import { Link } from "react-router-dom";
import isEmpty from "../validation/isEmpty";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authenticateUser } from "../redux/actions";
import { redirect } from "../utils/utils";

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
      errors: {},
      authenticated: false
    };
    this.user = null;
    this.authenticated = false;
    this.showInvalid = false;
  }

  componentDidMount() {
    //if logged in go to dashboard
    redirect(this.props.user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    redirect(nextProps.user, this.props.history);

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  submitHandler = event => {
    event.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.authenticateUser(userData);
  };

  changeHandler = event => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const disclaimerEmail = "We'll never share your email with anyone else";
    return (
      <div className="container">
        <LoginHeader />
        <article className="auth-form card-body mx-auto">
          <h4 className="card-title mt-3 text-center"> Log In </h4>{" "}
          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <InvalidCredentials errors={this.state.errors} />
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
              name={"password"}
            />
            <SignUpLink />
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
  const errs = [];
  if (!isEmpty(props.errors)) {
    if (!isEmpty(props.errors.username)) {
      errs.push(
        <div className="alert alert-danger">{props.errors.username}</div>
      );
    }
    if (!isEmpty(props.errors.password)) {
      errs.push(
        <div className="alert alert-danger">{props.errors.password}</div>
      );
    }
  }

  return errs;
}

const mapStateToProps = store => ({
  user: store.user,
  errors: store.errors
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ authenticateUser: authenticateUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
