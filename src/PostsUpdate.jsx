import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useParams, useNavigate } from 'react-router-dom'; 


const PostsUpdate = ({  }) => {   
  
    const [ item, setItem ]  = useState({})
    const [ textareaOriginal, setTextareaOriginal ]  = useState({})
    const { postId } = useParams()
    const [ cookies, setCookie, removeCookie ] = useCookies(); 
    const navigate = useNavigate()

    const headers = {
        'headers' : { 
            'Authorization': 'Bearer '+cookies.jsonwebtoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        } 

    useEffect(() => {
        axios.get(`http://localhost:3000/api/posts/${postId}`, headers)
        .then(response => {  
            try {
                let temp = response.data.data
                setItem({
                    username: temp.username,
                    text: temp.text,
                    userId: temp.userId,
                    postId: temp.postId 
                }) 
                setTextareaOriginal(item.text)   
            }
            catch {
                document.getElementById('formErrorMessage').innerText = "Error loading the data"
            }
        })
        .catch(error => {
            console.log("Error", error)  
            document.getElementById('formErrorMessage').innerText = error
        })
    }, [])
 
    const submutUpdateInfo = (e) => {
        e.preventDefault()

        console.log("textareaOriginal", textareaOriginal)
        console.log("item.text", item.text)
        if (textareaOriginal == item.text) {  
            document.getElementById('formErrorMessage').innerText = "Please update the text"
            return  
        }

        document.getElementById('formErrorMessage').innerText = "" 

        axios.put(`http://localhost:3000/api/posts`, { 
            "postId": item.postId, 
            "text":  item.text
         }, headers)
            .then(response => { 
                console.log("response", response.data)  
                document.getElementById('formErrorMessage').innerText = response.data.message
                navigate('/posts/list/'+item.postId) 
            })
            .catch(error => {
                console.log("Error", error)  
                document.getElementById('formErrorMessage').innerText = error
            })
    }

    const textareaOnChange = (e) => {
        let temp = item 
        temp.text = e.target.value
        setItem(item)   
    }

    return ( 
<>
<h3>
   <center>Post Update</center>
</h3>
<div className="container" style={{width:'30rem'}}>
   <form action="/posts/update" method="POST" onSubmit={(e) => submutUpdateInfo(e)} id="postsUpdateForm"> 
      <div className="mb-3">
         <label htmlFor="username" className="form-label">Username</label>
         <input type="text" 
         className="form-control" 
         id="username" name="username" 
         aria-describedby="username" 
         disabled value={item.username}></input> 
      </div>
      <div className="mb-3">
         <label htmlFor="text" className="form-label">Enter Text</label>
         <textarea type="text" className="form-control"
         id="text" name="text" style={{height:'300px'}} required
         onChange={(e) => textareaOnChange(e)}
         defaultValue={item.text}></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
   </form>
   <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
</div>
</>

  );
};

export default PostsUpdate