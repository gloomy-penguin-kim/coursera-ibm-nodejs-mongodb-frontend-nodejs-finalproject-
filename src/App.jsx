import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import NoMatch from './NoMatch'
import Layout from './Layout'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import PostsCreate from './PostsCreate'
import PostsList from "./PostsList"
import PostsListWithPagination from './PostsListWithPagination'
import PostsUpdate from "./PostsUpdate"
import PostsOne from './PostsOne'
import PrivateRoute from './PrivateRoute' 

function App() { 
   
  return (
    <> 
      <BrowserRouter> 
        <Routes> 
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />

            <Route element={<PrivateRoute />}> 
              <Route path="posts/new" element={<PostsCreate />} />
              <Route path="posts/list" element={<PostsList />} />
              <Route path="posts/pagination" element={<PostsListWithPagination />} />
              <Route path="posts/update/:postId" element={<PostsUpdate />} />
              <Route path="posts/list/:postId" element={<PostsOne />} /> 
              <Route path="*" element={<NoMatch />} /> 
            </Route> 

            <Route path="about" element={<About />} /> 
            <Route path="contact" element={<Contact />} /> 

            <Route path="logout" element={<Logout />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  );
} 


export default App;



