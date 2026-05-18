import axios from "axios";

export function UploadPage() {
    function upload(){
        axios.post("http://localhost:3000/api/videos", {
              videoUrl: document.getElementById("videoUrl")?.value,
              thumbnail: document.getElementById("thumbnail")?.value
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }
    return (
        <div>
            <input id="videoUrl" type="text" placeholder="Video URL" />
            <input id="thumbnail" type="text" placeholder="Thumbnail" />
            <button onClick={(upload)}>Complete upload</button>
        </div>
    );
}