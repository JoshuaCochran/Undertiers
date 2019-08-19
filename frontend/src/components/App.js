import React, { Component } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Cookies from "universal-cookie";
import UserStore from "./UserStore";

class App extends Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.logOut = this.logOut.bind(this);
    this.state = {
      user: null,
      token: null,
      tokenExpire: null,
      expired: false,
      loggedIn: false,
      setUser: this.setUser,
      setToken: this.setToken,
      setLogin: this.setLogin,
      logOut: this.logOut
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const expire = new Date(cookies.get("token expire"));
    const date = new Date();
    if (date > expire) {
      cookies.remove("token", { path: "/" });
      cookies.remove("token expire", { path: "/" });
      cookies.remove("user", { path: "/" });
      this.setState({ expired: true, user: null });
    } else if (cookies.get("token", { path: "/" })) {
      this.setToken(cookies.get("token", { path: "/" }));
      this.setState({
        tokenExpire: cookies.get("token expire", { path: "/" }),
        loggedIn: true
      });
      this.setUser(cookies.get("user", { path: "/" }));
    }
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

  logOut() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    cookies.remove("token expire", { path: "/" });
    this.setState({
      token: null,
      loggedIn: false,
      tokenExpire: null,
      user: null
    });
  }

  render() {
    return (
      <UserStore>
          <div style={{ marginTop: "45px" }}>
            <NavBar />
            <Main />
          </div>
      </UserStore>
    );
  }
}

export default App;
