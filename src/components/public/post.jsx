import React, {useContext, useEffect} from 'react';
import {DataContext} from '../store/store';
import Posts from './posts';
import {withRouter} from 'react-router-dom';
import {FacebookShareButton,
        TwitterShareButton,
        WhatsappShareButton} from 'react-share';

const Post = (props) => {
    const { post, posts, fetchPosts, isLoading, fetchPost, loadMore} = useContext(DataContext);
    const {id} = props.match.params;

    useEffect(() => {
      let isCanceled = false;
      if(!isCanceled){
          fetchPost(`api/archive/posts/${id}/show`)
      }
        return () => {
            isCanceled = false;
        };
    }, [id, fetchPost])

    useEffect(() => {
        let isCanceled = false;
        if(!isCanceled){
            fetchPosts(`api/archive/posts`)
        }
          return () => {
              isCanceled = false;
          };
      },[fetchPosts])
   
   
    return(
        <>
             
           <div className="container-fluid body-margin">
           
           {isLoading ? (
            <div className="col-md-6 mx-auto text-center py-5">
                       <div className="d-flex justify-content-center">
                     <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                     </div>
                     </div>
             </div>
               )  : post !== undefined && (
               <div className="col">
              
               <div className="row">
               <div className="col-md-12">
               <span className="mx-1 date mt-1 mb-1">
                   <span className="w3-left ">{post.category}</span>
                   <span className="w3-right ">{new Date(post.updated_at).toDateString()}</span>
               </span>
               </div>
               </div>
               <div className="row">
               <div className="col-md-6 offset-md-1 mx-auto border">
               
               <div className="row">
               <div className="col-md-12">
               <div className="row">
                   <div className="col-md-12 mx-auto mt-2">
                      
                           <h4 className="post-title mx-2 d-block d-lg-none">{post.post_title}</h4>
                      
                           <h3 className="post-title mx-2 d-none d-lg-block">{post.post_title}</h3>
        
                   </div>
                 </div>
                <div className="row">
                   <div className="col-md-12  mx-auto">
                   <div className="card text-center mb-3 "> 
                   
                    <img className="card-img-top img-fluid img-card  d-block d-lg-none" src={post.post_img && post.post_img.thumb} alt={post.img_alt}/>
                   
                    <img className="card-img-top img-fluid img-card d-none d-lg-block" src={post.post_img && post.post_img.image} alt={post.img_alt}/>
                   
                      
                    </div>
                   </div>
                </div> 
                <div className="row">
                    <div className="col-md-12 mx-auto text-center">
                      <div className="img-alt">{post.img_alt}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-auto ">
                      <div className="post-content" dangerouslySetInnerHTML={{  __html: post.post_content}} />
                    </div>
                </div>
                <div className="row">
                    <p className="col-md-12 mx-auto"> <strong>Source: </strong> 
                    <a href={`https://${
                                    post.source && post.source.substr(post.source.indexOf(":") + 2, )}`
                        } className="w3-text-blue" target="_blank">{
                            post.source && post.source.substr(post.source.indexOf(":") + 2, )
                            }
                    </a>
                    </p>
                </div>

                <div className="row">
                    <div className="col-md-12 mx-auto my-3 text-center">
                       <FacebookShareButton url={window.location.href} className="facebook">
                       <i className="fab fa-facebook-square fa-2x"></i>
                       </FacebookShareButton>
                        <WhatsappShareButton url={window.location.href} className="whatsapp">
                        <i className="fab fa-whatsapp-square fa-2x"></i>
                        </WhatsappShareButton>
                        <TwitterShareButton url={window.location.href} className="twitter">
                        <i className="fab fa-twitter-square fa-2x"></i>
                        </TwitterShareButton>
                    </div>
                </div>
               </div>
               </div>
               </div>
               </div>
               <div className="row">
           <div className="col-md-6 mx-auto">
               {posts !== 'undefined' && (
                <p className="recent-posts text-center">
                        Trending stories
                </p>
               )}
           </div>     
        </div>
        <Posts results={posts}/>
        <div className="col-md-4 mx-auto text-center">
        <button className="btn w3-green" 
        onClick={() => loadMore('api/archive/posts')}> 
        More...
        </button>
        </div>
               </div>
               )}
            </div>
            
        </>
    )
}


export default withRouter(Post);

