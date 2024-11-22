import React, { useState, useEffect } from 'react'; 
import axios from 'axios'
import './App.css'

import AxiosApi from './Axios'

import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'; 
 

 
const PostList = ({ }) => {  
        
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const [postItems,  setPostItems]  = useState([]);  
    const [pageNumber, setPageNumber] = useState(0); 
    const [totalPages, setTotalPages] = useState(0); 
    const [pageLimit,  setPageLimit]  = useState(3);   

    const headers = {
        'headers' : { 
            'Authorization': 'Bearer '+cookies.jsonwebtoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        }

    useEffect(() => { 
        console.log("this is when it fetches the data")
        axios.get(`http://localhost:3000/api/posts?page=1&limit=${pageLimit}`, headers)
            .then((response) => { 
                console.log("Post List response", response.data)
                setPostItems(response.data.data) 
                setPageNumber(2)
                setTotalPages(response.totalPages)
            })
            .catch(error => {
                console.log("ERROR", error)
                document.getElementById('formErrorMessage').innerText = "Failed to fetch any data :("
                document.getElementById('loadMorePostsBtn').disabled = true 
            })
    }, [])    

    const handleItemDelete = (postId) => { 
        axios.delete(`http://localhost:3000/api/posts/`+postId, headers)
            .then((data) => {  
                console.log("handleItemDelete",data)

                const iitem = postItems.findIndex((obj) => obj.postId == postId)  
                let newPostItems = JSON.parse(JSON.stringify(postItems))  
                newPostItems.splice(iitem, 1) 
                setPostItems(newPostItems) 
            })
            .catch(error => {
                console.log("ERROR", error)
            }) 
    }

    const handleItemUpdate = (item) => {
        navigate("/posts/update/" + item.postId) 
    }

    const handleLoadMorePosts = () => {  
        axios.get(`http://localhost:3000/api/posts?page=${pageNumber}&limit=${pageLimit}`, headers)
            .then((data) => {  
                document.getElementById('formErrorMessage').innerText = ""
                setPageNumber(pageNumber + 1)
                setTotalPages(data.data.totalPages)  
                let newPostItems = postItems.concat(data.data.data) 
                setPostItems(newPostItems)
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }
 
  return (
  <>  
    <div>
        <h3><center>Post List</center></h3>
    </div> 
<div className="product-grid">
   <div id="addons" style={{paddingTop: '20px'}} className="container_main">   
   <div>
      <div className="product-grid">
         <div className="product-list">
            {postItems.map((item) => ( 
            <div className="product-card card" key={item.postId}>
               <div className="card-header" style={{backgroundColor: '' }}>
                  <div style={{textAlign:'left', fontWeight: item.userId == cookies.user.userId ?'bolder':''}}>{item.username}</div>
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
         ))
         }   
      </div>
      <button id="loadMorePostsBtn" onClick={() => handleLoadMorePosts()} disabled={pageNumber > totalPages ? true:false}>Load More Posts</button>
      <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
   </div>
</div>
</div>
</div>
</>
);
};

export default PostList;