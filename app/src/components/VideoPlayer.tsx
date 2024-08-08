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
    if (videoRef.current) {
      console.log("control", play, newTime, videoRef.current.currentTime);
      if (play) {
        const diff = Math.abs(newTime - videoRef.current.currentTime);
        if (diff > 1) {
          console.log("seeking", diff);
          videoRef.current.currentTime = newTime + 0.1;
        }
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = newTime;
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleUnMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const updateCurrentTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  return (
    <div className="text-2xl" onClick={handleUnMute}>
      <video
        // className="w-2/3"
        ref={videoRef}
        preload="auto"
        src={`/videos/${video}`}
        muted
        onTimeUpdate={updateCurrentTime}
      />
      <div className="flex flex-row justify-around mt-2 px-2 items-center gap-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handlePlay}
        >
          Play
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handlePause}
        >
          Pause
        </button>
        <input
          className="w-full"
          type="range"
          min={0}
          max={videoRef.current?.duration || 0}
          step={1}
          value={currentTime}
          onChange={handleSeeking}
        />
        <p className="text-sm text-nowrap">
          {Math.round(currentTime)} /{" "}
          {Math.round(videoRef.current?.duration || 0)}
        </p>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleFullscreen}
        >
          Fullscreen
        </button>
      </div>
      {/* <button className="bg-blue-500 text-white p-2" onClick={handleForward}>
        Forward
      </button> */}
    </div>
  );
}
