import "./SignUp.scss";
import { useState } from "react";
import axios from "axios";
import googleIcon from "../../assets/icons/google.png";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [team, setTeam] = useState("");

  const navigate = useNavigate();

  const handleChangeTeam = (e) => {
    setTeam(e.target.value);
  };

  const handleChangeConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isNameValid = () => {
    if (name && name.length < 5) {
      return false;
    }
    return true;
  };

  const isEmailValid = () => {
    const validFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email) {
      return validFormat.test(email);
    }
    return true;
  };

  const isPasswordValid = () => {
    if (password && password.length < 5) {
      return false;
    }
    return true;
  };
  const isConfPasswordValid = () => {
    if (confPassword && confPassword !== password) {
      return false;
    }
    return true;
  };
  const isTeamValid = () => {
    if (team && team.length < 5) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confPassword ||
      !team ||
      !isEmailValid() ||
      !isNameValid() ||
      !isPasswordValid() ||
      !isConfPasswordValid() ||
      !isTeamValid()
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      axios
        .post(`${SERVER_URL}/jwt-auth/register`, {
          username: name,
          email: email,
          password: password,
          team:team
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error.response.data);
        });
    }
  };

  return (
    <div className="signup-page">


      <div className="signup">
        <h3 className="signup__title">Sign up</h3>
        <label className="signup__label">
          Name
          <input
            className={
              "signup__input " + (isNameValid() ? "" : "signup__input--invalid")
            }
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label className="signup__label">
          Email
          <input
            className={
              "signup__input " +
              (isEmailValid() ? "" : "signup__input--invalid")
            }
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <label className="signup__label">
          Password
          <input
            className={
              "signup__input " +
              (isPasswordValid() ? "" : "signup__input--invalid")
            }
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <label className="signup__label">
          Confirm Password
          <input
            className={
              "signup__input " +
              (isConfPasswordValid() ? "" : "signup__input--invalid")
            }
            type="password"
            name="confpassword"
            id="confpassword"
            value={confPassword}
            onChange={handleChangeConfPassword}
          />
        </label>
        <label className="signup__label">
          Team
          <input
            className={
              "signup__input " + (isTeamValid() ? "" : "signup__input--invalid")
            }
            type="text"
            name="team"
            id="team"
            value={team}
            onChange={handleChangeTeam}
          />
        </label>
        <div className="signup__submission-wrap">
          <div
            onClick={handleSubmit}
            className={
              "signup__submission " +
              (isFormValid() ? "" : "signup__submission--disabled")
            }>
            Sign up
          </div>
        </div>

        {error && (
          <div className="signup__message">
            Sign up failed. {error ? error : "Please, try later."}
          </div>
        )}

        <a
          className="signup__google-btn"
          href={`${SERVER_URL}/auth/google`}>
          <img className="signup__google" src={googleIcon} alt="google icon" />
          Sign up with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
