import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  const [videos, setVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/list")
      .then((res) => res.json())
      .then(setVideos);
  }, []);

  return (
    <>
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
      <select
        value={selectedVideo || ""}
        onChange={(e) => setSelectedVideo(e.target.value)}
      >
        <option value="" disabled>
          Select a video
        </option>
        {videos.map((video) => (
          <option key={video} value={video}>
            {video}
          </option>
        ))}
      </select>
      {selectedVideo}
    </>
  );
}

export default App;
