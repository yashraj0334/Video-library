import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export function AddVideo()
{
    let navigate = useNavigate();

    const[categories,setCategories] = useState([{CategoryId:0 , CategoryName:''}]);

    const formik = useFormik({
        initialValues:{VideoId:0, Title:'', Url:'',Description:'',Likes: 0 ,Dislike: 0 ,Views: 0 ,CategoryId: 0 },
        onSubmit:(video)=>{
            axios.post('http://127.0.0.1:3030/add-videos', video)
            .then(()=>{
                alert("Video Added Successfully...");
                navigate('/admin-dashboard');
            })
        }
    })

    useEffect(()=>{
        axios.get("http://127.0.0.1:3030/get-categories")
        .then(response => {
            response.data.unshift({CategoryId:-1,CategoryName:'Select Category'})
            setCategories(response.data)
        })
    },[])

    return(
        <div className="mt-4">
            <div className=" d-flex justify-content-center">
                <form className="w-25" onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Video Id</dt>
                        <dd><input className="form-control" type="number" name="VideoId" onChange={formik.handleChange} /></dd>
                        <dt>Title</dt>
                        <dd><input className="form-control" type="text" name="Title"   onChange={formik.handleChange}/></dd>
                        <dt>Url</dt>
                        <dd><input className="form-control" type="text" name="Url"  onChange={formik.handleChange}/></dd>
                        <dt>Description</dt>
                        <dd>
                            <textarea className="form-control" name="Description" id="" cols="40" rows="2" onChange={formik.handleChange}></textarea>
                        </dd>
                        <dt>Likes</dt>
                        <dd><input className="form-control" type="text" name="Likes" onChange={formik.handleChange} /></dd>
                        <dt>Dislike</dt>
                        <dd><input className="form-control" type="text" name="Dislike" onChange={formik.handleChange} /></dd>
                        <dt>Views</dt>
                        <dd><input className="form-control" type="text" name="Views" onChange={formik.handleChange} /></dd>
                        <dt>Category Id</dt>
                        <dd>
                            <select className="form-select" name="CategoryId" onChange={formik.handleChange}>
                                {
                                    categories.map(category => <option value={category.CategoryId}>{category.CategoryName}</option>)
                                }
                            </select>
                        </dd>
                    </dl>
                    <button className="btn btn-primary " style={{width:'187px'}}>Add Video</button>
                    <Link to='/admin-dashboard' className="ms-2 btn btn-warning" style={{width:'187px'}} >Cancle</Link>
                </form>
            </div>
        </div>
    )
}