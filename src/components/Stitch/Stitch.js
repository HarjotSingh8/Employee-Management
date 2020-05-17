import {
  Stitch,
  AnonymousCredential,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
  RemoteMongoClient,
  BSON,
} from "mongodb-stitch-browser-sdk";

class StitchClass {
  constructor() {
    /*if (process.env.APP_ID) {
      this.appId = process.env.APP_ID;
    }*/
    this.stitchApp = Stitch.initializeDefaultAppClient(
      "employeemanagementstitch-xrbnw"
    );
    this.client = Stitch.defaultAppClient; //eh client mongodb stitch naal communicate karu
    this.mongodb = this.stitchApp.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    ); //eh database nu access karan vste aa
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

  addUserData = async (args) => {
    this.client.callFunction("AddNewUserData", [args]).then((result) => {
      console.log(result);
    });
  };

  signUpEmailPassword = async (authData) => {
    const emailPassClient = this.client.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );
    console.log(emailPassClient);
    let err = await emailPassClient
      .registerWithEmail(authData.email, authData.password)
      .then((result) => {
        if (result) {
          console.log("Sign Up Successful");
          console.log(result);
        }
        return result;
      })
      .catch((err) => {
        console.log("An error occurred!");
        console.log(err);
        return err;
      });
    return err;
  };

  SignInEmailPassword = async (authData) => {
    const credentials = new UserPasswordCredential(
      authData.email,
      authData.password
    );
    let user = await this.client.auth
      .loginWithCredential(credentials)
      .then((result) => {
        console.log("Sign In Successful");
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  };
  confirmMail = async (token, tokenId) => {
    const emailPassClient = Stitch.defaultAppClient.auth.getProviderClient(
      UserPasswordAuthProviderClient.factory
    );
    let result = await emailPassClient
      .confirmUser(token, tokenId)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  };
}

//export default withUserContext(StitchClass);
export default StitchClass;
