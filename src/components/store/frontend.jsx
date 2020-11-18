import { useState} from "react";
import Axios from 'axios';

  const useFrontend = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({});
  const [error, setError] = useState(false)
  const [status, setStatus] = useState('idle')
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
 
  const API_URL = process.env.NODE_ENV === 'development' ? 
                'http://localhost:8000' : 'https://enthusiastgh.com';
//headers

  const headers = {
      Accept: 'application/json',
     "Content-Type": 'application/json'
    }

  const fetchResults = async(path) => {
     setStatus('idle')
    setIsLoading(true);
     try {
     const  result = await Axios.get(`${API_URL}/${path}`, {
         ...headers
     });
      setResults(result.data.data);
      setIsLoading(false);
      setStatus('success')
     } catch (e) {  
       setError(true)
      setIsLoading(false);
     }
    
         }
    

    const fetchCategories = async(path) => {
      setStatus('idle')
           try {
           const  results = await Axios.get(`${API_URL}/${path}`, {
               ...headers
           });
             setCategories(results.data.data);
           } catch (e) {  
             setError(true)
           }
          
               }
 
    const fetchPost = async(path) => {
      setStatus('idle')
      setIsLoading(true);
     try {
     const  results = await Axios.get(`${API_URL}/${path}`, {
         ...headers
     });
     setStatus('success')
     setIsLoading(false);
      setPost(results.data.data);
     } catch (e) {  
       setError(true)
      setIsLoading(false);
     }
    
         }
  
    
     
         const loadMore = async(path) => {
           if(!hasMore) return
           if(loading) return
           setPage(page + 1)
           setLoading(true)
          try {
          const  result = await Axios.get(`${API_URL}/${path}?page=${page}`, {
              ...headers
          });
          if(page === result.data.meta.last_page){
            setHasMore(false);
          }
          setResults([...results, ...result.data.data]);
          setLoading(false)
          } catch (e) {  
            console.log(e)
            setError(true)
            setLoading(false)
          }
         
              }
         



    return {
        fetchResults,
        results, setResults,
        isLoading,
        categories, fetchCategories,
        post, fetchPost,
        error, 
        status, loadMore, 
        loading, 
    };
  
   
  
  
}
 

export default useFrontend