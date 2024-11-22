import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'; 
 
function PrivateRoute({  }) {
    const [cookies, setCookie, removeCookie] = useCookies()
    const navigate = useNavigate() 

    let isAuthenticated = cookies.jsonwebtoken ? true : false; 
    console.log("isAuthenticated", isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

// export default PrivateRoute;
// import React from 'react'
// import {useSelector} from "react-redux"
// import {Navigate, useLocation} from "react-router-dom"

// const ProtectedRoute = ({children}) => {
//     const user = useSelector((state) => state.user);
//     let location = useLocation();

//     if(!user.state.isAuthenticated) {
//         return <Navigate to="/login" state={{ from: location}} replace />
//     }
//  return children

// };

export default PrivateRoute;
