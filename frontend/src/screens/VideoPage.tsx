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
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "25px",
      padding: "35px",
      background: "#eef2f7",
      minHeight: "100vh",
    }}
  >
    {/* Main Content */}
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <video
        src={videoDetails?.videoUrl}
        controls
        style={{
          width: "100%",
          borderRadius: "15px",
          background: "#000",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#222",
          }}
        >
          {videoDetails?.title}
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            padding: "15px",
            background: "#f5f7fb",
            borderRadius: "12px",
          }}
        >
          {videoDetails?.user.profilePicture && (
            <img
              src={videoDetails.user.profilePicture}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />
          )}

          <div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "18px",
              }}
            >
              {videoDetails?.user.channelName}
            </div>

            <div
              style={{
                color: "#777",
                marginTop: "4px",
              }}
            >
              Video Creator
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Recommendations */}
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        height: "fit-content",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        More Videos
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {recommendedVideos.map((video) => (
          <VideoCard
            key={video.id}
            href={`/watch?id=${video.id}`}
            imageUrl={video.thumbnail}
            title={video.title}
            channelImage={video.user.profilePicture}
            channelName={video.user.channelName}
          />
        ))}
      </div>
    </div>
  </div>
);
}