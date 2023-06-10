import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer>
    <div>
      <img src="your-logo.png" alt="Your Logo" />
      <p>Your Company Description</p>
    </div>
    <div>
      <h4>Products</h4>
      <ul>
        <li>
          <a href="/product1">Product 1</a>
        </li>
        <li>
          <a href="/product2">Product 2</a>
        </li>
        // Add more products as needed
      </ul>
    </div>
    <div>
      <h4>Resources</h4>
      <ul>
        <li>
          <a href="/resource1">Resource 1</a>
        </li>
        <li>
          <a href="/resource2">Resource 2</a>
        </li>
      </ul>
    </div>

    <div>
      <h4>Follow us</h4>
      <ul>
        <li>
          <a href="your-facebook-url">Facebook</a>
        </li>
        <li>
          <a href="your-twitter-url">Twitter</a>
        </li>
      </ul>
    </div>
    <div>
      <p>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
      <a href="/terms-of-service">Terms of Service</a>
      <a href="/privacy-policy">Privacy Policy</a>
    </div>
  </footer>
);

export default Footer;
