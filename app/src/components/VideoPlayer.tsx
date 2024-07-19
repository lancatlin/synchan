import { useRef, useState } from "react";
import { play } from "../lib/socket";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleForward = () => {
    const newTime = currentTime + 10;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const updateCurrentTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <div className="text-2xl">
      <video
        className="w-full h-full"
        controls
        ref={videoRef}
        src="http://localhost:3000/videos/sample.mkv"
        onTimeUpdate={updateCurrentTime}
      />
      {currentTime}
      <button className="bg-blue-500 text-white p-2" onClick={handlePlay}>
        Play
      </button>
      <button className="bg-blue-500 text-white p-2" onClick={handlePause}>
        Pause
      </button>
      <button className="bg-blue-500 text-white p-2" onClick={handleForward}>
        Forward
      </button>
    </div>
  );
}
