import React, {useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import Index from './components/public/index';
import Store from './components/store/store';
import {BrowserRouter as Router} from 'react-router-dom';
import 'moment-timezone';
import ReactGa from 'react-ga';
import {DataContext} from './components/store/store';
import './styles/w3.css';
import './styles/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();


function App() {
  const {url} = useContext(DataContext);

    useEffect(() => {
      ReactGa.initialize('UA-157383685-1');
      ReactGa.pageview(window.location.pathname + window.location.search);
      return () => {
      }
    },[url]);
   return (
     <Router>
         <Store>
          <Index />
        </Store> 
     </Router>  
   )
}

export default App;

if (document.getElementById('app')) {
  ReactDOM.render(
    <React.StrictMode>
  <App />
  </React.StrictMode>,
   document.getElementById('app'));
}
