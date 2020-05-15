import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarAuthentication from "./NavbarAuthentication";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-dark">
          <div className="flex flex-grow-1">
            <Link class="navbar-brand flex-grow-1">Employee Management</Link>
            <button className="btn btn-dark btn-sm">console.log(user)</button>
          </div>
          <NavbarAuthentication />
        </nav>
      </div>
    );
  }
}

export default Navbar;
