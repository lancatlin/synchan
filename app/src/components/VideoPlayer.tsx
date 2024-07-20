import React, { useEffect, useRef, useState } from "react";
import socket, { play, pause, bindReceiveTime, seek } from "../lib/socket";

export default function VideoPlayer({ video }: { video: string }) {
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

  const handleSeeking = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (videoRef.current) {
      seek(newTime);
    }
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
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
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
        // className="w-2/3"
        ref={videoRef}
        preload="auto"
        src={`/videos/${video}`}
        onTimeUpdate={updateCurrentTime}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handlePlay}>
        Play
      </button>
      <button className="bg-blue-500 text-white p-2" onClick={handlePause}>
        Pause
      </button>
      <button className="bg-blue-500 text-white p-2" onClick={handleFullscreen}>
        Fullscreen
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={currentTime}
        onChange={handleSeeking}
      />
      {currentTime}
      {/* <button className="bg-blue-500 text-white p-2" onClick={handleForward}>
        Forward
      </button> */}
    </div>
  );
}
