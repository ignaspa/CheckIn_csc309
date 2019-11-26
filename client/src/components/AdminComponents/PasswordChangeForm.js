import React, { Component } from "react";
import axios from "axios";

export default class PasswordChangeForm extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      errors: {}
    };
  }

  onChangePassword = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitPassword = event => {
    event.preventDefault();
    const passwordData = {
      password: this.state.password
    };

    axios
      .post(`/api/changePassword/${this.props.userId}`, passwordData)
      .then(res => {
        this.props.hidePasswordChangeForm(this.props.userId);
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
        console.log(this.state);
      });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitPassword} className="form-inline">
          <div className="form-group col-sm-8 mb-2">
            <label htmlFor="inputPassword1" className="sr-only">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${
                this.state.errors.password ? "is-invalid" : ""
              }`}
              id="inputPassword1"
              placeholder="Password"
              onChange={this.onChangePassword}
            />
            {this.state.errors.password && (
              <div className="invalid-feedback">
                {this.state.errors.password}
              </div>
            )}
          </div>

          <div className="col-sm-4">
            <button type="submit" className="btn btn-sm btn-primary mb-2">
              Change Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}
