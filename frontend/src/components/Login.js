import Cookies from "universal-cookie";

export function LogIn(username, password, setToken, setLogin, setUser) {
  const axios = require("axios");
  const cookies = new Cookies();
  const credentials = btoa(username + ":" + password);
  axios({
    method: "post",
    url: "http://www.undertiers.com:8000/auth/login/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + credentials
    }
  })
    .then(function(response) {
      setToken(response.data.token);
      setLogin(response.data.token !== undefined);
      cookies.set("token expire", response.data.expiry, { path: "/" });
      cookies.set("token", response.data.token, { path: "/" });
    })
    .then(function(response) {
      axios({
        method: "get",
        url: "http://www.undertiers.com:8000/account/users/me",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + cookies.get("token")
        }
      }).then(function(response) {
        setUser(response.data);
        cookies.set("user", response.data);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function Register(username, password, email, setToken, setLogin) {
  const axios = require("axios");
  axios({
    method: "post",
    url: "http://www.undertiers.com:8000/account/users/",
    headers: { "Content-Type": "application/json" },
    data: {
      email: email,
      username: username,
      password: password
    }
  }).catch(function(error) {
    console.log(error);
  });
  // Handle response packet Username already exists/Password invalid
}

export function GetMaps() {
  const axios = require("axios");
  const cookies = new Cookies();
  axios({
    method: "get",
    url: "http://www.undertiers.com:8000/boards/me",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token")
    }
  })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}
