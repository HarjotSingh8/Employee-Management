import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";
import { withUserContext } from "../UserContext";
class StitchClass {
  constructor() {
    /*if (process.env.APP_ID) {
      this.appId = process.env.APP_ID;
    }*/
    Stitch.initializeDefaultAppClient("employeemanagementstitch-xrbnw");
    this.client = Stitch.defaultAppClient;
  }
  logInAnonymously = async () => {
    let user = await this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then((user) => {
        //this.props.user.updateContext(user);
        console.log(user);
        return user;
      });
    return user;
  };
}

//export default withUserContext(StitchClass);
export default StitchClass;
