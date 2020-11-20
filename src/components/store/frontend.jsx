import { useState, useCallback, useMemo} from "react";
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
 
 

const API_URL = useMemo(() =>  process.env.NODE_ENV === 'development' ? 
                            'http://localhost:8000' : 'https://enthusiastgh.com', [])
 
const headers = useMemo(() => ({ Accept: 'application/json',
                    "Content-Type": 'application/json'}), [])

  const fetchResults = useCallback(async(path) => {
    setIsLoading(true);
     setStatus('idle')
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
         }, [API_URL, headers]);




const fetchPosts = useCallback(async(path) => {
          setIsLoading(true);
           setStatus('idle')
           try {
           const  result = await Axios.get(`${API_URL}/${path}`, {
               ...headers
           });
            setPosts(result.data.data);
            setIsLoading(false);
            setStatus('success')
      
           } catch (e) {  
             setError(true)
             setIsLoading(false);
           }
               }, [API_URL, headers]);

               
       const fetchPost = useCallback(async(path) => {
               setIsLoading(true);
                 setStatus('idle')
                 try {
                 const  result = await Axios.get(`${API_URL}/${path}`, {
                     ...headers
                 });
                  setPost(result.data.data);
                  setIsLoading(false);
                  setStatus('success')
            
                 } catch (e) {  
                   setError(true)
                   setIsLoading(false);
                 }
                     }, [API_URL, headers]);

    const fetchCategories = useCallback(async(path) => {
                    
                       try {
                       const  result = await Axios.get(`${API_URL}/${path}`, {
                           ...headers
                       });
                        setCategories(result.data.data);
                    
                  
                       } catch (e) {  
                         setError(true)
                       }
                           }, [API_URL, headers])                     
                     




  
  
    
     
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