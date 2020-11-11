import React, {useState, useContext, useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {withRouter} from 'react-router-dom';

const NewUser = ({history, match}) => {
    const [userImg, setUserImg] = useState("");

    const {response, 
            addOrUpdate, fetchData, 
            setPath, load, errors,
             isItem, setIsItem} = useContext(DataContext);

             useEffect(() => {
                 let isCanceled = false;
               if(!isCanceled){
                if(match.params.id){
                    const id = match.params.id;
                    setPath(`/api/auth/show_user/${id}`);
                    if(response !== undefined && Object.keys(response.length > 0)){
                        setIsItem(true);
                    }
                }
                if(!match.params.id){
                    setIsItem(false);
                }
               }
             return () => {
                isCanceled = true;
             }   
            },[])
    const handleFile = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('user_img', file);
        fetchData({
            method: 'post',
            url: `/api/auth/users/image`,
            data: formData
        }).then(res => {
            setUserImg(res.data.url);
            alert('upload successful',);
        }).catch(e => {
            alert(e.message, 'Failed to upload image');
        });
    }
    return ( 
        <>
             <div className="user-reg">
            <Formik
      initialValues={{name: '', password: '', 
                    c_password: '', email: '', 
                    about: '' }}
      validationSchema={Yup.object({
         name: Yup.string()
                .required(), 
       password: !isItem && Yup.string()
                 .required()
                .min(8, 'Must be 8 characters or above'),
     c_password: !isItem && Yup.string()
                    .required()
                    .oneOf([Yup.ref("password"), null], "Password did not match"),
        email: Yup.string()
             .email('Invalid email address')
            .required(),
        about: Yup.string(),
      })}
      onSubmit={(values, {setSubmitting }) => {
          let user_img;
          if(userImg === "" && isItem){
             user_img = response.user_img;
          }else{
              user_img = userImg;
          }
        if(isItem){
            const {name, about, email} = values
            addOrUpdate('put', `/api/auth/update_user`, 
                        {name, about, email, user_img}, history, `/admin/users/${response.id}/profile`
                         )
          }else{
            addOrUpdate('post', `/api/auth/register`, 
                        {...values, user_img}, history, `/admin/users`
                         )
          }
          setSubmitting(false); 
      }}
    >
      {(formik) => {
          return (
            <div className="col-md-12 mx-auto">
             <div className="card">
                <div className="card-header">
                    <h4 className="text-center">{ isItem ? 'Edit profile': 'Add user'}</h4>
                </div>
                <div className="card-body">
                {Array.isArray(errors) && errors !== undefined && 
                errors.map((error, index) => <div key={index} className="error">{error}</div>)
             }
                <form onSubmit={formik.handleSubmit} className="post-form" encType="multipart/form-data">
                <div className="form-group">
                {isItem && (
                   <div>
                   <p className="edit">Name</p>
                   {response.name}
                   </div>
                )}
                <label htmlFor="name">Name</label>
                <input id="name" {...formik.getFieldProps('name')} type="text" 
                 className="form-control" name="name" />
                 {formik.touched.name && formik.errors.name ? (
                 <div className="error">{formik.errors.name}</div>
                 ) : null}
             </div>
             <div className="form-group">
                {isItem && (
                   <div>
                   <p className="edit">Email</p>
                   {response.email}
                   </div>
                )}
                <label htmlFor="email">Email</label>
                <input id="email" {...formik.getFieldProps('email')} type="email" 
                 className="form-control" name="email" />
                 {formik.touched.email && formik.errors.email ? (
                 <div className="error">{formik.errors.email}</div>
                 ) : null}
             </div>
             <div className="form-group">
             {isItem && response.user_img && (
                   <div>
                   <p  className="edit">User Image</p>
                   <img src={isItem && response.user_img ? response.user_img : ''} className="im-fluid"
                    width="100px" height="60px"
                    />
                   </div>
                )}
                <label htmlFor="user_img">User image</label>
             <input id="user_img" type="file" accept="image/*" onChange={(e)=>handleFile(e)} 
                 className="form-control" name="user_img" />
              </div>
              <div className="form-group">
                {isItem && (
                   <div>
                   <p className="edit">about</p>
                   {response.about}
                   </div>
                )}
                <label htmlFor="about">About</label>
                <textarea id="about" {...formik.getFieldProps('about')} type="text" 
                 className="form-control" name="about" />
                 {formik.touched.about && formik.errors.about ? (
                 <div className="error">{formik.errors.about}</div>
                 ) : null}
             </div>
            {!isItem && (
               <div>
               <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" {...formik.getFieldProps('password')} type="password" 
                 className="form-control" name="password" />
                 {formik.touched.password && formik.errors.password ? (
                 <div className="error">{formik.errors.password}</div>
                 ) : null}
             </div>
             <div className="form-group">
                <label htmlFor="c_password">Confirm password</label>
                <input id="c_password" {...formik.getFieldProps('c_password')} type="password" 
                 className="form-control" name="c_password" />
                 {formik.touched.c_password && formik.errors.c_password ? (
                 <div className="error">{formik.errors.c_password}</div>
                 ) : null}
             </div>   
               </div>
            )}   
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green w3-right">{ isItem ? 'Update profile': 'Add user'}</button>
         </div>
         <div className="text-center">{load && (
          <div className="spinner-border spinner-border-sm text-center" role="status"></div>
         )}</div>
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
 
export default withRouter(NewUser);