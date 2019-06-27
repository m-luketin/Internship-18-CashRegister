import React from "react";
import "./style.css";
import Axios from "axios";

const Login = () => {
  const ValidateLogin = () => {
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    Axios.
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
        <button className="login-button">Log in</button>
      </div>
    </div>
  );
};

export default Login;
