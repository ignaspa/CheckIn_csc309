import React, { Component } from "react";

export default class PasswordChangeForm extends Component {
  render() {
    return (
      <div>
        <form className="form-inline">
          <div className="form-group col-sm-4 mb-2">
            <label htmlFor="inputPassword1" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group col-sm-4 mb-2">
            <label htmlFor="inputPassword2" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              placeholder="Confirm Password"
            />
          </div>
          <div className="col-sm-4">
            <button type="submit" className="btn btn-sm btn-primary mb-2 ml-2">
              Change Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}
