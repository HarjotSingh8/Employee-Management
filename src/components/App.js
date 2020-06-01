import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withUserContext } from "./UserContext";
import { withStitch } from "./Stitch";

//import User, { UserContext } from "./UserContext";
//import StitchClass, { StitchContext } from "./Stitch";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ConfirmEmail from "./ConfirmEmail";
import ResetPassword from "./ResetPassword";
import Navbar from "./Navbar";
import FirstLoginData from "./FirstLoginData";
import CommuncationsPage from "./Communications";

//
import InputFields from "./InputFields";
import Profile from "./Profile";
import bg from "./ElCapitan.jpg";

class App extends Component {
  state = { user: null, auth: null };
  componentDidUpdate() {
    if (this.state.auth != this.props.stitch.auth) {
      console.log(this.props.stitch);
      this.setState({ auth: this.props.stitch.auth });
    }
    //this.updateUserData();
  }
  componentDidMount() {
    this.props.stitch.setUpdateAppjs((user) => {
      if (this.state.user != user) this.setState({ user: user });
    });
    this.updateUserData();
  }
  updateUserData = async () => {
    if (this.props.stitch.client.auth.currentUser) {
      console.log("Refreshing user data on page refresh");
      let res = await this.props.stitch.client.auth.refreshCustomData();
      console.log("current User" + this.props.stitch.client.auth.currentUser);
      this.setState({
        user: this.props.stitch.client.auth.currentUser.customData,
      });
    } else {
      console.log("user not logged in ");
    }
  };
  updateValue = (val) => {
    this.setState({ user: val });
  };

  render() {
    return (
      <Router basename="/">
        <div style={{ minHeight: "100vh" }}>
          <img
            src={bg}
            style={{
              height: "100vh",
              width: "100%",
              zIndex: -2,
              position: "fixed",
              objectFit: "cover",
            }}
          ></img>
          <Navbar />
          <Switch>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route path="/FirstLoginData">
              <FirstLoginData />
            </Route>
            <Route path="/InputFields">
              <InputFields />
            </Route>
            <Route path="/Profile">
              <Profile user={this.state.user} />
            </Route>
            <Route path="/ConfirmMail" component={ConfirmEmail} />
            <Route path="/ResetPassword">
              <ResetPassword />
            </Route>
            <Route path="/">
              <SignUp />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default withStitch(withUserContext(App));

/*
class App extends Component {
  state = { temp: 0 };
  updateUserData = async () => {
    console.log(this.props.stitch);
    if (this.props.stitch.client.auth.currentUser) {
      console.log("refreshing user data on page refresh");
      let res = await this.props.stitch.client.auth.refreshCustomData();
      console.log(this.props.stitch.client.auth.currentUser);
      this.props.user.updateUser(this.props.stitch.client.auth.currentUser);
      console.log(this.props.user);
    } else {
      console.log("user not logged in");
    }
  };
  componentDidMount() {
    this.updateUserData();
    this.props.user.setUpdater(this.updated);
  }
  updated = () => {
    console.log("changing app.js state");
    //console.log(this.props.user);
    this.setState({ temp: this.state.temp + 1 });
  };

  render() {
    return (
      <Router basename="/">
        <div>
          <Navbar />
          <Switch>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/SignIn">
              <SignIn />
            </Route>
            <Route path="/FirstLoginData">
              <FirstLoginData />
            </Route>
            <Route path="/Communications">
              <CommuncationsPage />
            </Route>
            <Route path="/ConfirmMail" component={ConfirmEmail} />
            <Route path="/ResetPassword">
              <ResetPassword />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStitch(withUserContext(App));
//export default App;
*/
