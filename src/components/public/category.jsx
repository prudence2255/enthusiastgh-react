import React, {useState} from 'react';
import {API_URL, headers} from '../store/store';
import useFrontend from '../store/frontend';
import {withRouter, Link} from 'react-router-dom';
import Posts from './posts';
import Moment from 'react-moment';
import Axios from 'axios';



const Category = (props) => {
     const [posts, setPosts] = useState([]);
     const [status, setStatus] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {id} = props.match.params;
    const {loadMore, loading, results} = useFrontend();
  const data = [...results, ...posts];
    React.useEffect(() => {
      const fetchPosts = async() => {
          setStatus(null)
            setIsLoading(true);
                 try {
                 const result = await Axios.get(`${API_URL}/api/archive/category-posts/${id}`, {
                     ...headers
                 });
                  setPosts(result.data.data);
                  setStatus('success')
                  setIsLoading(false)
                 } catch (e) {  
                   setIsLoading(false);
                 }
                     }
        fetchPosts()
      return () => {}
    }, [id])

    React.useEffect(() => {
      return () => {}
    }, [posts])
    return (
        <>
        <div className="body-margin">
        {posts !== 'undefined' && posts.length === 0 && status === 'success' && (
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
            { posts !== 'undefined'  && (
                posts.slice(0, 1).map((post) => {
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
        
                    { posts !== 'undefined' && (

                   posts.slice(0, 1).map((post) => {
                     return (
                       <div className="col-md-8 mx-auto" key={post.id} data-aos="fade-up">
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
                    <Posts results={data} loading={loading}/>
                    {
                      posts !== 'undefined' && posts.length > 1 &&
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