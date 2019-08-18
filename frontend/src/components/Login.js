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
        cookies.set("user", response.data);
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

export function GetBoards(all, setBoardData, setLoaded, setLoading) {
  const axios = require("axios");
  const cookies = new Cookies();
  var url;
  var headers;
  setLoading(true);
  if (all.all === true) {
    url = "http://www.undertiers.com:8000/boards/";
    headers = {
      "Content-Type": "application/json"
    };
  } else {
    url = "http://www.undertiers.com:8000/boards/me/";
    headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token", { path: "/" })
    };
  }
  axios({
    method: "get",
    url: url,
    headers: headers
  })
    .then(function(response) {
      setBoardData(response.data);
      setLoaded(true);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function GetAllUpvotes(setCount, setLoadedCount) {
  const axios = require("axios");
  axios({
    method: "get",
    url: "http://www.undertiers.com:8000/upvotes/",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(response) {
    var data = response.data.map(upvote =>
      response.data.filter(upfil => upvote.board === upfil.board)
    );
    data = data.map(upvote => JSON.stringify(upvote));
    data = Array.from(new Set(data));
    data = data.map(upvote => JSON.parse(upvote));
    setCount(data);
    setLoadedCount(true);
  }).catch(function(error){
    console.log(error);
  });
}

export function GetMyUpvotes(setUpvotes, setLoadedUpvotes) {
  const axios = require("axios");
  const cookies = new Cookies();
  axios({
    method: "get",
    url: "http://www.undertiers.com:8000/upvotes/me/",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + cookies.get("token", { path: "/" })
    }
  })
    .then(function(response) {
      setUpvotes(response.data);
      setLoadedUpvotes(true);
    })
    .catch(function(error) {
      console.log(error);
    });
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

export function CreateBoard(userId, name, description){
  const axios = require('axios');
  const cookies = new Cookies();
  axios({
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
    console.log(response.data);
  }).catch(function(error){
    console.log(error);
  })
}
