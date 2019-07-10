import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/cashregister" className="navbar-item">
        Cash Register
      </Link>
      <Link to="/checkout" className="navbar-item">
        Checkout
      </Link>
      <Link to="/delivery" className="navbar-item">
        Delivery
      </Link>
      <Link to="/" className="navbar-item">
        Logout
      </Link>
    </div>
  );
};

export default Navbar;