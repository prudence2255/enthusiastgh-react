import React, {useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {withRouter} from 'react-router-dom';

const ForgotPassword = ({history}) => {
    const {forgotPassword,message, load,
           errors} = useContext(DataContext);
    return ( 
        <>
     <div className="user-login">
            <Formik
      initialValues={{ password: '', c_password: '', token: '', email: ''  }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required('Required')
          .min(8, 'Must be 8 characters or above'),
          c_password: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref("password"), null], "Password did not match"),
          token: Yup.string()
                    .required('Required'),
          email: Yup.string()
                 .email('Invalid email address')
                  .required('Required'),
      })}
      onSubmit={(values, {setSubmitting }) => {
          forgotPassword(values, history, `/admin/dev`);
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
        <div className="form-group">
        <label htmlFor="c_password">Confirm password</label>
          <input id="c_password" {...formik.getFieldProps('c_password')} type="password"
              className="form-control" name="c_password"
          />
          {formik.touched.c_password && formik.errors.c_password ? (
            <div className="error">{formik.errors.c_password}</div>
          ) : null}
        </div>
        <div className="form-group">
        <label htmlFor="token">Token</label>
          <input id="token" {...formik.getFieldProps('token')} type="token"
              className="form-control" name="token"
          />
          {formik.touched.token && formik.errors.token ? (
            <div className="error">{formik.errors.token}</div>
          ) : null}
        </div>
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green">Reset</button>
         </div>
         <div className="text-center">{load && (
          <div className="spinner-border spinner-border-sm text-center" role="status"></div>
         )}</div>
    
         {Array.isArray(errors) && errors !== undefined && 
            errors.map((error, index) => <div key={index} className="error">{error}</div>)
         }
         <div className="error">{message && (<p>{message}</p>)}</div>
        </form>
      )}}
    </Formik>
            </div>
        </>
     );
}
 
export default withRouter(ForgotPassword);