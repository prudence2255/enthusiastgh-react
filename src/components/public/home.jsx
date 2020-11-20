import React, {useEffect, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
import {DataContext} from '../store/store';


const Home = () => {
  const {fetchResults,
     results, isLoading, status,
    } = useContext(DataContext);
    useEffect(() => {
      let isCanceled = false; 
      if(!isCanceled){
        fetchResults('api/archive/home');
      }
     return () => {
       isCanceled = true;
     };
     },[fetchResults]);
    return (
       <>
          <div className="container-fluid body-margin">
          <div >
           
           </div>
          <div className="row">
          <div className="col-md-8">
          {results !== 'undefined' && results.length === 0 && status === 'success' && (
            <div className="text-center">There are no posts in this section</div>
          )}
          {
              isLoading ? (
                       <div className="col-md-6 mx-auto text-center py-5">
                       <div className="d-flex justify-content-center">
                     <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                     </div>
                     </div>
                       </div>
                   ) :
             results.map((item) => {
               
               return(
                 <div className="col-md-12 offset-md-1" key={item.id}>
                    <div className="row my-2">
                          <h5 className="p-1 text-center category-name">{item.name}</h5>
                    </div>
                    <div className="row">
                   { 

                   item.posts?.slice(0, 1).map((post) => {
                     return (
                       <div className="col-md-12 mx-auto" key={post.id}>
                        <div className="w3-white first-post">
                       <Link to={`/Archive/${post.id}/${post.title}`} >
                     
                      <img className="img-fluid d-block d-lg-none" src={post.post_img.thumb} alt={post.img_alt}/>
                    
                      <img className="img-fluid d-none d-lg-block" src={post.post_img.image} alt={post.img_alt}/>
                      </Link>
                      <div className="p-1 meta">
                       <Link to={`/Archive/${post.id}/${post.title}`} >
                      <h6 className="title">{post.short_title}</h6>
                       <span className="date">
                      <i className="far fa-clock"></i>  <Moment fromNow>{post.updated_at}</Moment>
                       </span>
                      </Link>
                       </div>
                     </div>
                       </div>

                     )
                   }
                   
                  ) }
                    </div>
                    <div className="row home-posts">
                    <div className="col-md-12 mx-auto">
                    <div className="row">
                    { 
                      item.posts?.slice(1).map((post) => {
                       return (
                          <div className="col-md-4 col-sm-4" key={post.id}>
                          <div className=" w3-white d-block d-lg-none  my-3 home-post media-post"  key={post.id}>
                          <div className="media">
                          <Link to={`/Archive/${post.id}/${post.title}`} >
                         <img className="mr- img-fluid" src={post.post_img.thumb} alt={post.img_alt}/>
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


                      <div className=" my-3 home-post d-none d-lg-block"  >
                     <div className="card border w3-white home-card">
                     <Link to={`/Archive/${post.id}/${post.title}`} >
                     <img className="card-img-top img-fluid" src={post.post_img.thumb} alt={post.img_alt}/>
                     </Link>
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
                 
                       )
                     }
                   )
                   }
                   </div>
                   </div>
                    </div>
                   {item.posts?.length > 0 && (
                    <div className="row">
                    <div className="col-md-12 text-right pt-1 mx-auto mt-1 mb-2">
                      <Link to={`/categories/${item.id}/${item.slug}`} className="text-right read-more">
                      more...
                      </Link>
                    </div>
                </div>
                   )}
               
                 </div>
               )
             })
            }
          </div>
          </div>
                
          </div>
       </>
    )
}
export default withRouter(Home);