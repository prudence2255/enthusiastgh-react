import {useState, useEffect} from 'react';
import Axios from 'axios';

const useAdmin = () => {
   const [response, setResponse] = useState([]);
   const [path, setPath] = useState(``);
   const [user, setUser] = useState({})
   const [category, setCategory] = useState([]);
   const [message, setMessage] = useState('');
   const [errors, setErrors] = useState([]);
   const [isItem, setIsItem] = useState(false);
   const [load, setLoading] = useState(false);
   const [totalPosts, setTotalPosts] = useState(40);
   const [currentPage, setCurrentPage] = useState(1);
   const API_URL = process.env.NODE_ENV === 'development' ? 
                                          'http://localhost:8000' : 
                                          'https://enthusiastgh.com';

 const headers = {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
          }
  //promise containing headers and token if logged in
   const fetchData = (options) => {
     
          if(loggedIn()) {
            headers['Authorization'] = `Bearer ${getToken()}`;
        }
        return Axios({
          ...options,
          headers,  
        });
       }

  //pagination
   const paginate = (pageNumber) => {
      fetchData({
         method: 'get',
         url: `/api/auth/posts?page=${pageNumber}`,
      }).then(res => {
         setTotalPosts(res.data.meta.total);
         setCurrentPage(pageNumber);
         if(Array.isArray(res.data.data)){
            setResponse(res.data.data);
         }
      }).catch(e => {
      })
   }

       const getToken = () => {
         return localStorage.getItem('token')
      }  

      const setToken = (token) => {
          localStorage.setItem('token', token)
      }
  
      const login = (path, value, history, redirect) => { 
            setLoading(true);
            fetchData({
               method: 'post',
               url: path,
               data: value
            }).then(res => {
               setToken(res.data.token);
               history.push(redirect);
               setLoading(false); 
            })
            .catch(e => {
   
               setLoading(false); 
            })        
     }

     //add or updating method
     const addOrUpdate = (method, path, value, history, redirect) => {
      setLoading(true);
      fetchData({
         method: method,
         url: path,
         data: value
      }).then(res => {
            if(method === 'put'){
               setResponse(res.data.data);
            }else if(method === 'post' && Array.isArray(response)){
               const data = res.data.data;
               setResponse([...response, data]);
            }
            history.push(redirect);
         setLoading(false)
      })
      .catch(e => {
            setLoading(false)
      })     
     }


     const addNewPosts = (path) => {
        setLoading(true);
        fetchData({
           method: 'get',
           url: path,
        }).then(res => {
           setMessage(res.data.message);
           setLoading(false);
        }).catch(e => {
           setLoading(false);
        })
       
     }
     //change password method
     const resetPassword = (method, path, value, url, history, redirect) => {
      setLoading(true);
      fetchData({
         method: method,
         url: path,
         data: value
      }).then(res => {
        setLoading(false)
      })
      .catch(e => {
            setLoading(false)
      })     
     }
     

     const getItem = (id) => {
        if(Array.isArray(response)){
           return response.find(item => item.id === id);
        }else{
           return response
        }
     }

     //delete an item
     const deleteItem = (path, id, history, redirect) => {
      fetchData({
         method: 'delete',
         url: path,
      }).then(res => {
            const data = response.filter(item => item.id !== id);
            setResponse(data);
         history.push(redirect);
      })
      .catch(e => {
      })     
     }

     //make user an admin
     const makeAdmin = (path, history, redirect, id) => {
      fetchData({
         method: 'put',
         url: path,
      }).then(res => {
       const data = [...response];
       const itemIndex = response.findIndex(item => item === getItem(id));
       const user = data[itemIndex];
         user.role = 'admin';
         setResponse(data);
         history.push(redirect);
      })
      .catch(e => {
      })  
     }

     //publish or unpublish a post
     const publishOrUnpublish = (path, history, redirect) => {
      fetchData({
         method: 'put',
         url: path,
      }).then(res => {
         history.push(redirect);
      })
      .catch(e => {
      })     
     }

     //check wether a user is logged in
     const loggedIn = () => {
        const token = getToken();
        return !!token;
     }
     
//log a user out
     const logout = (path, history, redirect) => {
        fetchData({
           method: 'get',
           url: path
        }).then(res => {
            localStorage.removeItem('token');
            history.push(redirect);
        }).catch(e => {
        }) 
     }
     
     //reset password when you forget your password
     const forgotPassword = (values, history, redirect) => {
      setLoading(true);
         Axios({
            method: 'post',
            url: '/api/auth/reset',
            data: values,
            headers: {...headers}
         }).then(res => {
            
               history.push(redirect);  
            setLoading(false)
         }).catch(e => {
           setLoading(false)
         })
     }
     
     //send email for password reset
     const sendMail = (values, history, redirect) => {
      setLoading(true);
      Axios({
         method: 'post',
         url: '/api/auth/forgotPassword',
         data: values,
         headers: {...headers}
      }).then(res => {
         setLoading(false)
      }).catch(e => {
         setLoading(false)
      })
  }

   return {
      response, 
      user, setUser,
      fetchData,loggedIn,
      login, logout,
      setPath,category,
      addOrUpdate, message,
      deleteItem, publishOrUnpublish,
      makeAdmin, isItem, setIsItem,
      resetPassword, setCategory,
      forgotPassword, sendMail, load,
      currentPage, totalPosts,
      paginate, errors,
      addNewPosts,
   }
   
}



 
export default useAdmin;