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