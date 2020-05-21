class User {
  constructor() {
    this.user = false;
    this.test = "";
    this.updated = () => {
      console.log("function not yet assigned");
    };
  }
  setUpdater(args) {
    this.updated = args;
  }
  updateUser = (arg) => {
    this.user = arg;
    this.updated();
  };
  updateTest = (arg) => {
    this.test = arg;
    this.updated();
  };
}

export default User;
