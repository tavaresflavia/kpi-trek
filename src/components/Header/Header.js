import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";
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
      .catch((err)=> {
        console.log(err)
      })
  };

  return (
    <header className="nav">
      {isLoggedIn && (
        <ul className="nav__list">
          <NavLink to="/" className="nav__link">
            Home
          </NavLink>
          <NavLink to="/Request" className="nav__link">
            Requests
          </NavLink>
        </ul>
      )}
      <img className="nav__logo" src={logo} alt="KPITrek logo" />
      {isLoggedIn && (
        <ul className="nav__list">
          <NavLink to="/KPI" className="nav__link">
            KPIs
          </NavLink>
          <NavLink to="Form" className="nav__link">
            Form
          </NavLink>
        </ul>
      )}
      {isLoggedIn && (
        <div className="nav__logout" onClick={handleLogout}>
          Logout
        </div> 
      )}
    </header>
  );
};

export default Header;
