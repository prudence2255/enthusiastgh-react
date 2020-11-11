import React, {useContext, useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {Link, withRouter} from 'react-router-dom';

const Login = ({history}) => {
    const {login,
          loggedIn, message,
          load, errors, } = useContext(DataContext);
    useEffect(() => {
     if(loggedIn()){
       history.replace('/admin');
     }
      return () => {
        
      };
    }, [])
    return ( 
        <>
     <div className="user-login">
            <Formik
      initialValues={{ password: '', email: '', remember_me: false }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 characters or above'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, {setSubmitting }) => {
        login(`/api/auth/login`, values, history, `/admin`);
          setSubmitting(false); 
      }}
    >
      {(formik) => {
          return (
        <form onSubmit={formik.handleSubmit} className="w3-card login-form">
        {message && 
                    (
                 <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message} 
                 <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">x</span>
                </button>
                </div>
                )
                 }
        <div className="site-domain">
            <h4 className="text-center text-uppercase">Enthusiastgh</h4>
        </div>
        <div className="form-group">
        <label htmlFor="email">Email Address</label>
          <input id="email" {...formik.getFieldProps('email')} type="email" 
          className="form-control" name="email"/>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
        <label htmlFor="password">Password</label>
          <input id="password" {...formik.getFieldProps('password')} type="password"
              className="form-control" name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
         <div className="form-group form-check">
         <input type="checkbox" className="form-check-input" id="remember_me" name="remember_me"
             {...formik.getFieldProps('remember_me')}
         />
         <label className="form-check-label" htmlFor="remember_me">Remember me</label>
        </div>
        <Link className="nav-link btn btn-default" to="/admin/send-email">Forgot password?</Link>
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green">Login</button>
         </div>
         <div className="text-center">{load && (
          <div className="spinner-border spinner-border-sm text-center" role="status"></div>
         )}</div>
       
         {Array.isArray(errors) && errors !== undefined && 
            errors.map((error, index) => <div key={index} className="error">{error}</div>)
         }
        </form>
      )}}
    </Formik>
            </div>
        </>
     );
}
 
export default withRouter(Login);