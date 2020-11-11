import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {DataContext} from '../store/store';
import Moment from 'react-moment';

const Posts = () => {
   const {results, loading } = useContext(DataContext);

   React.useEffect(() => {
     return () => {}
   }, [results])
    return(
        <>
        <div className="container-fluid py-3">
        
                  <div className="col-md-8 mx-auto mt-2">
                     <div className="row posts-box" >                  
                   {
                    
                     results !== undefined && (
                    results.slice(1).map((post, index) => {
                      return (
                        <div  className="col-md-4 col-sm-4" key={post.id}>
                          <div className="" >
                          <div className=" w3-card  my-2 home-post media-post d-block d-lg-none">
                          <div className="media">
                          <Link to={`/Archive/${post.id}/${post.title}`} >
                         <img className="mr-2 img-fluid" src={post?.post_img?.thumb} alt={post.img_alt}/>
                         </Link>
                         <div className="media-body">
                         <div className="p-1 ">
                       <Link to={`/Archive/${post.id}/${post.title}`} >
                           <h6 className="title">{post.short_title}</h6>
                         <span className="date">
                          <i className="far fa-clock"></i>  <Moment fromNow>{post.updated_at}</Moment>
                       </span>
                        </Link>
                         </div>
                        </div>
                         </div>
                       </div>
                    <div className=" mb-2 post-box d-none d-lg-block" >
                     <div className="card border w3-card posts-card">
                     <Link to={`/Archive/${post.id}/${post.title}`} >
                    <img className="card-img-top img-fluid" src={post?.post_img?.thumb} alt={post.img_alt}/>
                    </Link>
                   <div className="p-1 ">
                   <Link to={`/Archive/${post.id}/${post.title}`} >
                   <h6 className="title">{post.short_title}</h6>
                   <span className="date">
                    <i className="far fa-clock"></i> <Moment fromNow>{post.updated_at}</Moment>
                    </span>
                   </Link>
                   </div>
                  </div>
                   </div>  
                     </div>
                          
                        </div>
                      )
                    
                   })
                   )}

                  </div>
                  {loading && <div className="col md-4 mx-auto text-center">Loading...</div>}
                  </div>
           </div>
        </>
    )

}
export default Posts;