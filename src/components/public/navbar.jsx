import React, { useEffect, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {headers, API_URL } from '../store/store';
import { FiSearch } from 'react-icons/fi';
import Axios from 'axios';


const Navbar = ({ history, isOpen, setIsOpen }) => {
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  

  const search = (e) => {
    e.preventDefault();
   // fetchPosts(`api/archive/search?query=${query}`)
    history.push(`/posts/search`);
  }


  useEffect(() => { 
    const fetchCategories = async() => {
               try {
               const result = await Axios.get(`${API_URL}/api/archive/categories`, {
                   ...headers
               });
                setCategories(result.data.data);   
               } catch (e) {  
               }
           }
      fetchCategories()
    window.addEventListener('scroll', () => {
      if(window.innerWidth > 768){
        setIsOpen(false);
      }
    })
    return () => {
    };
  })

  return (
    <>
      <div>
        <ul className={`navigation navbar ${isOpen ? 'open' : ''}`}>
          {categories !== undefined && categories.map((category) => {
            return (
              <li className="nav-item category" key={category.id} onClick={() => setIsOpen(false)}>
                <NavLink to={`/categories/${category.id}/${category.slug}`} activeStyle={{
                  background: 'green',
                  padding: '7px 12px',
                }} style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold'
              }}>
                {category.name}
              </NavLink>
           </li>
            )
          })
          }
          <li className="search-li">
          <form className="search-form">
            <div className="input-group">
              <input type="text" className="form-control search-box" placeholder="Search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                required
              />
              <div className="input-group-append">
                <button className="btn btn-outline-primary search-btn " type="submit"
                  onClick={search} disabled={query === '' ? true : false}
                ><FiSearch /></button>
              </div>
            </div>
          </form>
        </li>
      </ul>
    </div>
  </>
)

   }


export default withRouter(Navbar)