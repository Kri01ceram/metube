import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import { Signup } from "./screens/Signup";
import { Signin } from "./screens/Signin";
import { VideoPage } from "./screens/VideoPage";
import { LandingPage } from "./screens/LandingPage";
import { UploadPage } from "./screens/UploadPage.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/watch" element={<VideoPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
