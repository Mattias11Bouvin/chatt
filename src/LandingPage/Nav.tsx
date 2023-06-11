import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./assets/slack.png";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // This is your data to be searched. Replace it with your actual data.
  const data = [
    "Features",
    "Channels",
    "Integrations",
    "Security",
    "Slack connect",
    "Customers",
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm !== "") {
      const results = data.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(data);
    }
  };

  return (
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
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
              />
              {searchResults.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
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
  );
};

export default Navbar;
