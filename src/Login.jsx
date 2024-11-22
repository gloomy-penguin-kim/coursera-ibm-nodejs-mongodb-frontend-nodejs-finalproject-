import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { updateUser, clearUser, setIsLoggedIn } from './StoreItems';
import IsLoggedIn from './IsLoggedIn'  
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom';

const Login = ({  }) => {   
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const updateCookiesForLogin = (user,token) => { 
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate()+1); 
        
        setCookie("user", user, { expires: expirationDate, path: '/' })
        setCookie("isLoggedIn", true, { expires: expirationDate, path: '/' });  
        setCookie("jsonwebtoken", token, { expires: expirationDate, path: '/' })

        console.log("coookies ", cookies.jsonwebtoken) 
    }
    

    const submitLoginInfo = (e) => {
        e.preventDefault()
        document.getElementById('formErrorMessage').innerText = ""

        const myForm = document.getElementById("loginForm")
        const formData = new FormData(myForm)
        const bodyReq = Object.fromEntries(formData) 

        axios.post(`http://localhost:3000/api/login`, { 
                "method": "POST",
                "data"  : bodyReq, 
                "headers": { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => { 
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
                console.log("Error", error)  
                document.getElementById('formErrorMessage').innerText = error
            })
    }

    return ( 
<>
<h3>
   <center>Login</center>
</h3>
{!cookies.jsonwebtoken ?  (
<div className="container" style={{width:'30rem'}}>
   <form action="/register" method="POST" onSubmit={(e) => submitLoginInfo(e)} id="loginForm">
      <div className="mb-3">
         <label htmlFor="username" className="form-label">Username</label>
         <input type="text" className="form-control" id="username" name="username" aria-describedby="username" required></input> 
      </div> 
      <div className="mb-3">
         <label htmlFor="password" className="form-label">Password</label>
         <input type="password" className="form-control" id="password" name="password" required></input>
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
   </form>
   <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
</div>
) : ( 
    <div className="container" style={{width:'30rem'}}>
    <h5>You're already logged in, <Link to="/posts/list">go to Posts!</Link></h5>
    </div>
)}
</>

  );
};

export default Login;