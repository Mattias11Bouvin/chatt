import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, GoogleAuthProvider, signInWithPopup } from "../DB/firebase";
import Navbar from "./Nav";

import logo from "./assets/slack.png";
import "./Header.css";
import ImageSlider from "./Slider";

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
      <Navbar
        logo={logo}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
      {/*<HeroSlider /> */}

      <div className="header-content">
        <h1>Made for people.</h1>
        <h1 className="h1p">Built for productivity.</h1>
        <p className="hp">
          Connect the right people, find anything you need and automate<br></br>{" "}
          the rest. That’s work in Slack, your productivity platform.
        </p>
        <div className="hbtn">
          <button className="discount-button">Get 50% off</button>
          <button className="google-signup-button" onClick={handleGoogleSignup}>
            Sign up with Google
          </button>
        </div>
        <p className="slack">WorkSync is free to try for as long as you’d like</p>
        <ImageSlider />
      </div>
    </header>
  );
};

export default Header;
