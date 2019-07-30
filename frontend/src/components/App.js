import React, { Component } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { UserContext } from "./usercontext";

class App extends Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      user: null,
      token: null,
      loggedIn: false,
      setUser: this.setUser,
      setToken: this.setToken,
      setLogin: this.setLogin
    };
  }

  setUser(user) {
    this.setState({ user: user });
  }

  setToken(token) {
    this.setState({ token: token });
  }

  setLogin(loggedIn) {
    this.setState({ loggedIn: loggedIn });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div style={{ marginTop: "35px" }}>
          <NavBar />
          <Main />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
