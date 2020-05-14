import {
  Stitch,
  AnonymousCredential,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";
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
  signUpEmailPassword = async (authData) => {
    const emailPassClient = this.client.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );
    let user = await emailPassClient
      .registerWithEmail(authData.email, authData.password)
      .then((result) => {
        if (result) {
          console.log(result);
        }
        return result;
      })
      .catch((err) => {
        this.errorHandler("An error occurred!");
        console.log(err);
      });
    return user;
  };
}

//export default withUserContext(StitchClass);
export default StitchClass;
