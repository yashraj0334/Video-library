import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export function EditVideo()
{

    let params = useParams();
    let navigate = useNavigate();

    const[videos,setVideos] = useState([{VideoId:0, Title:'', Url:'',Description:'',Likes: 0 ,Dislike: 0 ,Views: 0 ,CategoryId: 0 }]);
    const[categories,setCategories] = useState([{CategoryId:0 , CategoryName:''}]);

    function LoadVideos()
    {
        axios.get(`http://127.0.0.1:3030/get-video/${params.id}`)
        .then(response =>{
            setVideos(response.data)
        })
    }

    function LoadCategories()
    {
        axios.get("http://127.0.0.1:3030/get-categories")
        .then(response => {
            response.data.unshift({CategoryId:-1,CategoryName:'Select Category'})
            setCategories(response.data)
        })
    }
    useEffect(()=>{
        LoadVideos();
        LoadCategories();
    },[])

    const formik = useFormik({
        initialValues:({VideoId:videos[0].VideoId, Title:videos[0].Title, Url:videos[0].Url , Description:videos[0].Description , Likes: videos[0].Likes ,Dislike: videos[0].Dislike ,Views: videos[0].Views ,CategoryId: videos[0].CategoryId }),
        onSubmit: (video)=>{
            axios.put(`http://127.0.0.1:3030/edit-video/${video.VideoId}` , video)
            .then(()=>{
                alert('video Updated Successfully');
                navigate('/admin-dashboard');
            })
        },
        enableReinitialize: true
    })

    return(
        <div>
            <h5 className="text-center mt-2">Edit Video</h5>
            <div className="d-flex justify-content-center">
                <form className="w-25" onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Video Id</dt>
                        <dd><input className="form-control" type="number" onChange={formik.handleChange} value={formik.values.VideoId} name="VideoId" /></dd>
                        <dt>Title</dt>
                        <dd><input className="form-control" type="text" onChange={formik.handleChange} value={formik.values.Title} name="Title"  /></dd>
                        <dt>Url</dt> 
                        <dd><input className="form-control" type="text" onChange={formik.handleChange} value={formik.values.Url} name="Url" /></dd>
                        <dt>Description</dt>
                        <dd>
                            <textarea className="form-control" name="Description" onChange={formik.handleChange}  id="" value={formik.values.Description} cols="40" rows="1"></textarea>
                        </dd>
                        <dt>Likes</dt>
                        <dd><input className="form-control" type="text" onChange={formik.handleChange} value={formik.values.Likes} name="Likes" /></dd>
                        <dt>Dislike</dt>
                        <dd><input className="form-control" type="text" onChange={formik.handleChange} value={formik.values.Dislike} name="Dislike" /></dd>
                        <dt>Views</dt>
                        <dd><input className="form-control" type="text" onChange={formik.handleChange} name="Views" value={formik.values.Views} /></dd>
                        <dt>Category Id</dt>
                        <dd>
                            <select name="CategoryId" className="form-select" onChange={formik.handleChange} value={formik.values.CategoryId}>
                                {
                                    categories.map(category => <option value={category.CategoryId}>{category.CategoryName}</option>)
                                }
                            </select>
                        </dd>
                    </dl>
                    <button className="btn btn-success" style={{width:'185px'}}>Save</button>
                    <Link className="btn btn-danger ms-2" to="/admin-dashboard" style={{width:'185px'}}>Cancle</Link>
                </form>
            </div>
        </div>
    )
}