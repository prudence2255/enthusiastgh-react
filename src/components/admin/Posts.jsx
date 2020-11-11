import React, {useContext, useEffect} from 'react';
import {DataContext} from '../store/store';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Moment from 'react-moment';
const Posts = () => {
    const {response, setPath,
         message, currentPage,
         paginate, totalPosts,
         addNewPosts, load,
                } = useContext(DataContext);
    useEffect(() => {
        let isCanceled = false
        if(!isCanceled){
            setPath(`/api/auth/posts`);
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
                            <h4 className="text-center">POSTS</h4>
                        </div>
                        <div className="card-body">
                        {load && (<div className="spinner-border spinner-border-sm text-center" role="status"></div>)}
                        <button className="w3-btn w3-green  m-1" onClick={() => addNewPosts('/api/auth/main')}>
                        General news
                        </button>  
                        <button className="w3-btn w3-blue  m-1" onClick={() => addNewPosts('/api/auth/entertain')}>
                        General news
                        </button>
                        <button className="w3-btn w3-yellow  m-1" onClick={() => addNewPosts('/api/auth/entertainment')}>
                        Entertainment
                        </button>  
                        <button className="w3-btn w3-green  m-1" onClick={() => addNewPosts('/api/auth/sports')}>
                         sports
                        </button>
                        {response !== undefined && Array.isArray(response) ?
                            (
                            <table className="table table-responsive table-bordered">
                            <thead>
                                <tr>
                                    <th>Post image</th>
                                    <th>Post title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                           
                           
                             <tbody>
                            { response.map((post) => {
                               return (
                                <tr key={post.id}>
                                    <td><img src={post.post_img ? post.post_img.thumb : null} className="img-fluid" alt={post.img_alt}
                                        width="60" height="50"
                                    /></td>
                                    <td>{post.post_title}</td>
                                    <td><Moment fromNow>{post.updated_at}</Moment></td>
                                    <td>{
                                        post.published === 0 ? (<span className=" bg-warning p-1">unpublished</span>) 
                                        : (<span className="bg-success p-1 text-white">published</span>)
                                    }</td>
                                     <td><Link to={`/admin/posts/${post.id}/view`} className="nav-link w3-btn w3-green">view</Link></td>
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
                <div className="row">
                    <div className="col-md-8 mx-auto text-center mt-5">
                        <Pagination 
                            itemClass="page-item"
                            activeClass="page-item active"
                            linkClass="page-link"
                            activePage={currentPage}
                            totalItemsCount={totalPosts}
                            onChange={paginate}
                            pageRangeDisplayed={5}
                            itemsCountPerPage={10}
                        />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Posts;