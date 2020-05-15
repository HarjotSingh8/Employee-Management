import React, { Component } from "react";
import { withStitch } from "./Stitch";

class ResetPassword extends Component {
  state = { confirmed: false };
  componentDidMount() {
    const queryUrl = window.location.search;
    const queryParams = new URLSearchParams(queryUrl);
    const token = queryParams.get("token");
    const tokenId = queryParams.get("tokenId");
    /*const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );
    emailPassClient
      .confirmUser(token, tokenId)
      .then()
      .catch((err) => {
        console.log(err);
      });*/
  }
  render() {
    if (this.state.confirmed) {
      return <div>Thank You For Confirming Your Email</div>;
    } else {
      return <div>confirming ...</div>;
    }
  }
}

export default withStitch(ResetPassword);
