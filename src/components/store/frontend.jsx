import { useState} from "react";
import Axios from 'axios';

  const useFrontend = () => {
  const [hasMore, setHasMore] = useState(true)
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
   const headers = { Accept: 'application/json',
                 "Content-Type": 'application/json'}

 const API_URL = process.env.NODE_ENV === 'development' ? 
              'http://localhost:8000' : 'https://enthusiastgh.com';
 


     
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
          console.log('hi')
          setLoading(false)
          } catch (e) {  
            console.log(e)
            setLoading(false)
          }
         
              }
         


    return {
       results,  loadMore, 
        loading, 
    };
  
   
  
  
}
 

export default useFrontend