import React, {useContext,useEffect} from 'react';
import {DataContext} from '../store/store';
import ReactAvatar from 'react-avatar';
import {withRouter} from 'react-router-dom';

const Users = ({history}) => {
    const {response, setPath, 
            message, deleteItem,
            makeAdmin} = useContext(DataContext);
            useEffect(() => {
                let isCanceled = false
                if(!isCanceled){
                    setPath(`/api/auth/users`);
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
                            <h4 className="text-center">Users</h4>
                        </div>
                        <div className="card-body">
                        {response !== undefined && Array.isArray(response) ?
                            (
                            <table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th>User image</th>
                                    <th>User name</th>
                                    <th>User Email</th>
                                    <th>Role</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                           
                             <tbody>
                            { response.map((user) => {
                               return (
                                <tr key={user.id}>
                                    <td>
                                        {user.user_img ? (
                                            <img src={user.user_img} className="img-fluid" alt="hi"
                                        width="60" height="50"
                                    />
                                        ) : (
                                            <ReactAvatar name={user.name} size="60"/>
                                        )}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                     <td>
                                     {user.role === 'admin' ? 'Admin' : 'Writer'}
                                     </td>
                                     <td>
                                        {user.role === 'writer' && (
                                            <button className="w3-btn w3-green"
                                            onClick={() => {
                                                makeAdmin(`/api/auth/make_admin/${user.id}`,
                                                history, '/admin/users', user.id,
                                                )
                                            }}
                                            >Make admin</button>
                                        )}
                                     </td>
                                     <td>
                                         <button className="w3-btn w3-red"
                                         onClick={() => {
                                             deleteItem(
                                             `/api/auth/delete/${user.id}`, user.id, history, `/admin/users`,
                                                );
                                                 }
                                                }
                                         >Delete</button>
                                     </td>
                                </tr>
                               )
                             })}
                             </tbody>   
                             </table>
                             ) : (<div className="spinner-border spinner-border-sm text-center" role="status"></div>)} 
                        </div>
                    </div>
                   </div>
                </div>
            </div>
        </>
     );
}
 
export default withRouter(Users);