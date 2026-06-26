import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function VideoPage() {
    const [seachParams,setSearchParams] = useSearchParams();
    const [videoDetails,setVideoDetails] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [recommendedVideos,setRecommendedVideos] = useState([]);
    const id = seachParams.get("id");
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/videos/${id}`)
            .then(response => {
                const data = response.data;
                setVideoDetails(data);
                setIsLoading(false);
            });
    },[id])
    useEffect(()=>{
        axios.get("http://localhost:3000/api/videos")
            .then(response => {
                const data = response.data;
                setRecommendedVideos(data);
            });
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div style={{display:"flex"}}>
            <div>
            <video src={videoDetails?.videoUrl} />
            <br />
            <div>
                {videoDetails?.title}
            </div>
            <div>
                {videoDetails?.user.channelName}
            </div>
            <div>
                {videoDetails?.user.profilePicture && <img src={videoDetails.user.profilePicture} style={{ width: 30, borderRadius: "50%" }} />}
            </div>
           
        </div>
        <div
        </div>
        
    );
}