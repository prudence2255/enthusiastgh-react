import React, {useContext, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {DataContext} from '../store/store';
import {withRouter} from 'react-router-dom';

const NewCategory = ({history, match}) => {

    const {response, 
            addOrUpdate, setPath,
            isItem, setIsItem,
            load, errors } = useContext(DataContext);

             useEffect(() => {
                 let isCanceled = false;
               if(!isCanceled){
                if(match.params.id){
                    const id = match.params.id;
                    setPath(`/api/auth/categories/${id}`);
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

    return ( 
        <>
             <div className="categories">
            <Formik
      initialValues={{name: '' }}
      validationSchema={Yup.object({
         name: Yup.string()
                .required('Required'), 
      })}
      onSubmit={(values, {setSubmitting }) => {
        
        if(isItem){
            addOrUpdate('put', `/api/auth/categories/${response.id}`, 
                        values, history, `/admin/categories`
                         )
          }else{
            addOrUpdate('post', `/api/auth/categories`, 
                        values, history, `/admin/categories`
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
                    <h4 className="text-center">{ isItem ? 'Edit Category': 'Add Category'}</h4>
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
                 className="form-control" name="name"/>
                 {formik.touched.name && formik.errors.name ? (
                 <div className="error">{formik.errors.name}</div>
                 ) : null}
             </div>
             
         <div className="form-group">
         <button type="submit" className="w3-btn w3-green w3-right">{ isItem ? 'Update category': 'Add category'}</button>
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
 
export default withRouter(NewCategory);