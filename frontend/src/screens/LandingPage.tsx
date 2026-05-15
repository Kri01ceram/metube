import { useEffect, useState } from "react";
import axios from "axios";

export function LandingPage() {
    // const [videos, setVideos] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/videos")
    //         .then(response => {
    //             const data = response.data;
    //         });
    // }, []);

    return (
        <div>
            <VideoCard
                imageUrl="https://i.ytimg.com/an_webp/-Z4RGzhAH7Q/mqdefault_6s.webp?du=3000&sqp=COzomtAG&rs=AOn4CLCsLcklVBcrXUd9JxgUEgMB942CXg"
                title="pagal h kya"
                channelImage="https://yt3.googleusercontent.com/ytc/AIdro_mImkvPDsJNP_KLBPzIvlD6lj5et_G-k0Kt7-4mqCMAdJk=s160-c-k-c0x00ffffff-no-rj"
                channelName="Casetoo"
            />
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
