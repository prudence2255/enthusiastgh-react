import React, {useContext} from 'react';
import Posts from './posts';
import {DataContext} from '../store/store';


const Search = () => {
    const {results, status, isLoading} = useContext(DataContext);
    React.useEffect(() => {
        return () => {}
    }, [results])
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
       {results !== 'undefined' && results.length === 0 && status === 'success' && (
            <div className="text-center col-md-8">There are no posts for your search</div>
            )}
       <Posts />
       </div>
        </>
    )
}


export default Search;