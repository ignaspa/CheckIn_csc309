import React, { Component } from "react";
import { createUser, authenticateUser } from "../redux/actions.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const validFeedback = "Looks Good!";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFirstNameError: "",
      showLastNameError: "",
      showEmailError: "",
      showPasswordError: "",
      showUsernameError: "",
      showPassword2Error: ""
    };
  }

  submitHandler = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.first_name + " " + this.state.last_name,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.createUser(newUser, this.props.history);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      let showFirstNameError = "is-valid";
      let showLastNameError = "is-valid";
      let showEmailError = "is-valid";
      let showUsernameError = "is-valid";
      let showPasswordError = "is-valid";
      let showPassword2Error = "is-valid";
      if (!this.state.first_name || this.state.first_name === "") {
        showFirstNameError = "is-invalid";
      }
      if (!this.state.last_name || this.state.last_name === "") {
        showLastNameError = "is-invalid";
      }
      if (!this.state.email || this.state.email === "") {
        showEmailError = "is-invalid";
      }
      if (this.props.errors.username) {
        showUsernameError = "is-invalid";
      }
      if (this.props.errors.password) {
        showPasswordError = "is-invalid";
      }
      if (this.props.errors.password2) {
        showPassword2Error = "is-invalid";
      }
      this.setState({
        showFirstNameError: showFirstNameError,
        showLastNameError: showLastNameError,
        showEmailError: showEmailError,
        showUsernameError: showUsernameError,
        showPasswordError: showPasswordError,
        showPassword2Error: showPassword2Error
      });
    }
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const disclaimerEmail = "We'll never share your email with anyone else";
    const disclaimerPassword =
      "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.";

    return (
      <div className="container">
        <article className="auth-form card-body mx-auto">
          <h4 className="card-title mt-3 text-center"> Create an account </h4>

          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="form-row">
              <div className="col">
                <TextEntry
                  name={"first_name"}
                  label={"First Name"}
                  changeHandler={this.changeHandler}
                  feedback="Please enter your first name!"
                  tag={this.state.showFirstNameError}
                />
              </div>

              <div className="col">
                <TextEntry
                  name={"last_name"}
                  label={"Last Name"}
                  feedback="Please enter your last name!"
                  changeHandler={this.changeHandler}
                  tag={this.state.showLastNameError}
                />
              </div>
            </div>

            <EmailEntry
              label={"Email"}
              disclaimer={disclaimerEmail}
              feedback="Don't forget your e-mail"
              changeHandler={this.changeHandler}
              tag={this.state.showEmailError}
            />

            <Username
              label={"Username"}
              disclaimer={disclaimerEmail}
              feedback={this.props.errors.username}
              tag={this.state.showUsernameError}
              changeHandler={this.changeHandler}
            />

            <Password
              name={"password"}
              label={"Password"}
              disclaimer={""}
              feedback={this.props.errors.password}
              tag={this.state.showPasswordError}
              changeHandler={this.changeHandler}
            />
            <Password
              name={"password2"}
              label={"Re-enter password"}
              disclaimer={disclaimerPassword}
              feedback={this.props.errors.password2}
              tag={this.state.showPassword2Error}
              changeHandler={this.changeHandler}
            />
            <Button label={"Submit"} />
          </form>
        </article>
      </div>
    );
  }
}

function TextEntry(props) {
  return (
    <div className="form-group">
      <label htmlFor="inputText">{props.label}</label>
      <input
        name={props.name}
        className={`form-control ${props.tag}`}
        id={props.label}
        placeholder={props.label}
        type="text"
        onChange={props.changeHandler}
        required
      />
      <ValidFeedback feedback={validFeedback} />
      <InvalidFeedback feedback={props.feedback} />
    </div>
  );
}

function EmailEntry(props) {
  return (
    <div className="form-group">
      <label htmlFor="inputEmail">{props.label}</label>
      <input
        name="email"
        className={`form-control ${props.tag}`}
        placeholder={props.label}
        type="email"
        onChange={props.changeHandler}
        required
      />
      <small id="emailHelp" className="form-text text-muted">
        {props.disclaimer}
      </small>
      <ValidFeedback feedback={validFeedback} />
      <InvalidFeedback feedback={props.feedback} />
    </div>
  );
}

export function Username(props) {
  return (
    <div className="form-group">
      <label htmlFor="Username">{props.label}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">@</span>
        </div>
        <input
          name="username"
          className={`form-control ${props.tag}`}
          placeholder={props.label}
          type="text"
          onChange={props.changeHandler}
          required
        />
        <ValidFeedback feedback={validFeedback} />
        <InvalidFeedback feedback={props.feedback} />
      </div>
    </div>
  );
}

export function Password(props) {
  return (
    <div className="form-group">
      <label htmlFor="inputEmail">{props.label}</label>
      <input
        name={props.name}
        className={`form-control ${props.tag}`}
        placeholder={props.label}
        type="password"
        onChange={props.changeHandler}
        required
      />
      <ValidFeedback feedback={validFeedback} />
      <InvalidFeedback feedback={props.feedback} />
      <small id="passwordHelpBlock" className="form-text text-muted">
        {props.disclaimer}
      </small>
    </div>
  );
}

export function Button(props) {
  return (
    <button type="submit" className="btn btn-primary">
      {props.label}
    </button>
  );
}

function ValidFeedback(props) {
  return <div className="valid-feedback">{props.feedback}</div>;
}

function InvalidFeedback(props) {
  return <div className="invalid-feedback">{props.feedback}</div>;
}

const mapStateToProps = store => ({
  errors: store.errors,
  user: store.user,
  new_user: store.new_user
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { createUser: createUser, authenticateUser: authenticateUser },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);
