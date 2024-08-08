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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const videoFromQuery = searchParams.get("video");
    if (videoFromQuery) {
      setSelectedVideo(videoFromQuery);
    }
  }, []);

  return (
    <>
      {selectedVideo && <VideoPlayer video={selectedVideo} />}
      <select
        value={selectedVideo || ""}
        onChange={(e) => {
          setSelectedVideo(e.target.value);
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.set("video", e.target.value);
          window.history.pushState(null, "", `?${searchParams.toString()}`);
        }}
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
