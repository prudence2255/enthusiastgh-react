import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {DataContext} from '../store/store';


const Navigation = () => {
    const {user} = useContext(DataContext);
  
    return ( 
        <>
        <div className={`navigate }`}>
            <div>
                <h4>Posts</h4>
                <ul>
                    <li className="nav-item" >
                       <Link className="nav-link" to="/admin/posts">
                       <i className="fa fa-money-bill text-white"></i> View posts
                       </Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin/posts/create">
                        <i className="fa fa-plus-circle text-white"></i> Add post
                        </Link>
                    </li>
                </ul>
                <h4>Categories</h4>
                <ul>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin/categories">
                        <i className="fa fa-calculator text-white"></i> View categories
                        </Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin/categories/create">
                        <i className="fa fa-plus-circle text-white"></i> Add category
                        </Link>
                    </li>
                </ul>
               {user.role === 'admin' && (
                <div>
                <h4>Users</h4>
                <ul>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin/users">
                        <i className="fa fa-users text-white"></i> View users
                        </Link>
                    </li>
                    <li className="nav-item" >
                        <Link className="nav-link" to="/admin/users/create">
                        <i className="fa fa-plus-circle text-white"></i> Add user
                        </Link>
                    </li>
                </ul>
                </div>
               )}
            </div>
        </div>
        </>
     );
}
 
export default Navigation;