import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

export function VideoPage() {
    const [seachParams,setSearchParams] = useSearchParams();
    const [videoDetails,setVideoDetails] = useState();
    const id = seachParams.get("id");
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/videos/${id}`)
            .then(response => {
                const data = response.data;
                setVideoDetails(data);
            });
    },[id])
    return (
        <div>
            {videoDetails ? JSON.stringify(videoDetails) : "Loading..."}
        </div>
    );
}