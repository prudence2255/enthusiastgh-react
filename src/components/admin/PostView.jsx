import React, {useContext, useEffect} from 'react';
import {DataContext} from '../store/store';
import {Link, withRouter} from 'react-router-dom';
const PostView = ({history, match}) => {

    const id = match.params.id;
    const {response, setPath, deleteItem,
            publishOrUnpublish} = useContext(DataContext);
      useEffect(() => {
          let isCanceled = false
          if(!isCanceled){
            setPath(`/api/auth/posts/${id}`);
          }
          return () => {
              isCanceled = true;
          }
      },[])
    return ( 
        <>
            <div className="container-fluid">
            {response !== undefined && Object.keys(response.length > 0) ? (
                <div className="col-md-10">
               <div className="row">
                   <div className="col-md-12 mx-auto">
                       <h3 className="post-title mx-2">{response.post_title}</h3>
                   </div>
                 </div>
                <div className="row">
                   <div className="col-md-12 mx-auto">
                   <div className="card text-center mb-3 "> 
                       <img className="card-img-top img-fluid img-card" src={response.post_img && response.post_img.image} alt={response.img_alt}/>
                    </div>
                   </div>
                </div> 
                <div className="row">
                    <div className="col-md-12 mx-auto py-3">
                    <div dangerouslySetInnerHTML={{__html: response.post_content}}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mx-auto">
                        <div className="w3-right">
                            <Link className="nav-link w3-btn w3-green m-1" to={`/admin/posts/${response.id}/edit`}>
                                 Edit
                            </Link>
                            <button className="w3-btn w3-yellow m-1"
                            onClick={() => {
                                response.published === 1 ? publishOrUnpublish(
                                    `/api/auth/posts/${response.id}/unpublish`, history, `/admin/posts`
                                ) : publishOrUnpublish(
                                    `/api/auth/posts/${response.id}/publish`, history, `/admin/posts`
                                )
                            }}
                            >
                            {response.published === 0 ? 'Publish' : 'Unpublish'}
                            </button>
                            <button className="w3-btn bg-danger m-1" onClick={() => deleteItem(
                               `/api/auth/posts/${response.id}`, response.id, history, `/admin/posts`,  
                            )}>
                            Delete
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            ) : (
                <div className="spinner-border spinner-border-sm text-center" role="status"></div>
            )}
                
            </div> 

        </>
     );
}
 
export default withRouter(PostView);