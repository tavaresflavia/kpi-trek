import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
// import useAuth from '../../hooks/useAuth';


const LoginPage = ({changeLogin, isLoggedIn}) => {

    const [showSignUp,setShowSignUp] = useState(false);
    const handleSignUp = ()  => {
        setShowSignUp(true);

    }
    return (
        <div>
          {!showSignUp && <Login   changeLogin= {changeLogin} handleSignUp ={handleSignUp}/>}
          {showSignUp  && <SignUp/>}
        </div>
    );
};

export default LoginPage;