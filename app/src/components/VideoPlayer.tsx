import { useEffect, useRef, useState } from "react";
import socket, { play, pause, bindReceiveTime } from "../lib/socket";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    bindReceiveTime(handleControl);
    return () => {
      socket.off("time");
    };
  }, []);

  const handlePlay = () => {
    play();
  };

  const handlePause = () => {
    pause();
  };

  const handleControl = (play: boolean, newTime: number) => {
    console.log(play, newTime);
    if (videoRef.current) {
      if (play) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
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
        src="/videos/sample.mp4"
        onTimeUpdate={updateCurrentTime}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handlePlay}>
        Play
      </button>
      <button className="bg-blue-500 text-white p-2" onClick={handlePause}>
        Pause
      </button>
      {currentTime}
      {/* <button className="bg-blue-500 text-white p-2" onClick={handleForward}>
        Forward
      </button> */}
    </div>
  );
}
