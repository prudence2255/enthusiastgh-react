import React, {useContext, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {DataContext} from '../store/store';

const AdminHeader = ({history}) => {
    window.addEventListener('resize', function(e){
        if(e.target.innerWidth < 768){
          setUserName(true);
        }else{
            setUserName(false);
        };
       })
    
    const {user, logout,
         fetchData, setUser, setUserName, userName} = useContext(DataContext);
    useEffect(() => {
        let isCanceled = false
        fetchData({
           method: 'get',
           url: `/api/auth/user`,
        }).then(res => {
          if(!isCanceled){
            setUser(res.data.data);
          }
        })
        return () => { 
            isCanceled = false;    
        };
     }, [])
    return ( 
        <>
        <div className="admin-header clearfix">
             <button className="btn admin-btn" ><i className="fa fa-bars fa-2x text-white"></i>
             </button>
            <button className="btn">
                <Link className="nav-link" to="/" target="_blank">Visit site</Link>
            </button>
            <button className="dashboard-link btn">
                <Link className="nav-link" to="/admin" title="dashboard">
                <i className="fa fa-tachometer-alt"></i> {userName ? null : 'Dashboard'} 
                </Link>
            </button>
            <span className="dropdown w3-right btn">
            <span className="btn btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-user"></i> {userName ? null : typeof user === 'object' && user.name}
             </span>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link className="dropdown-item" to={`/admin/users/${user.id}/profile`}>
            Your Profile
            </Link>
            <button className="dropdown-item btn" onClick={() => {
            logout(
                `/api/auth/logout`,
                history, `/admin/dev`)}
            }>Logout</button>
            </div>
        </span>
        </div>
        </>
     );
}
 
export default withRouter(AdminHeader);