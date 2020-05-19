import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarAuthentication from "./NavbarAuthentication";
import Button from "./Button";
class Navbar extends Component {
  render() {
    let styleBackground = {};
    //let styleButton = {};
    let navbarClass = "navbar border-bottom border-secondary ";
    if (this.props.theme == "light") {
      styleBackground = {
        background: "linear-gradient(315deg, #ffffff, #999999)",
        boxShadow: "-5px -5px 10px #666666",
      };
      navbarClass += "navbar-light";
    } else {
      styleBackground = {
        background: "linear-gradient(315deg, #484848, #1f1f1f)",
        boxShadow: "-5px -5px 10px #0e0e0e, 5px 5px 10px #363636;",
      };
      navbarClass += "navbar-dark";
    }
    /*styleButton = { ...styleBackground };
    styleButton["boxShadow"] = "-5px -5px 10px #000000, 5px 5px 10px #ffffff";
    styleButton["boxShadow"] = "-5px -5px 10px #0e0e0e, 5px 5px 10px #363636";
    styleButton["borderRadius"] = "5px";
    styleButton["border"] = "none";*/
    return (
      <div>
        <nav class={navbarClass} style={styleBackground}>
          <div className="flex flex-grow-1">
            <Link class="navbar-brand flex-grow-1">Employee Management</Link>
          </div>
          <NavbarAuthentication />
        </nav>
      </div>
    );
  }
}

export default Navbar;
