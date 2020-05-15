import React, { Component } from "react";
import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import { withUserContext } from "../UserContext";
import { withStitch } from "../Stitch";

class SignUp extends Component {
  state = { email: "", password1: "", password2: "" };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };
  SignUpHandler = async () => {
    let authData = {
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
    };
    if (
      authData.email.trim() === "" ||
      authData.password1.trim() === "" ||
      authData.password2.trim() === ""
    ) {
      console.log("incomplete form");
      return;
    }
    if (authData.password1 != authData.password2) {
      console.log("paswords not same");
      return;
    }
    let user = await this.props.stitch
      .signUpEmailPassword({
        email: authData.email,
        password: authData.password1,
      })
      .then((user) => {
        console.log(user);
        return user;
      });
    console.log(user);
  };
  render() {
    return (
      <main className="d-flex m-5 justify-content-center">
        <div className="row col-sm-12 col-md-9 justify-content-center bg-light shadow p-5">
          <div className="col-12 text-center display-4">Sign Up</div>
          <input
            className="col-12 m-1 form-control shadow"
            label="E-Mail"
            config={{ type: "email" }}
            onChange={(event) => this.inputChangeHandler(event, "email")}
          />
          <input
            className="col-12 mt-1 form-control shadow"
            label="Password1"
            config={{ type: "password1" }}
            onChange={(event) => this.inputChangeHandler(event, "password1")}
          />
          <input
            className="col-12 mb-1 form-control shadow"
            label="Password2"
            config={{ type: "password2" }}
            onChange={(event) => this.inputChangeHandler(event, "password2")}
          />
          <button
            className="btn btn-dark m-1 col-6 shadow"
            onClick={() => this.SignUpHandler()}
          >
            Sign Up
          </button>
        </div>
      </main>
    );
  }
}

export default withStitch(withUserContext(SignUp));
