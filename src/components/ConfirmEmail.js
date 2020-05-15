import React, { Component } from "react";
import { withStitch } from "./Stitch";

class ConfirmEmail extends Component {
  state = { confirmed: false };
  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const token = queryParams.get("token");
    const tokenId = queryParams.get("tokenId");
    console.log(this.props);
    this.props.stitch.confirmMail(token, tokenId).then((result) => {
      console.log(result);
      this.setState({ confirmed: result });
    });
  }
  render() {
    if (this.state.confirmed) {
      return <div>Thank You For Confirming Your Email</div>;
    } else {
      return <div>confirming ...</div>;
    }
  }
}

export default withStitch(ConfirmEmail);
