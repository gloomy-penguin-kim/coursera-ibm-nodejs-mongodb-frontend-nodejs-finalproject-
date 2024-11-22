import React, { useState, useEffect } from 'react'; 
import axios from 'axios'
import './App.css'

import AxiosApi from './Axios'

import { useCookies } from 'react-cookie'
import { useNavigate, Link } from 'react-router-dom'; 

import Pagination from './Pagination'

 
const PostListWithPagination = ({ }) => {  
        
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();

    const [postItems, setPostItems] = useState([]);  
    const [displayItems,setDisplayItems] = useState([]);  
 
    const pageLimit = 3;   

    const headers = {
        'headers' : { 
            'Authorization': 'Bearer '+cookies.jsonwebtoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
            }
        }

    useEffect(() => { 
        console.log("this is when it fetches the data")
        axios.get(`http://localhost:3000/api/posts`, headers)
            .then((response) => {  
                console.log("init great", response.data); 
                setPostItems(response.data) 
                const arr = response.data.slice(0, pageLimit)  
                setDisplayItems(arr)  
            })
            .catch(error => {
                console.log("ERROR", error)
                document.getElementById('formErrorMessage').innerText = "Failed to fetch any data :(" 
            })
    }, [])    

    const handleItemDelete = (postId) => { 
        axios.delete(`http://localhost:3000/api/posts/`+postId, headers)
            .then((data) => {   
                const iitem = postItems.findIndex((obj) => obj.postId == postId)  
                let newPostItems = JSON.parse(JSON.stringify(postItems))  
                newPostItems.splice(iitem, 1) 
                setPostItems(newPostItems) 

                const iitemDisp = displayItems.findIndex((obj) => obj.postId == postId)  
                let newPostItemsDisplay = JSON.parse(JSON.stringify(displayItems))  
                newPostItemsDisplay.splice(iitemDisp, 1) 
                setDisplayItems(newPostItemsDisplay) 
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


    const handleOnPageChange = (pageNumber) => {   
        let start = (pageNumber - 1) * pageLimit; 
        const arr = postItems.slice(start, start + pageLimit) 
        setDisplayItems(arr)
    }
 
  return (
  <>  
    <div>
        <h3><center>Post List with Pagination</center></h3>
    </div>
<div className="product-grid">
   <div id="addons" style={{paddingTop: '20px'}} className="container_main">   
   <div>
      <div className="product-grid">
         <div className="product-list">
            {displayItems.map((item) => ( 
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
      <Pagination itemsPerPage="3" totalItems={postItems.length} onPageChange={handleOnPageChange}></Pagination>
      <div id="formErrorMessage" style={{paddingTop:'1rem',fontWeight:'bold'}}></div>
   </div>
</div>
</div>
</div>
</>
);
};

export default PostListWithPagination;