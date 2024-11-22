import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { useCookies } from 'react-cookie'
 

const PostsCreate = ({  }) => {    
 
    const [cookies, setCookie, removeCookie] = useCookies();  
    const [textarea, setTextarea] = useState(); 

    const textareaOnChange = (e) => {
        setTextarea(e.target.value)
    }

    const submitPostsCreate = (e) => {
        e.preventDefault()
        document.getElementById('formErrorMessage').innerText = "" 

        const headers = {
            'headers' : { 
                'Authorization': 'Bearer '+cookies.jsonwebtoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
                }
            } 

        axios.post(`http://localhost:3000/api/posts`, {
                        text: textarea,
                        userId: cookies.user.userId 
                 }, headers)
            .then(response => { 
                console.log("response", response.data)  
                document.getElementById('formErrorMessage').innerText = response.data.message  
                window.location.replace("/posts/list")
            })
            .catch(error => {
                console.log("Error", error)  
                document.getElementById('formErrorMessage').innerText = error
            })
    }

    return ( 
<>
<h3>
   <center>New Post</center>
</h3>
<div className="container" style={{width:'30rem'}}>
   <form action="/posts/new" method="POST" onSubmit={(e) => submitPostsCreate(e)} id="postsCreateForm"> 
      <div className="mb-3">
         <label htmlFor="username" className="form-label">Username</label>
         <input type="text" 
         className="form-control" 
         id="username" name="username" 
         aria-describedby="username" 
         disabled value={cookies.user.username}></input> 
      </div>
      <div className="mb-3">
         <label htmlFor="text" className="form-label">Enter Text</label>
         <textarea type="text" 
         onChange={(e) => textareaOnChange(e)}
         className="form-control" 
         id="textareaNewPost" 
         name="text" style={{height:'300px'}} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
   </form>
   <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
</div>
</>

  );
};

export default PostsCreate