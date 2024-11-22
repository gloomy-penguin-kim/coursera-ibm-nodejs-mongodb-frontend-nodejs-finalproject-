import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CookiesProvider, useCookies } from 'react-cookie'

const IsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
 
    const [cookies, setCookie, removeCookie] = useCookies();
      
    useEffect(() => {
        const checkSession = async () => {
        try {
            const response = await axios.get('/api/check-session');
            setIsLoggedIn(true);
            setUserData(cookies.user);  
        } catch (error) { 
            setIsLoggedIn(false);
            setUserData(null);
        }
        };

        checkSession();
    }, []);

  return (
    <div className="container">
      {cookies.jsonwebtoken ? ( 
          <h3>Welcome, {cookies.user.username}!</h3>  
      ) : ( 
          <h3>Please log in.</h3> 
      )}
    </div>
  );
};

export default IsLoggedIn;