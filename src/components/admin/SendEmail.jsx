import React, {useContext, useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {Link, withRouter} from 'react-router-dom';

const SendEmail = ({history}) => {
    const {sendMail, message, load} = useContext(DataContext);
    return ( 
        <>
     <div className="user-login">
            <Formik
      initialValues={{ email: ''}}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, {setSubmitting }) => {
        sendMail(values, history, `/admin/dev`);
          setSubmitting(false); 
      }}
    >
      {(formik) => {
          return (
        <form onSubmit={formik.handleSubmit} className="w3-card login-form">
        <div className="site-domain">
            <h4 className="text-center text-uppercase">Enthusiastgh</h4>
        </div>
        <div className="form-group">
        <label htmlFor="email">Enter your email</label>
          <input id="email" {...formik.getFieldProps('email')} type="email" 
          className="form-control" name="email"/>
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green">Send email</button>
         </div>
         <div className="text-center">{load && (
          <div className="spinner-border spinner-border-sm text-center" role="status"></div>
         )}</div>
         <div className="error">{message && (<p className="error">{message}</p>)}</div>
        </form>
      )}}
    </Formik>
            </div>
        </>
     );
}
 
export default withRouter(SendEmail);