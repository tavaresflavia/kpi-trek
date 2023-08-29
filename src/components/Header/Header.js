import React from "react";
import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";
import './Header.scss'

const Header = ({isLoggedIn}) => {
  return (
    <div className="nav">
     {isLoggedIn && ( <ul className="nav__list">
        <NavLink to="/" className="nav__link">Home</NavLink>
        <NavLink to="/Request" className="nav__link">Requests</NavLink>
      </ul>)}
      <img className="nav__logo" src={logo} alt="KPITrek logo" />
      {isLoggedIn && ( <ul className="nav__list">
        <NavLink to="/KPI" className="nav__link">KPIs</NavLink>
        <NavLink to="Form" className="nav__link">Form</NavLink>
      </ul>)}
    </div>
  );
};

export default Header;
