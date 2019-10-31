import React, { Component } from "react";

const validFeedback = "Looks Good!";

export default class SignUpComponent extends Component {
  submitHandler = event => {
    console.log('Submit Handled!')
    event.preventDefault();
    event.target.className += " was-validated";
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const disclaimerEmail = "We'll never share your email with anyone else";
    const disclaimerPassword =
      "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.";
    const style = {
      width: "400px"
    };

    return (
      <div className="container">
        <article className="card-body mx-auto" style={style}>
          <h4 className="card-title mt-3 text-center"> Create an account </h4>

          <form
            className="needs-validation"
            onSubmit={this.submitHandler}
            noValidate
          >
            <div className="form-row">
              <div className="col">
                <TextEntry
                  label={"First Name"}
                  changeHandler={this.changeHandler}
                  feedback="Please enter your first name!"
                />
              </div>

              <div className="col">
                <TextEntry
                  label={"Last Name"}
                  feedback="Please enter your last name!"
                />
              </div>
            </div>

            <EmailEntry
              label={"E-mail"}
              disclaimer={disclaimerEmail}
              feedback="Don't forget your e-mail"
            />

            <Username
              label={"Username"}
              disclaimer={disclaimerEmail}
              feedback="Please pick a username!"
            />

            <Password
              label={"Password"}
              disclaimer={disclaimerPassword}
              feedback="Please choose a password!"
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
      <label for="inputText">{props.label}</label>
      <input
        name=""
        class="form-control"
        id="inputText"
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
      <label for="inputEmail">{props.label}</label>
      <input
        name=""
        className="form-control"
        placeholder={props.label}
        type="email"
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
      <label for="Username">{props.label}</label>
      <div className="form-group input-group-prepend">
        <div className="input-group-prepend">
          <span className="input-group-text">@</span>
        </div>
        <input
          name="username"
          className="form-control"
          placeholder={props.label}
          type="text"
          onChange={props.changeHandler}
          required
        />
      </div>
      <ValidFeedback feedback={validFeedback} />
      <InvalidFeedback feedback={props.feedback} />
    </div>
  );
}

export function Password(props) {
  return (
    <div class="form-group">
      <label for="inputEmail">{props.label}</label>
      <input
        name="password"
        className="form-control"
        placeholder={props.label}
        type="password"
        onChange={props.changeHandler}
        required
      />
      <small id="passwordHelpBlock" className="form-text text-muted">
        {props.disclaimer}
      </small>
      <ValidFeedback feedback={validFeedback} />
      <InvalidFeedback feedback={props.feedback} />
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
