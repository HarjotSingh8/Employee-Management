import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavAuth extends Component {
  render() {
    return (
      <div>
        <Link to="/Profile" className="btn btn-dark">
          {this.props.name}
        </Link>
        <button className="btn btn-dark">Sign Out</button>
      </div>
    );
  }
}

export default NavAuth;
