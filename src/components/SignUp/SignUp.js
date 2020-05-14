import React, { Component } from "react";
import {
  Stitch,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import { withUserContext } from "../UserContext";

class AuthPage extends Component {
  state = { email: "", password: "" };

  inputChangeHandler = (event, input) => {
    this.setState({ [input]: event.target.value });
  };
  SignUpHandler = () => {
    if (authData.email.trim() === "" || authData.password.trim() === "") {
      return;
    }
    const emailPassClient = this.client.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );
    emailPassClient
      .registerWithEmail(authData.email, authData.password)
      .then((result) => {
        if (result) {
          this.setState({ isAuth: true });
          this.props.user.updateContext(result);
        }
      })
      .catch((err) => {
        this.errorHandler("An error occurred!");
        console.log(err);
        this.setState({ isAuth: false });
      });
  };
  render() {
    return (
      <main>
        <form className="SignUp" onSubmit={() => this.SignUpHandler()}>
          <Input
            label="E-Mail"
            config={{ type: "email" }}
            onChange={(event) => this.inputChangeHandler(event, "email")}
          />
          <Input
            label="Password"
            config={{ type: "password" }}
            onChange={(event) => this.inputChangeHandler(event, "password")}
          />
          <Button type="submit">{submitButtonText}</Button>
        </form>
      </main>
    );
  }
}
export default AuthPage;

export default withUserContext(SignUp);
