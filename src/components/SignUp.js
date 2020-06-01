import React, { Component } from "react";
import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

const INITIAL_STATE = {
  name: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
  SignUpAsUser: true,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = async (event) => {
    if (
      this.state.name.trim() === "" ||
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
    let userType = "User";
    if (this.state.SignUpAsUser == false) {
      userType = "Organisation";
    }
    //console.log(authData);
    let user = await this.props.stitch
      .signUpEmailPassword({
        name: this.state.name,
        email: this.state.email,
        password: this.state.passwordOne,
        AccountType: userType,
      })
      .then((user) => {
        console.log(user);
        return user;
      });
    // let login = await this.props.stitch.SignInEmailPassword({
    //   email: this.state.email,
    //   password: this.state.passwordOne,
    // });
    console.log(user);
    // console.log(login);
    console.log("before");
    //this.props.stitch.addUserData(this.state.name, this.);
    console.log("after");
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,

      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      name === "";

    return (
      <div
        className="d-flex py-5 align-items-center justify-content-center "
        onSubmit={(e) => {
          this.onSubmit();
          e.preventDefault();
        }}
      >
        <div className="row rounded border align-self-center my-auto col-sm-12 col-md-9 justify-content-center bg-light  p-5">
          <div className="col-12 text-center display-4">Sign Up</div>
          <div
            className="btn-group bg-white col-12 p-0 rounded-pill my-1"
            style={{
              boxShadow:
                "inset -1px -1px 10px #666666,  inset 1px 1px 10px #ffffff",
            }}
          >
            <button
              className={
                !this.state.SignUpAsUser
                  ? "btn btn-danger col-6 rounded-pill"
                  : "btn col-6 rounded-pill"
              }
              style={
                !this.state.SignUpAsUser
                  ? {
                      boxShadow: "-5px -5px 10px #666666, 1px 1px 5px #FF6347",
                    }
                  : {}
              }
              onClick={() => {
                this.setState({ SignUpAsUser: false });
              }}
            >
              Sign Up as an Organisation
            </button>

            <button
              className={
                this.state.SignUpAsUser
                  ? "btn btn-danger col-6 rounded-pill"
                  : "btn col-6 rounded-pill"
              }
              style={
                this.state.SignUpAsUser
                  ? {
                      boxShadow: "-5px -5px 10px #666666, 1px 1px 5px #FF6347",
                    }
                  : {}
              }
              onClick={() => {
                this.setState({ SignUpAsUser: true });
              }}
            >
              Sign Up as a User
            </button>
          </div>
          <input
            name="name"
            className="col-12 m-1 form-control "
            value={name}
            onChange={this.onChange}
            type="text"
            placeholder="Name"
            style={{
              boxShadow:
                "inset -1px -1px 3px #666666, inset 1px 1px 3px #ffffff",
            }}
          />
          <input
            name="email"
            className="col-12 m-1 form-control "
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            style={{
              boxShadow:
                "inset -1px -1px 3px #666666, inset 1px 1px 3px #ffffff",
            }}
          />
          <input
            name="passwordOne"
            className="col-12 m-1 form-control "
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            style={{
              boxShadow:
                "inset -1px -1px 3px #666666, inset 1px 1px 3px #ffffff",
            }}
          />
          <input
            name="passwordTwo"
            className="col-12 m-1 form-control "
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            style={{
              boxShadow:
                "inset -1px -1px 3px #666666, inset 1px 1px 3px #ffffff",
            }}
          />
          <button
            class="btn btn-dark col-6  my-1"
            disabled={isInvalid}
            type="submit"
            onClick={() => this.onSubmit()}
            style={{
              boxShadow: " -1px -1px 3px #666666,  1px 1px 3px #ffffff",
            }}
          >
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </div>
      </div>
    );
  }
}

export default withStitch(withUserContext(SignUp));
