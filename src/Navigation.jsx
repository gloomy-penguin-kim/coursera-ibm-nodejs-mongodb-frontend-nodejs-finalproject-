
import LoginRegisterLogout from './LoginRegisterLogout';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
  
 

const Navigation = () => {
    const [cookies, setCookie, removeCookie] = useCookies();

    return ( 
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width:'100%'}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Final Project: NodeJS & JWT</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
        </li>
        {cookies.isLoggedIn ? (
        <li className="nav-item">
          <Link className="nav-link" to="/posts/new">New Post</Link>
        </li>
        ) : <></>}
        {cookies.isLoggedIn ? (
        <li className="nav-item">
          <Link className="nav-link" to="/posts/list" >Posts List</Link>
        </li>
        ) : <></>}
        {cookies.isLoggedIn ? (
        <li className="nav-item">
          <Link className="nav-link" to="/posts/pagination" >Posts List With Pagination</Link>
        </li>
        ) : <></>}
        {/* <li className="nav-item" style={{color:'white', width:'600px'}}>{cookies.jsonwebtoken ? cookies.jsonwebtoken + " " +  cookies.user.username: "no not logged in"}</li> */}
      </ul> 
      <LoginRegisterLogout></LoginRegisterLogout>
    </div>
) : <></>
  </div>
</nav>  




    );
  };
  
  export default Navigation 