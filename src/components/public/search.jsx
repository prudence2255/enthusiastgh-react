import React, {useContext} from 'react';
import Posts from './posts';
import {DataContext} from '../store/store';


const Search = () => {
    const {posts, status, isLoading} = useContext(DataContext);
    React.useEffect(() => {
        return () => {}
    }, [posts])

    React.useEffect(() => {
        return () => {}
    }, [status])
    return (
        <>
       <div className="body-margin">
       {isLoading && (
            <div className="col-md-6 mx-auto text-center py-5">
                       <div className="d-flex justify-content-center">
                     <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                     </div>
                     </div>
             </div>)
             }
       {posts !== 'undefined' && posts.length === 0 && status === 'success' && (
            <div className="text-center col-md-8">There are no posts for your search</div>
            )}
       <Posts results={posts}/>
       </div>
        </>
    )
}


export default Search;