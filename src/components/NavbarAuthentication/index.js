import React, { Component } from "react";
import Navbar from "../Navbar";
import { withUserContext } from "../UserContext";
import NavNonAuth from "./NavNonAuth";

class NavbarAuthentication extends Component {
  render() {
    return (
      <div>
        <NavNonAuth />
      </div>
    );
  }
}

export default withUserContext(NavbarAuthentication);
