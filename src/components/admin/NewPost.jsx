import React, {useState, useContext, useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {withRouter} from 'react-router-dom';
import Editor from './editor/Editor';
import {DataContext} from '../store/store';

const NewPost = ({history, match}) => {
    const {category, fetchData, errors, 
            addOrUpdate, 
             setPath, response, load,
            isItem, setIsItem, setCategory} = useContext(DataContext);
                  
    const [post_content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(""); 
       useEffect(() => {
           let isCanceled = false;
         if(!isCanceled){
            fetchData({
                method: 'get',
                url: `/api/auth/categories`,
             }).then(res => {
               if(!isCanceled){
                setCategory(res.data.data);
               }
             }).catch(e => {
               if(!isCanceled){
               }
             })
         }  
       if(!isCanceled){ 
        if(match.params.id){
            const id = match.params.id;
            setPath(`/api/auth/posts/${id}`);
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
    const onEditorChange = (value) => {
            setContent(value)
    }
   
    const onFilesChange = (file) => {
        setFiles(file)
    }
    const handleFile = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('post_img', file);
        fetchData({
            method: 'post',
            url: `/api/auth/posts/image`,
            data: formData
        }).then(res => {
            setImage(res.data.data);
            alert('upload successful');
        }).catch(e => {
            alert(e.message, 'Failed to upload image');
        });
    }
   
    return ( 
        <>
         <div className="container-fluid">
         <div>
        <Formik
             initialValues={{ post_title: '',
                             img_alt: '',
                              category_id: 1,                      
                             source: '',
                             description: '',
                             }}
             validationSchema={Yup.object({
             post_title: Yup.string()
                .required(),
            img_alt: Yup.string()
                    .required(),
            category_id: Yup.number()
                        .required(), 
            tags: Yup.number(), 
            source: Yup.string()
                    .required(), 
            description: Yup.string()
                        .required(),                                                 
      })}
      onSubmit={(values, {setSubmitting }) => {
          let upload;
          let post_img;
          if(image === "" && response.post_img){
            const images = Object.values(response.post_img);
            post_img = images.join("|");
          }else{
            post_img = image.join("|");
          }
         if(files.length > 0){
             upload = files.join("|");
         }
            if(post_content === ""){
                setError(true);
                return
            }
            const value = {...values, post_content, upload, post_img};
          if(isItem){
            const id = match.params.id;
            addOrUpdate('put', `/api/auth/posts/${id}`, 
                        value, history, `/admin/posts`
                         )
          }else{
            addOrUpdate('post', `/api/auth/posts`, 
                        value, history, `/admin/posts`
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
                    <h4 className="text-center">{ isItem ? 'Edit post': 'Add post'}</h4>
                </div>
                <div className="card-body">
                 {Array.isArray(errors) && errors !== undefined && 
                    errors.map((error, index) => <div key={index} className="error">{error}</div>)
                }
                <form onSubmit={formik.handleSubmit} className="post-form" encType="multipart/form-data">
                <div className="form-group">
                {isItem && (
                   <div>
                   <p className="edit">Post title</p>
                   {response.post_title}
                   </div>
                )}
                <label htmlFor="post_title">Post title</label>
                <input id="post_title" {...formik.getFieldProps('post_title')} type="text" 
                 className="form-control" name="post_title" />
                 {formik.touched.post_title && formik.errors.post_title ? (
                 <div className="error">{formik.errors.post_title}</div>
                 ) : null}
             </div>
             <div className="form-group">
             {isItem && (
                   <div>
                   <p  className="edit">Post Image</p>
                   <img src={isItem && response.post_img ? response.post_img.image : ''} className="im-fluid"
                    width="100px" height="60px"
                    />
                   </div>
                )}
                <label htmlFor="post_img">Post Image</label>
             <input id="post_img" type="file" accept="image/*" onChange={(e)=>handleFile(e)} 
                 className="form-control" name="post_img" required={!isItem ? true : false}/>
              </div>
            <div className="form-group">
            {isItem && (
                   <div>
                   <p className="edit">Image alt</p>
                   {response.img_alt}
                   </div>
                )}
                <label htmlFor="img_alt">Image alt</label>
             <input id="img_alt" {...formik.getFieldProps('img_alt')} type="text" 
             className="form-control" name="img_alt"/>
             {formik.touched.img_alt && formik.errors.img_alt ? (
            <div className="error">{formik.errors.img_alt}</div>
            ) : null}
            </div>
            <div className="form-group">
            {isItem && (
                   <div>
                   <p className="edit">Description</p>
                   {response.description}
                   </div>
                )}
                <label htmlFor="description">Description</label>
             <input id="description" {...formik.getFieldProps('description')} type="text" 
             className="form-control" name="description"/>
             {formik.touched.description && formik.errors.description ? (
            <div className="error">{formik.errors.description}</div>
            ) : null}
            </div>
            <div className="form-group">
                {isItem && (
                   <div>
                   <p className="edit">Post content</p>
                   <div dangerouslySetInnerHTML={{__html: response.post_content}}/>
                   </div>
                )}
             <label htmlFor="post_content">Post content</label>
            <Editor 
                 onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />
            <div className="error">{error && 'Content is required'}</div>
        </div>
        <div className="form-group">
        {isItem && (
                   <div>
                   <p className="edit">Category</p>
                   {response.category && response.category.name}
                   </div>
                )}
                <label htmlFor="category_id">Category</label>
             <select id="category_id" {...formik.getFieldProps('category_id')} type="text" 
             className="form-control" name="category_id">
                <option></option>
                {category !== undefined && Array.isArray(category) && 
                 category.map(cat => (
                     <option value={cat.id} key={cat.id}
                     >{cat.name}</option>
                 ))  
                }
             </select>
             {formik.touched.category_id && formik.errors.category_id ? (
            <div className="error">{formik.errors.category_id}</div>
            ) : null}
            </div>
            <div className="form-group">
            {isItem && (
                   <div>
                   <p className="edit">Source</p>
                   {response.source}
                   </div>
                )}
                <label htmlFor="source">Source</label>
             <input id="source" {...formik.getFieldProps('source')} type="text" 
             className="form-control" name="source"/>
             {formik.touched.source && formik.errors.source ? (
            <div className="error">{formik.errors.source}</div>
            ) : null}
            </div>
         <div className="form-group">
         {isItem && (
            <a href={response.url} className="btn btn-default w3-yellow" target="_blank">Link</a>
         )}
         <button type="submit" className="w3-btn w3-green w3-right">{ isItem ? 'Update post': 'Add post'}</button>
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
            </div>
        </>
     );
}
 
export default withRouter(NewPost);