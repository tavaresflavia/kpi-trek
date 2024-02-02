import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { motion as m } from "framer-motion";
import axios from "axios";
import "./Header.scss";

const SERVER_URL = process.env.REACT_APP_API_URL;

const Header = ({ isLoggedIn }) => {
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    axios
      .get(`${SERVER_URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [burgerClass, setBurgerClass] = useState("burger__bar");
  const [menuClass, setMenuClass] = useState("menu");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = (e) => {
    if (!isMenuClicked) {
      setBurgerClass("burger__bar--clicked");
      setMenuClass("menu--visible");
    } else {
      setBurgerClass("burger__bar");
      setMenuClass("menu");
    }
    const click = !isMenuClicked;
    setIsMenuClicked(click);
  };

  return (
    <header className="nav">
      <a className="nav__logo-wrap" href="/">
        <img className="nav__logo" src={logo} alt="KPITrek logo" />
      </a>

      {isLoggedIn && (
        <div>
          <div>
            <nav className={menuClass}>
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
              <NavLink to="/Request" className="nav__link">
                Requests
              </NavLink>
              <NavLink to="/KPI" className="nav__link">
                KPIs
              </NavLink>
              <NavLink to="Form" className="nav__link">
                Form
              </NavLink>
              <div
                className="nav__link nav__link--logout"
                onClick={handleLogout}>
                Logout
              </div>
            </nav>
            <div className="burger" onClick={updateMenu}>
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
              <div className={burgerClass}></div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
