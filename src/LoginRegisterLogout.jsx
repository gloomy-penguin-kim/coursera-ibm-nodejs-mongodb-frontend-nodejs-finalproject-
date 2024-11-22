
import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import './App.css'; 
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginRegisterLogout = ({  }) => {   

    const [cookies, setCookie, removeCookie] = useCookies();  
  
    return ( 
    <div className="navbar-nav ms-auto d-flex"> 
        {cookies.jsonwebtoken ? (
            <div>
                <div className="loginLink" style={{display:'inline-block', color: 'whitesmoke'}}>
                    {cookies.user.username}  ({cookies.user.email})
                </div> 
                <div className="loginlink" id="linkLogout">
                    <Link to="/logout" className="nav-link">Logout</Link>
                </div>
            </div> 
        ) : (  
            <div>
                <div className="loginlink" id="linkLogin">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
                <div className="loginlink" id="linkRegister">
                    <Link to="/register" className="nav-link">Register</Link>
                </div>
            </div>
        )} 
    </div>
  );
};

export default LoginRegisterLogout