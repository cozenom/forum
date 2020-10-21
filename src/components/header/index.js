import React, { Component } from "react";
import "./header.css";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/thread/thread_name_here">Dashboard</Link>
          </li>
          <li>
            <Link to="/thread/new_thread">New thread</Link>
          </li>
          <li>
            <Link to="/user/:profile_name">profile</Link>
          </li>
        </ul>
        <hr />
      </div>
    );
  }
}

export default Header;