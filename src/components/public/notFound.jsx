import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => (
   <>
    <div className="row body-margin">
        <div className="col-md-6 mx-auto text-center">
            <p>Not found: the page you are looking for does not exist</p>
            <Link className="nav-link w3-text-blue" to="/">Go to home page</Link>
        </div>
    </div>
   </>
)

export default NotFound;