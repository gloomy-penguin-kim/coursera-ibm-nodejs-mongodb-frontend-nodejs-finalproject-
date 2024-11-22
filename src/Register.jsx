import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
 

const Register = ({  }) => {   
    const [cookies, setCookie, removeCookie] = useCookies(); 
    const navigate = useNavigate()

    const headers = {
        'headers' : { 
            'Authorization': 'Bearer '+cookies.jsonwebtoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        }  
 
    const updateCookiesForLogin = (user, token) => { 
        console.log("coookies ", token) 
        console.log("coookies ", user) 
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate()+1); 
        
        setCookie("user", user, { expires: expirationDate, path: '/' })
        setCookie("isLoggedIn", true, { expires: expirationDate, path: '/' });  
        setCookie("jsonwebtoken", token, { expires: expirationDate, path: '/' })

        console.log("coookies ", cookies.jsonwebtoken) 
        console.log("coookies ", cookies.user) 
    }
    

    const submitRegisterInfo = (e) => {
        e.preventDefault()
        document.getElementById('formErrorMessage').innerText = ""  

        axios.post(`http://localhost:3000/api/register`, {
            username: document.getElementById('username').value,
            email:    document.getElementById('email').value,
            password: document.getElementById('password').value
        }, headers)
            .then(response => { 
                console.log(response) 
                if (!response.data.token) throw Error("No auth token provided")
                document.getElementById('formErrorMessage').innerText = response.data.message 
 
                const user = { username: response.data.user.username,
                                email:   response.data.user.email,
                                userId:  response.data.user.userId
                }  
                
                updateCookiesForLogin(user, response.data.token)
                navigate('/home')
            })
            .catch(error => {
                console.log("Error", error.response.data) 
                let errorText = error.response.data.message ? error.response.data.message : error 
                document.getElementById('formErrorMessage').innerText = errorText
            })
    }

    return ( 
<>
<h3>
   <center>Register</center>
</h3>
<div className="container" style={{width:'30rem'}}>
   <form action="/register" method="POST" onSubmit={(e) =>
      submitRegisterInfo(e)} id="registerForm">
      <div className="mb-3">
         <label htmlFor="username" className="form-label">Username</label>
         <input type="text" className="form-control" id="username" name="username" aria-describedby="username"></input> 
      </div>
      <div className="mb-3">
         <label htmlFor="email" className="form-label">Email address</label>
         <input type="email" className="form-control" id="email" name="email" aria-describedby="email" required></input>
         <div id="email" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
         <label htmlFor="password" className="form-label">Password</label>
         <input type="password" className="form-control" id="password" name="password" required></input>
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
   </form>
   <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
</div>
</>

  );
};

export default Register;