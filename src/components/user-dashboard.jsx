import axios from "axios"
import { useEffect, useState } from "react"


export function UserDashboard()
{
    const[videos, setVideo] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:'',Dislike:'',Views:''}])

    function LoadVideos()
    {
        axios.get('http://127.0.0.1:3030/get-videos')
        .then(response =>{
            setVideo(response.data);
        })
    }
    useEffect(()=>{
        LoadVideos();
    },[])

    return(
        <div>
            <h3 className="mt-2 text-center mb-4">User Dashboard</h3>
            <main className=" d-flex flex-wrap">
                {
                    videos.map(video=>
                        <div className="card m-4 p-1" style={{width:'340px'}}>
                            <div className=" card-header" style={{height:'200px'}}>
                                <iframe src={video.Url} frameborder="0" style={{height:'100%', width:'100%'}}></iframe>
                            </div>
                            <div className=" card-body text-center">
                                {
                                    <p className=" fw-bold">{video.Title}</p>
                                }
                            </div>
                            <div className=" card-footer text-center">
                                <span className="bi bi-eye me-3">{video.Views}</span>
                                <span className="bi bi-hand-thumbs-up me-3">{video.Likes}</span>
                                <span className="bi bi-hand-thumbs-down me-3">{video.Dislike}</span>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    )
}