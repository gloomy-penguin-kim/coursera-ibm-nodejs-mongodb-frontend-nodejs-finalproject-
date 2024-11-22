import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
 
const Contact = () => {

    return (
        <>
            <h3>
            <center>Contact</center>
            </h3>
            <div className="container" style={{width:'30rem'}}>
                <p><center><Link to="mailto:gloomy.penguin.kim@gmail.com">gloomy.penguin.kim@gmail.com</Link></center></p>               
                
            </div> 
        </>
    );
}

export default Contact 