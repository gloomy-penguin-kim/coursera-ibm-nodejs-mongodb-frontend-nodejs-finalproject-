import React from 'react'
import axios from "axios"
// import { useCookies } from 'react-cookie'

const AxiosApi = () => {
    //const [cookies, setCookie, removeCookie] = useCookies(); 

cookies = { jsonwebtoken: "hello" }
    console.log(document.cookie.split(';')) 
 
    const instance = axios.create({
    // .. where we make our configurations
        baseURL: 'https://api.example.com'
    });

 
    if (cookies.jsonwebtoken) {  
        instance.defaults.headers.common['Authorization'] = `Bearer ${cookies.jsonwebtoken}`
        instance.defaults.headers.post['Authorization'] = `Bearer ${cookies.jsonwebtoken}`
        instance.defaults.headers.get['Authorization'] = `Bearer ${cookies.jsonwebtoken}`
        
        instance.defaults.headers.common['Content-Type'] = 'application/json';
    
        instance.defaults.baseURL = process.env.API_URL || "http://localhost:3000"
    
        instance.interceptors.request.use(
            config => {
                config.headers['Authorization'] = `Bearer ${cookies.jsonwebtoken}`;
                    return config;
                },
                error => {
                    return Promise.reject(error);
                }
            ); 
    } 
}

export default AxiosApi 