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
        <div style={{display:"flex"}}>
            {videos.map((video: any) => (
                <VideoCard
                    imageUrl={video.imageUrl}
                    title={video.title}
                    channelImage={video.channelImage}
                    channelName={video.channelName}
                />
            ))}
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
