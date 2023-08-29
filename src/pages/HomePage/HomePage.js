import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { useEffect } from 'react';


const HomePage = ({isLoggedIn}) => {
    const navigate = useNavigate();
    useEffect(() => {if(!isLoggedIn){
        navigate('/login')
    
      }},[isLoggedIn])

    
    return (
        <div>
            
        </div>
    );
};

export default HomePage;