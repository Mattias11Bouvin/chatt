import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, GoogleAuthProvider, signInWithPopup } from "../DB/firebase";

import logo from "./assets/slack.png";
import "./Header.css";

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  function handleGoogleSignup() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img src={logo} alt="Logo" />
          </li>
          <li>
            <div className="dropdown">
              <a href="#">Product &#9662;</a>
              <div className="dropdown-content">
                <a href="#">Features</a>
                <a href="#">Channels</a>
                <a href="#">Integrations</a>
                <a href="#">Security</a>
                <a href="#">Slack connect</a>
                <a href="#">Customers</a>
              </div>
            </div>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <button id="srch" onClick={() => setShowSearch(!showSearch)}>
              &#128269;
            </button>
            {showSearch && (
              <div style={{ position: "relative" }}>
                <input type="text" placeholder="Search..." />
                <div className="x" onClick={() => setShowSearch(false)}>
                  X
                </div>
              </div>
            )}
          </li>
          <Link className="sign" to="/login">
            Sign in
          </Link>
          <button className="free">Try for free</button>
          <button className="us">Talk to us</button>
        </ul>
      </nav>
      <div className="header-content">
        <h1>Made for people.</h1>
        <h1 className="h1p">Built for productivity.</h1>
        <p className="hp">
          Connect the right people, find anything you need and automate<br></br>{" "}
          the rest. That’s work in Slack, your productivity platform.
        </p>
        <button className="discount-button">Get 50% off</button>
        <button className="google-signup-button" onClick={handleGoogleSignup}>
          Sign up with Google
        </button>
      </div>
    </header>
  );
};

export default Header;
