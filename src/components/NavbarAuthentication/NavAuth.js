import React, { Component } from "react";

class NavAuth extends Component {
  render() {
    return (
      <div>
        <button className="btn btn-dark">{this.props.email}</button>
      </div>
    );
  }
}

export default NavAuth;
