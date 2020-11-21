import useAdmin from './admin';
import useFrontend from './frontend';
import React from 'react';
export const DataContext = React.createContext({});

export const headers = { Accept: 'application/json',
                      "Content-Type": 'application/json'}

export const API_URL = process.env.NODE_ENV === 'development' ? 
                  'http://localhost:8000' : 'https://enthusiastgh.com';

  const Store = (props) => {
  const admin = useAdmin();
  const frontend = useFrontend(); 
     
    const value = {
        ...admin,
        ...frontend,
        API_URL
    };
  
   
  return(
    <DataContext.Provider value={{...value}}>
    {props.children}
    </DataContext.Provider>
  )
  
}
 

export default Store