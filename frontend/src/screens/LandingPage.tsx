import { useEffect, useState } from "react";
import axios from "axios";

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
        <div style={{display:"flex", padding: 50}}>
            {videos.map(video =>
                <VideoCard
                    imageUrl={video.thumbnail}
                    title={video.title}
                    channelImage={video.user.profilePicture}
                    channelName={video.user.channelName}
                />
            )}
        </div>
    );
}
interface IVideoCard {
    imageUrl: string;
    title: string;
    channelImage: string;
    channelName: string;
}

function VideoCard({ imageUrl, title, channelImage, channelName }: IVideoCard) {
    return (
        <div style={{ margin:9, borderRadius: 20 }}>
            <img src={imageUrl} style={{ display: "block", width: "100%",borderRadius: 30 }} />
            <div>
                {title}
            </div>
            <div>
                <img src={channelImage} style={{ width: 30, borderRadius: "50%" }} />
                {channelName}
            </div>
        </div>
    );
}
