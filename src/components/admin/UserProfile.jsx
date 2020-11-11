import React, {useContext, useEffect} from 'react';
import ReactAvatar from 'react-avatar';
import {DataContext} from '../store/store';
import {withRouter, Link} from 'react-router-dom';

const UserProfile = ({match}) => {
    const {setPath, response, message} = useContext(DataContext);
    const id = match.params.id;
        useEffect(() => {
            let isCanceled = false;
            if(!isCanceled){
                setPath(`/api/auth/show_user/${id}`)
            }
            return () => {
                isCanceled = true;
            }
        },[])
    return ( 
        <>
         <div className="container-fluid">
                <div className="row">
                 <div className="col-md-12 mx-auto">
                 {message && 
                    (
                 <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message} 
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">x</span>
                </button>
                </div>
                )
                 }
                   <div className="card ">
                        <div className="card-header">
                            <h4 className="text-center">Your profile</h4>
                        </div>
                        <div className="card-body">
                        {response !== undefined && typeof response === 'object' ?
                            (
                                <div>
                                    <div>
                                      {response.user_img ? (
                                        <img src={response.user_img} className="img-fluid" width="200px"
                                            height="150px"
                                        />
                                      ) : (
                                          <ReactAvatar name={response.name} size="150"/>
                                      )}
                                    </div>
                                    <p> <span className="text-bold">Name: </span> {response.name}</p>
                                    <p> <span className="text-bold">Email: </span> {response.email}</p>
                                    <p> <span className="text-bold">About: </span> {response.about}</p>
                                    <div>
                                        <Link to={`/admin/users/${response.id}/edit`} className="nav-link w3-btn w3-yellow">Edit</Link>
                                        <Link to={`/admin/users/reset`} className="nav-link w3-btn w3-green ml-2">Reset password</Link>
                                    </div>
                                </div>
                             ) : (<div className="spinner-border spinner-border-sm text-center" role="status"></div>)}  
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </>
     );
}
 
export default withRouter(UserProfile);