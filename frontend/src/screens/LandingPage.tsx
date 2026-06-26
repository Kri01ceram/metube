import { useEffect, useState } from "react";
import axios from "axios";
import { Appbar } from "@/components/Appbar";
import { VideoCard } from "../components/VideoCard"

export function LandingPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/videos")
            .then(response => {
                const data = response.data;
                setVideos(data);
            });
    }, []);

    return (
        <div >
            <div style={{display:"flex", padding: 50}}>
            {videos.map(video =>
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

