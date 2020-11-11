import React, {useContext} from 'react';
import {DataContext} from '../store/store';
import {withRouter, Link} from 'react-router-dom';
import Posts from './posts';
import Moment from 'react-moment';



const Category = (props) => {
            const {id} = props.match.params;
    const { results, fetchResults, isLoading, status, loadMore} = useContext(DataContext);
    React.useEffect(() => {
      let isCanceled = false
      if(!isCanceled){
        fetchResults(`api/archive/category-posts/${id}`)
      }
      return () => {}
    }, [id])
    return (
        <>
        <div className="body-margin">
        {results !== 'undefined' && results.length === 0 && status === 'success' && (
            <div className="text-center col-md-8">There are no posts in this section</div>
            )}
        {isLoading ? (
                      <div className="col-md-12 mx-auto">
                        <div className="row">
                        <div className="col-md-6 mx-auto text-center py-5">
                       <div className="d-flex justify-content-center">
                       <div className="spinner-border" role="status"></div>
                      </div>
                       </div>
                        </div>
                      </div>
                   ) :
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6">
            { results !== undefined  && (
                results.slice(0, 1).map((post) => {
                    return (
                        <div key={post.id} className="category-tag">
                            {post.category}
                        </div>
                    )
                }
            ))}
            </div>
        </div>
      
        <div className="row">
        
                    { results !== undefined && (

                   results.slice(0, 1).map((post) => {
                     return (
                       <div className="col-md-8 mx-auto" key={post.id}>
                        <div className="w3-card first-post">
                       <Link to={`/Archive/${post.id}/${post.title}`} >
                     
                        <img className="img-fluid d-block d-lg-none" src={post.post_img?.thumb} alt={post.img_alt}/>
                     
                        <img className="img-fluid d-none d-lg-block" src={post.post_img?.image} alt={post.img_alt}/>
                     
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
                   
                ) )}
                    </div>
                    <Posts />
                    {
                      results !== 'undefined' && results.length > 0 &&
                      <div className="col-md-4 mx-auto text-center">
                  <button className="btn w3-green" 
                      onClick={() => loadMore(`api/archive/category-posts/${id}`)}> 
                    More...
                   </button>
                </div>
                    }
                    
                </div>
              }
        </div>
        </>
    )
}

export default withRouter(Category);