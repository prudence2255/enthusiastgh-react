import React from 'react';
import {Link} from 'react-router-dom';


const Footer = () => {
    return (
        <div>
          <div className="footer">
            <div className="row m-1">
              <div className="col-md-3  mx-auto mt-2">
                <Link to="/about">About Us</Link>
                <p>Contact Us <a href="mailto:enthusiastgh@gmail.com">@enthusiastgh.com</a></p>
               <Link to="/privacy">Privacy</Link>
              </div>
              <div className="col-md-3 mx-auto">
              <h5>Social Media</h5>
              <hr />
                <p>
                  <a href="https://www.facebook.com/enthusiastgh" className="m-1" target="_blank">
                    <i className="fab fa-facebook-square " aria-hidden="true"></i>  Facebook 
                  </a>
                  <a href="https://www.youtube.com/channel/UC9VXv1Inaz4quQal8Pc4-aQ?view_as=subscriber" className="m-1"
                  target="_blank">
                    <i className="fab fa-youtube-square  " aria-hidden="true"></i>  YouTube
                  </a>
                </p>
                <p>
                <a href="#" className="m-1">
                     <i className="fab fa-instagram  " aria-hidden="true"></i>  Instagram
                  </a>
                  <a href="#" className="m-1">
                    <i className="fab fa-twitter-square  " aria-hidden="true"></i>  Twitter 
                  </a>
                </p>
              </div>
              <div className="col-md-6 mt-5">
              <span className="w3-right">
                 Copyright<i className="fa fa-copyright" aria-hidden="true"></i>
                {new Date().getFullYear()}  Enthusiastgh. All rights reserved
             </span>
              </div>
            </div>
          </div>
        </div>
    )
}


export default Footer;