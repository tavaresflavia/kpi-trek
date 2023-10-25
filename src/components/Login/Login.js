import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import googleIcon from "../../assets/icons/google.png";
import { Link, useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_API_URL;

const Login = ({ changeLogin, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
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
  const isFormValid = () => {
    if (!email || !password || !isEmailValid() || !isPasswordValid()) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      axios
        .post(`${SERVER_URL}/jwt-auth/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          changeLogin();
          navigate("/");
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <h3 className="login__title">Log in</h3>
        <label className="login__label">
          Email
          <input
            className={
              "login__input " + (isEmailValid() ? "" : "login__input--invalid")
            }
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </label>
        <label className="login__label">
          Password
          <input
            className={
              "login__input " +
              (isPasswordValid() ? "" : "login__input--invalid")
            }
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
        </label>
        <div className="login__submittion-wrap">
          <div
            className="login__submition "
            onClick={() => {
              setEmail("user@test.com");
              setPassword("user123");
            }}>
            Login with test user
          </div>
          <div
            onClick={handleSubmit}
            href="/"
            className={
              "login__submition " +
              (isFormValid() ? "" : "login__submition--disabled")
            }>
            Log in
          </div>
        </div>
        {error && (
          <div className="login__message">
            Log in failed.{" "}
            {error.response.data ? error.response.data : " Please, try later. "}
          </div>
        )}

        <a className="login__google-btn" href={`${SERVER_URL}/auth/google`}>
          <img className="login__google" src={googleIcon} alt="google icon" />
          Log in with Google
        </a>
        <Link to="/signup" onClick={handleSignUp} className={"login__sign-up"}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
