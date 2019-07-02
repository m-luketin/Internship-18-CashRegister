import React from "react";
import "./style.css";
import Axios from "axios";
import jwt from "jsonwebtoken";
import { withRouter} from 'react-router-dom';

const Login = (props) => {
  const SendLoginInfo = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(username, password);
    Axios.post(
      "/api/employee/authenticate",
       {username: username, password: password} 
    )
    .then(response => {
      localStorage.setItem("JWTToken", response.data);
      props.history.push("/cashregister");
    })



  };
    return (
      <div className="login-parent">
        <div className="login">
          <span className="login-title">MockShop</span>
          <input
            type="text"
            placeholder="Enter user"
            className="login-input"
            id="username"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="login-input"
            id="password"
          />
          <button className="login-button" onClick={() => SendLoginInfo()}>
            Log in
          </button>
        </div>
      </div>
    );
  };


export default withRouter(Login);
