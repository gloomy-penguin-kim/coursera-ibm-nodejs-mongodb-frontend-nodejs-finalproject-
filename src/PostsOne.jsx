import React, { useState, useEffect } from 'react'; 
import axios from 'axios'
import './App.css'
import { useCookies } from 'react-cookie'
import { useParams, useNavigate } from 'react-router-dom'; 

 
const PostList = ({ }) => {  
    
    const [item,  setItem]  = useState({})
    const [cookies, setCookie, removeCookie] = useCookies()
    const {postId} = useParams() 
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

    const handleItemDelete = (postId) => { 
        axios.delete(`http://localhost:3000/api/posts/`+postId, headers)
            .then((data) => {  
                console.log("data",data)  
                navigate('/posts/list')
            })
            .catch(error => {
                console.log("ERROR", error)
                document.getElementById('formErrorMessage').innerText = error
            }) 
    }

    const handleItemUpdate = (item) => {
        navigate('/posts/update/' + item.postId)
    } 

  return (
  <>  
    <div>
        <h3><center>Post One</center></h3>
    </div>
<div className="product-grid">
   <div id="addons" style={{paddingTop: '20px'}} className="container_main">   
   <div>
      <div className="product-grid">
         <div className="product-list"> 
            <div className="product-card card" key={item.postId}>
               <div className="card-header">
                  <div style={{textAlign:'left'}}>{item.username}</div>
               </div>
               <div className="item-text" style={{textAlign:'left', padding:'0rem 1rem', height:"150px", overflow: "auto"}}>{item.text}
            </div>
            <div className="" style={{fontSize:'12px'}}>{item.time}</div>
            <div className="addons_btn">
               <button onClick={(e) => handleItemUpdate(item)} 
               title="You can't update them if you didn't post them!" 
               disabled={cookies.user.userId == item.userId?false:true}>Update Item</button>
               <span style={{width:'20px'}}></span>
               <button onClick={() => handleItemDelete(item.postId)} 
               title="You can't delete them if you didn't post them!" 
               disabled={cookies.user.userId == item.userId?false:true}>Delete Item</button>
            </div>
         </div> 
      </div>
      <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
   </div>
</div>
</div>
</div>
</>
);
};

export default PostList;

// http://localhost:5174/posts/list/673f06bba815dfd4b69fc771