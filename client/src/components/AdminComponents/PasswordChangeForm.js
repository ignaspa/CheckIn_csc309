import React, { Component } from "react";

export default class PasswordChangeForm extends Component {
  render() {
    return (
      <div>
        <form class="form-inline">
          <div class="form-group col-sm-4 mb-2">
            <label for="inputPassword1" class="sr-only">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword1"
              placeholder="Password"
            />
          </div>
          <div class="form-group col-sm-4 mb-2">
            <label for="inputPassword2" class="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              id="inputPassword2"
              placeholder="Confirm Password"
            />
          </div>
          <div className="col-sm-4">
            <button type="submit" class="btn btn-sm btn-primary mb-2 ml-2">
              Change Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}
