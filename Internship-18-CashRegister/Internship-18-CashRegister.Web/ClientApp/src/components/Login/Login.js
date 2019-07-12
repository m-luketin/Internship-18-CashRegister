import React from "react";
import "./style.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";

const Login = props => {
  const SendLoginInfo = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let cashRegister = document.getElementById("cashRegister").value;

    Axios.post("/api/employee/authenticate", {
      username: username,
      password: password
    })
      .then(response => {
        localStorage.setItem("Token", response.data);
        localStorage.setItem("CashRegister", cashRegister);

        Axios.post(`api/cashregister/authenticate`, {
          id: cashRegister
        })
          .then(() => {
            props.history.push(`/cashregister`);
            props.loginHandler(cashRegister, username);
          })
          .catch(() => {
            window.alert(`Cash register does not exist!`);
          });
      })
      .catch(() => {
        window.alert(`User does not exist!`);
      });
  };

  return (
    <div className="login-parent">
      <div className="login">
        <span className="login-title">MockShop</span>
        <input
          type="text"
          placeholder="Enter cash register ID"
          className="login-input"
          id="cashRegister"
        />
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
