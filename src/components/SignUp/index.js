import React, { Component } from "react";
import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import { withUserContext } from "../UserContext";
import { withStitch } from "../Stitch";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = async (event) => {
    if (
      this.state.email.trim() === "" ||
      this.state.passwordOne.trim() === "" ||
      this.state.passwordTwo.trim() === ""
    ) {
      console.log("incomplete form");
      return;
    }
    if (this.state.passwordOne != this.state.passwordTwo) {
      console.log("paswords not same");
      return;
    }
    //console.log(authData);
    let user = await this.props.stitch
      .signUpEmailPassword({
        email: this.state.email,
        password: this.state.passwordOne,
      })
      .then((user) => {
        console.log(user);
        return user;
      });
    let login = await this.props.stitch.SignInEmailPassword({
      email: this.state.email,
      password: this.state.passwordOne,
    });
    console.log(user);
    console.log(login);
    console.log("before");
    this.props.stitch.addUserData(this.state.username);
    console.log("after");
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,

      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form
        onSubmit={(e) => {
          this.onSubmit();
          e.preventDefault();
        }}
      >
        <div class="row justify-content-center bg-white p-5">
          <h1>Sign Up</h1>
        </div>
        <div class="row justify-content-center bg-white">
          <div className="col-6">
            <input
              name="username"
              class="col-12 my-2"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Full Name"
            />
            <input
              name="email"
              class="col-12 my-2"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="passwordOne"
              class="col-12 my-2"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <input
              name="passwordTwo"
              class="col-12 my-2"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
            <button
              class="btn btn-primary col-12 my-2"
              disabled={isInvalid}
              type="submit"
            >
              Sign Up
            </button>
            {error && <p>{error.message}</p>}
          </div>
        </div>
      </form>
    );
  }
}

export default withStitch(withUserContext(SignUp));
