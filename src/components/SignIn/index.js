import React, { Component } from "react";
import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import { withUserContext } from "../UserContext";
import { withStitch } from "../Stitch";

class SignUp extends Component {
  state = { email: "", password: "" };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };
  SignInHandler = async () => {
    let authData = { email: this.state.email, password: this.state.password };
    if (authData.email.trim() === "" || authData.password.trim() === "") {
      return;
    }
    let user = await this.props.stitch
      .SignInEmailPassword(authData)
      .then((user) => {
        console.log(user);
        console.log(this.props.stitch);
        return user;
      });

    this.props.stitch.client
      .callFunction("CheckUserData", ["hello"])
      .then((result) => {
        console.log(result);
      });
    console.log(user);
    this.props.user.updateUser(user);
  };
  render() {
    return (
      <main className="d-flex m-5 justify-content-center">
        <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
          <div className="col-12 text-center display-4">Sign In</div>
          <button
            onClick={() => {
              this.props.user.updateTest("hello");
            }}
          >
            {this.props.user.test}
          </button>
          <input
            className="col-12 m-1 form-control shadow"
            label="E-Mail"
            config={{ type: "email" }}
            onChange={(event) => this.inputChangeHandler(event, "email")}
          />
          <input
            className="col-12 mt-1 form-control shadow"
            label="Password"
            config={{ type: "password" }}
            onChange={(event) => this.inputChangeHandler(event, "password")}
          />
          <button
            className="btn btn-dark m-1 col-6 shadow"
            onClick={() => this.SignInHandler()}
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }
}

export default withStitch(withUserContext(SignUp));
