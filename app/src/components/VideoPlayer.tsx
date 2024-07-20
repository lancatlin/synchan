import React, { useEffect, useRef, useState } from "react";
import socket, { play, pause, bindReceiveTime, seek } from "../lib/socket";

export default function VideoPlayer({ video }: { video: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);

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

  const handleSeeking = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    e.preventDefault();
    console.log(e);
    if (videoRef.current) {
      const delta = Math.abs(videoRef.current.currentTime - currentTime);
      if (delta > 1 && !seeking) {
        seek(videoRef.current.currentTime);
        setSeeking(true);
      } else if (delta < 1 && seeking) {
        setSeeking(false);
      }
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
        preload="auto"
        src={`/videos/${video}`}
        onTimeUpdate={updateCurrentTime}
        // onPlay={handlePlay}
        // onPause={handlePause}
        onSeeking={handleSeeking}
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
