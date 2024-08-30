import axios from "axios";
import { useEffect, useState } from "react"
import { Link,} from "react-router-dom";


export function AdminDashBoard()
{

    const [videos,setVideo] = useState([{VideoId:0, Title:'', Url:'',Description:'',Likes: 0 ,Dislike: 0 ,Views: 0 ,CategoryId: 0 }]);

    useEffect(()=>{
        axios.get('http://127.0.0.1:3030/get-videos')
        .then(response =>{
            setVideo(response.data);
        })
    },[])

    function handleDeleteClick(id)
    {
        var flag = window.confirm("Are you sure ? \nYou want to delete this video");
        if(flag){
            axios.delete(`http://127.0.0.1:3030/delete-video/${id}`)
            .then(()=>{
                window.location.reload();
            })
        }
            
    }

    return(
        <div className="mx-4">
            <h1 className="text-center mt-4">Admin Dashboard</h1>
            <Link to='/add-video' className="bi bi-camera-video btn btn-primary" > Add Videos</Link>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>                   
                    {
                        videos.map(video => 
                            <tr> 
                                <td>{video.Title}</td> 
                                <td><iframe src={video.Url} width='250' height='150' frameborder="0"></iframe></td> 
                                <td>{video.Description}</td>
                                <td>
                                    <Link to={`/edit-video/${video.VideoId}`} className="bi bi-pen btn btn-primary"></Link>    
                                    <button onClick={()=>{handleDeleteClick(video.VideoId)}} className="bi bi-trash btn btn-secondary ms-2"></button>    
                                </td> 
                            </tr>
                        )
                    }                    
                </tbody>
            </table>
        </div>
    )
}
