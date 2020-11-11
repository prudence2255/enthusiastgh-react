import React, {useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {withRouter} from 'react-router-dom';

const PasswordReset = ({history}) => {

    const { load, message,
            resetPassword,} = useContext(DataContext);
  
    return ( 
        <>
             <div className="password-reset">
            <Formik
      initialValues={{cur_password: '',new_password: '', 
                    c_password: '',
                    }}
      validationSchema={Yup.object({
        cur_password: Yup.string()
                 .required('Required')
                .min(8, 'Must be 8 characters or above'),
      new_password: Yup.string()
                 .required('Required')
                .min(8, 'Must be 8 characters or above'),
     c_password: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref("new_password"), null], "Password did not match"),
      
      })}
      onSubmit={(values, {setSubmitting }) => {
        resetPassword('put', `/api/auth/updatePassword`, 
                        values, `/api/auth/logout`, history, `/admin/dev`
                         )               
          setSubmitting(false); 
      }}
    >
      {(formik) => {
          return (
            <div className="col-md-12 mx-auto">
             <div className="card">
                <div className="card-header">
                    <h4 className="text-center">Reset password</h4>
                </div>
                <div className="card-body">
                <form onSubmit={formik.handleSubmit} className="post-form" encType="multipart/form-data">
                <div className="form-group">
                <label htmlFor="cur_password">Old password</label>
                <input id="cur_password" {...formik.getFieldProps('cur_password')} type="password" 
                 className="form-control" name="cur_password" />
                 {formik.touched.cur_password && formik.errors.cur_password ? (
                 <div className="error">{formik.errors.cur_password}</div>
                 ) : null}
             </div>
             <div className="form-group">
                <label htmlFor="new_password">New password</label>
                <input id="new_password" {...formik.getFieldProps('new_password')} type="password" 
                 className="form-control" name="new_password" />
                 {formik.touched.new_password && formik.errors.new_password ? (
                 <div className="error">{formik.errors.new_password}</div>
                 ) : null}
             </div>
             <div className="form-group">
                <label htmlFor="c_password">Confirm new password</label>
                <input id="c_password" {...formik.getFieldProps('c_password')} type="password" 
                 className="form-control" name="c_password" />
                 {formik.touched.c_password && formik.errors.c_password ? (
                 <div className="error">{formik.errors.c_password}</div>
                 ) : null}
             </div>
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green w3-right">Reset</button>
         </div>
         <div className="text-center">{load && (
          <div className="spinner-border spinner-border-sm text-center" role="status"></div>
         )}</div>
         {message && (<p className="error">{message}</p>)}
        </form>
         </div>
         </div>
         </div>     
      )}}
    </Formik>
            </div>
        </>
     );
}
 
export default withRouter(PasswordReset);
