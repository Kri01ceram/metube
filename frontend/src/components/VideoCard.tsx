import { useEffect, useState } from "react";
import axios from "axios";

interface IVideoCard {
    imageUrl: string;
    title: string;
    channelImage: string;
    channelName: string;
    href?: string;
}

export function VideoCard({ imageUrl, title, channelImage, channelName,href }: IVideoCard) {
    return (
        <div style={{ margin:9, borderRadius: 20 }} onClick={()=> window.location = href}>
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