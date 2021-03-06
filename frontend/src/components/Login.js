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
      setToken(response.data.token, response.data.expiry);
      cookies.set("token expire", response.data.expiry, { path: "/" });
      cookies.set("token", response.data.token, { path: "/" });
      setLogin(response.data.token !== undefined);
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
        cookies.set("user", response.data, { path: "/" });
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function Register(username, password, email) {
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

export function Upvote(id, upvote) {
  const axios = require("axios");
  const cookies = new Cookies();
  if (upvote) {
    axios({
      method: "post",
      url: "http://www.undertiers.com:8000/upvotes/me/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.get("token", { path: "/" })
      },
      data: {
        board: id
      }
    });
  } else {
    axios({
      method: "delete",
      url: "http://www.undertiers.com:8000/downvote/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + cookies.get("token", { path: "/" })
      },
      data: {
        board: id
      }
    }).catch(function(error) {
      console.log(error);
    });
  }
}

export async function CreateBoard(userId, name, description, setRedirect, setBoardState){
  const axios = require('axios');
  const cookies = new Cookies();
  await axios({
    method: "post",
    url: "http://www.undertiers.com:8000/boards/create/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token", { path: "/" })
    },
    data: {
      name: name,
      user: userId,
      description: description
    }
  }).then(function(response){
    const id = JSON.stringify(response.data.id);
    setBoardState(0, response, "NEW_BOARD");
    setRedirect({isRedirecting: true, to: "/boards/edit/" + id});
  }).catch(function(error){
    console.log(error);
  })
}
