import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.scss";
import KpiPage from './pages/KpiPage/KpiPage';
import RequestPage from './pages/RequestPage/RequestPage';
import NotFound from './pages/NotFound/NotFound';
import Login from './components/Login/Login';
import SignUp from "./components/SignUp/SignUp";
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import FormPage from "./pages/FormPage/FormPage";

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
        setUser(res.data);
        setIsAuthenticating(false);
        setIsLoggedIn(true);
      })
      .catch((err) => {
          setIsAuthenticating(false);
          setIsLoggedIn(false);
      });
    }
  }, [token]);

  if (isAuthenticating) return null;


  
  return (
    <>
      
      <BrowserRouter>
        <Header isLoggedIn ={isLoggedIn} />
        <Routes>
          
          <Route path="/" element = {<HomePage isLoggedIn ={isLoggedIn}/>}/>
          <Route path = '/login' element = {<Login changeLogin={changeLogin} isLoggedIn ={isLoggedIn} />}/>
          <Route path = '/signup' element = {<SignUp changeLogin={changeLogin} isLoggedIn ={isLoggedIn} />}/> 
          <Route path="/kpi" element = {<KpiPage userId={user.id}/>} />
          <Route path="/request" element = {<RequestPage userId={user.id}/>}/>
          <Route path="/request/:requestId" element = {<RequestPage userId={user.id}/>}/>
          <Route path="/request/add/:kpiId" element = {<RequestPage userId={user.id}/>}/>
          <Route path="/form" element = {<FormPage userId={user.id}/>} />
          <Route path="/form/:kpiId" element = {<FormPage userId={user.id}/>} />
          <Route path="*" element = {<NotFound/>} />
          </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
