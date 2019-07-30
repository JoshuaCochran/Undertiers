export function LogIn(username, password, setToken, setLogin) {
  const axios = require("axios");
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
      console.log(response.data.token);
    })
    .catch(function(error) {
      console.log(error);
    });
}
