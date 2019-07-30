import React, { Component } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { UserContext } from "./usercontext";
import Cookies from "universal-cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.state = {
      user: null,
      token: null,
      tokenExpire: null,
      expired: false,
      loggedIn: false,
      setUser: this.setUser,
      setToken: this.setToken,
      setLogin: this.setLogin
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const expire = new Date(cookies.get("token expire"));
    const date = new Date();
    this.setToken(cookies.get("token"));
    this.setState({ tokenExpire: cookies.get("token expire") });
    if (date > expire) this.setState({ expired: true });
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
    if (
      this.state.token !== undefined &&
      this.state.token !== null &&
      !this.state.loggedIn &&
      !this.state.expired
    )
      this.setLogin(true);

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
