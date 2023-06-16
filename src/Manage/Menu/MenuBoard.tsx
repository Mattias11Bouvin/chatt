import React from "react";
import "./MenuBoard.css";
const MenuBoard = () => {
  return (
    <div className="menu-board">
      <ul className="menu">
        <li className="menu-item">Ditt arbete</li>
        <li className="menu-item">Projekt</li>
        <li className="menu-item">Filter</li>
        <li className="menu-item">Dashboard</li>
        <li className="menu-item">Team</li>
        <li className="menu-item">Appar</li>
        <li className="menu-item">Skapa</li>
      </ul>
    </div>
  );
};

export default MenuBoard;
