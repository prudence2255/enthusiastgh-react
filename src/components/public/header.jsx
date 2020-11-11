import React, {useContext} from 'react';
import Navbar from './navbar';

import {Link, withRouter} from  'react-router-dom';
import {FaBars} from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
     <>
        <div className="header w3-card">
        <div className="bread clearfix container-fluid">
         <button className="float-left navbar-toggle btn" onClick={toggleNavbar}>
          <FaBars size="25"/>
          </button>
          <button className="btn fav-icon"><Link to="/">
            <img src={`/fav-icon1.png`} className="img-fluid"/>
          </Link> </button>
        </div>
        </div>
      <Navbar isOpen={isOpen}/>
     </>
    )
}
export default withRouter(Header);