import { useState, useCallback} from "react";
import Axios from 'axios';

  const useFrontend = () => {
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({});
  const [error, setError] = useState(false)
  const [status, setStatus] = useState()
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
 
  const API_URL = process.env.NODE_ENV === 'development' ? 
                'http://localhost:8000' : 'https://enthusiastgh.com';
                
//headers

  

  
 
    const fetchPost = useCallback(
      async(path) => {
        const headers = {
          Accept: 'application/json',
         "Content-Type": 'application/json'
        }
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
         }
        
             
      },
      [API_URL],
    )
  
    const fetchPosts = useCallback(
      async(path) => {
        const headers = {
          Accept: 'application/json',
         "Content-Type": 'application/json'
        }
          setStatus('idle')
          setIsLoading(true);
         try {
         const  results = await Axios.get(`${API_URL}/${path}`, {
             ...headers
         });
         setStatus('success')
         setIsLoading(false);
          setPosts(results.data.data);
         } catch (e) {  
           setError(true)
         }
        
             
      },
      [API_URL],
    )
    const fetchResults = useCallback(
      async(path) => {
        const headers = {
          Accept: 'application/json',
         "Content-Type": 'application/json'
        }
          setStatus('idle')
          setIsLoading(true);
         try {
         const  results = await Axios.get(`${API_URL}/${path}`, {
             ...headers
         });
         setStatus('success')
         setIsLoading(false);
          setResults(results.data.data);
         } catch (e) {  
           setError(true)
         }
        
             
      },
      [API_URL])
    
      const fetchCategories = useCallback(
        async(path) => {
          const headers = {
            Accept: 'application/json',
           "Content-Type": 'application/json'
          }
            setStatus('idle')
            setIsLoading(true);
           try {
           const  results = await Axios.get(`${API_URL}/${path}`, {
               ...headers
           });
           setStatus('success')
           setIsLoading(false);
            setCategories(results.data.data);
           } catch (e) {  
             setError(true)
           }
          
               
        },
        [API_URL])
        
         const loadMore = async(path) => {
          const headers = {
            Accept: 'application/json',
           "Content-Type": 'application/json'
          }
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
          setPosts([...posts, ...result.data.data]);
          setLoading(false)
          } catch (e) {  
            console.log(e)
            setError(true)
            setLoading(false)
          }
         
              }
         


    return {
      posts, fetchPosts,
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