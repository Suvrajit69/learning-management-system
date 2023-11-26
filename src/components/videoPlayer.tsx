"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

interface VideoProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ReactPlayer
      url={videoUrl}
      controls
      download={false}
      width={"100%"}
      height={"100%"}
      style={{backgroundColor: "#000000"}}      
    />
  );
};

export default VideoPlayer;
