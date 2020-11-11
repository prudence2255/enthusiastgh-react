import React, {useContext, useEffect} from 'react';
import {DataContext} from '../store/store';
import { Link, withRouter } from 'react-router-dom';

const Categories = ({history}) => {
    const {response, setPath, message,
            deleteItem,  } = useContext(DataContext);
    useEffect(() => {
        let isCanceled = false
        if(!isCanceled){
            setPath(`/api/auth/categories`);
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
                            <h4 className="text-center">Categories</h4>
                        </div>
                        <div className="card-body">
                        {response !== undefined && Array.isArray(response) ?
                            (
                            <table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th>Category name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                           
                             <tbody>
                            { response.map((category) => {
                               return (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button className="w3-btn w3-red"
                                        onClick={() => {
                                            deleteItem(`/api/auth/categories/${category.id}`,
                                            category.id, history, `/admin/categories`,
                                            )
                                        }}
                                        >Delete</button>
                                    </td>
                                     <td><Link to={`/admin/categories/${category.id}/edit`} className="nav-link w3-btn w3-yellow">Edit</Link></td>
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
 
export default withRouter(Categories);