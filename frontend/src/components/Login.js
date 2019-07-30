import Cookies from 'universal-cookie';

export function LogIn(username, password, setToken, setLogin) {
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
      cookies.set('token expire', response.data.expiry);
      cookies.set('token', response.data.token);
      console.log(response.data.expiry);
    })
    .catch(function(error) {
      console.log(error);
    });
}
