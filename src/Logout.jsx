
import React, { useState, useEffect } from 'react';  
import './App.css'; 
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'; 

const Logout = ({  }) => {   

    const [cookies, setCookie, removeCookie] = useCookies(); 
    const navigate = useNavigate()
    
    let responseToLoggingOut = ""

    useEffect(() => {   
        setCookie("user", null)  
        setCookie("jsonwebtoken", null)  
        removeCookie("user", { path: '/' }) 
        removeCookie("jsonwebtoken", { path: '/' }) 

        axios.get(`http://localhost:3000/api/logout`, {  
            "headers": { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            console.log("response to logging out", response)
            document.getElementById('responseToLoggingOut').innerText = "Successfully logged out" 
            //navigate("/login")
        })
        .catch(error => {
            console.log("Error", error)
            document.getElementById('responseToLoggingOut').innerText = error 
            //navigate("/login")
        }) 
    }, []) 
  
    return ( 
  <>
  <div className="container">
    <h3><div id="responseToLoggingOut"></div></h3>
  </div>
  </>
  );
};

export default Logout