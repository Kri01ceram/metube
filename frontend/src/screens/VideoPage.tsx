import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { VideoCard } from "../components/VideoCard"

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
        <div style={{display:"flex",justifyContent:"space-between",padding:50}}>
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
            <div>
                {recommendedVideos.map(video =>
                    <VideoCard
                        href={`/watch?id=${video.id}`}
                        imageUrl={video.thumbnail}
                        title={video.title}
                        channelImage={video.user.profilePicture}
                        channelName={video.user.channelName}
                    />
                )}
            </div>
        
        </div>
        
    );
}