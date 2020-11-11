import React, {useEffect, useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {DataContext} from '../store/store';
import {FiSearch} from 'react-icons/fi';


const Navbar = ({history, isOpen}) => {
const [query, setQuery] = useState('');
    const {fetchResults,
     fetchCategories, categories} = useContext(DataContext);

    const search = (e) => {
      e.preventDefault();
      fetchResults(`api/archive/search?query=${query}`)
      history.push(`/posts/search`);  
    }

  const navigate = (id, slug) => {
    history.push(`/categories/${id}/${slug}`);
  }
  useEffect(() => {
    let isCanceled = false;
   if(!isCanceled){
    fetchCategories('api/archive/categories');
   }
    return () => {
    isCanceled = true;
    };
  },[])

   return( 
   <>
   <div>
      <ul className={`navigation navbar ${isOpen ? 'open' : ''}`}>
        {categories !== undefined && categories.map((category) => {
            return(
              <li className="nav-item category" key={category.id}>
             <button className="nav-link text-white text-uppercase btn" 
             onClick={() => navigate(category.id, category.slug)}>
             {category.name}
             </button>  
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
         onClick={search} disabled={query === ''? true : false}
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