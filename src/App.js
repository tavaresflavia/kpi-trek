import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.scss";
import KpiPage from './pages/KpiPage/KpiPage';
import RequestPage from './pages/RequestPage/RequestPage';
import NotFound from './pages/NotFound/NotFound';
// import Login from './components/Login/Login';
// import SignUp from "./components/SignUp/SignUp"
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import FormPage from "./pages/FormPage/FormPage";
import LoginPage from "./pages/LoginPage/LoginPage";



const SERVER_URL= process.env.REACT_APP_API_URL;

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const token = sessionStorage.getItem("token");

  const changeLogin  = () =>{
    setIsLoggedIn(true);
  }


  useEffect(() => {
    if (token) {
      axios.get(`${SERVER_URL}/jwt-auth/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
          setUser(response.data);
          setIsAuthenticating(false);
        setIsLoggedIn(true);
        }) 
        .catch((error) => {
          setIsAuthenticating(false);
          setIsLoggedIn(false);
        });
    }else{
    axios
      .get(`${SERVER_URL}/auth/profile`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticating(false);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIsAuthenticating(false);
          setIsLoggedIn(false);
        } else {
          console.log('Error authenticating', err);
        }
      });
    }
  }, [token]);

  if (isAuthenticating) return null;

console.log(isAuthenticating,isLoggedIn)
  if(!isLoggedIn){
    return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element = {<Login changeLogin= {changeLogin}/>}/>
          <Route path="/signup" element = {<SignUp/>}/>
          </Routes>
      </BrowserRouter>
      <LoginPage  changeLogin= {changeLogin}/>

    </>)
  }

  
  return (
    <>
      
      <BrowserRouter>
        <Header />
        {/* <AuthProvider> */}
        <Routes>
          <Route path="/" element = {<HomePage/>}/>
          <Route path="/KPI" element = {<KpiPage/>} />
          <Route path="/Request" element = {<RequestPage userId={user.id}/>}/>
          <Route path="/Form" element = {<FormPage/>} />
          <Route path="*" element = {<NotFound/>} />
          </Routes>
          {/* </AuthProvider> */}
      </BrowserRouter>

    </>
  );
}

export default App;
