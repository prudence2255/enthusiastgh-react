import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import {DataContext} from '../store/store';

const Dashboard = () => {
  const {response, loggedIn} = useContext(DataContext);
    return ( 
        <>
       
          <div className="container-fluid">
          <div className="row mx-auto">
            <div className="breadcrumb w-100">
                <h3 className="w-100 text-center">Dashboard</h3>
            </div>
          </div>
               <div className="row ">
                 <div className="col-md-8 mt-3 mx-auto">
                    <div className="card">
                      <div className="card-header w3-green">
                        <h4 className="text-center text-uppercase">Posts</h4>
                      </div>
                      <div className="card-body py-5">
                          <Link to="/admin/posts" className="w3-left">
                          View posts  <i className="fa fa-arrow-circle-right"></i>
                          </Link>
                          <span className="w3-badge w3-right">10</span>
                      </div>
                    </div>
                 </div>
                 </div>
                 <div className="row">
                 <div className="col-md-8 mt-3 mx-auto">
                    <div className="card">
                      <div className="card-header w3-yellow">
                        <h4 className="text-center text-uppercase">Categories</h4>
                      </div>
                      <div className="card-body py-5">
                          <Link to="/admin/categories" className="w3-left">
                          View categories <i className="fa fa-arrow-circle-right"></i>
                          </Link>
                          <span className="w3-badge w3-right">10</span>
                      </div>
                    </div>
                 </div>
                 </div>
                 <div className="row">
                 <div className="col-md-8 mt-3 mx-auto">
                    <div className="card">
                      <div className="card-header w3-blue">
                        <h4 className="text-center text-uppercase">Tags</h4>
                      </div>
                      <div className="card-body py-5">
                          <Link to="/admin" className="w3-left">
                          View tags <i className="fa fa-arrow-circle-right"></i> 
                          </Link>
                          <span className="w3-badge w3-right">10</span>
                      </div>
                    </div>
                 </div>
               </div>
          </div>
       
        </>
     );
}
 

export default Dashboard;