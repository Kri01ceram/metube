import { useEffect, useState } from "react";
import axios from "axios";

export function LandingPage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/videos")
            .then(response => {
                const data = response.data;
            });
    }, []);

    return (
        <div>
            <h1>Landing Page</h1>
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
        <div style={{ maxWidth: 300, borderRadius: 30 }}>
            <img src={imageUrl} style={{ display: "block" }} />
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
