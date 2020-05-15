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
  SignUpHandler = async () => {
    let authData = { email: this.state.email, password: this.state.password };
    if (authData.email.trim() === "" || authData.password.trim() === "") {
      return;
    }
    let user = await this.props.stitch
      .signUpEmailPassword(authData)
      .then((user) => {
        console.log(user);
        return user;
      });
    console.log(user);
  };
  render() {
    return (
      <main>
        Sign In
        <input
          label="E-Mail"
          config={{ type: "email" }}
          onChange={(event) => this.inputChangeHandler(event, "email")}
        />
        <input
          label="Password"
          config={{ type: "password" }}
          onChange={(event) => this.inputChangeHandler(event, "password")}
        />
        <button onClick={() => this.SignUpHandler()}>Sign Up</button>
      </main>
    );
  }
}

export default withStitch(withUserContext(SignUp));
