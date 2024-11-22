import React from 'react'; 
import { Link } from 'react-router-dom'; 
import IsLoggedIn from './IsLoggedIn'
import { CookiesProvider, useCookies } from 'react-cookie'
 
const Home = () => {   
    const [cookies, setCookie, removeCookie] = useCookies();

    return ( 
        
        <div className="container"> 
            {cookies.jsonwebtoken ? (<h3>Welcome, {cookies.user.username}!</h3>) : (<h3>Please log in.</h3>)}
            
            <br/>

            
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum felis quis lacus dapibus facilisis. Aenean sollicitudin porta convallis. In tristique erat in metus aliquet, vitae aliquam lectus euismod. Nam sed eros nisi. Curabitur dictum id tellus eget fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec pharetra dui vitae arcu maximus, id vulputate nibh vestibulum. Aliquam enim nulla, bibendum sed posuere aliquet, interdum sit amet risus. Ut egestas libero nec eros tempus, vel pretium augue molestie. Aliquam eu sagittis diam. Aliquam enim lectus, dictum eu hendrerit et, finibus in augue. Aenean massa leo, efficitur vitae mauris in, pellentesque bibendum sem. Nunc dapibus tortor eu interdum varius. Phasellus sodales turpis laoreet, lacinia est gravida, eleifend urna. Pellentesque hendrerit quam sollicitudin ante viverra tincidunt. Donec vulputate nisl leo, eget sollicitudin mauris maximus in. </p>
            
            {cookies.jsonwebtoken && (
                <p><b>Please use the links above to post new content and look at posts</b></p>
            )}
        </div>
    );
}

export default Home 