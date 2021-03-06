import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/cashregister" id="go-to-cashregister" className="navbar-item">
        Cash Register
      </Link>
      <Link to="/checkout" id="go-to-checkout" className="navbar-item">
        Checkout
      </Link>
      <Link to="/delivery" id="go-to-delivery" className="navbar-item">
        Delivery
      </Link>
      <Link to="/receipts" id="go-to-receipts" className="navbar-item">
        Receipts
      </Link>
      <Link to="/" className="navbar-item">
        Logout
      </Link>
    </div>
  );
};

export default Navbar;