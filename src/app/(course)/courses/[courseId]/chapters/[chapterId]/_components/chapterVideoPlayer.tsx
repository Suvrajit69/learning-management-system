"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "../../../../../../../../hooks/useConfettiStore";
import VideoPlayer from "@/components/videoPlayer";

interface ChapterVideoPlayerProps {
  courseId: string;
  chapterId: string;
  videoUrl: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

const ChapterVideoPlayer = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  videoUrl,
  completeOnEnd,
  title,
}: ChapterVideoPlayerProps) => {
  // const [isReady, setIsReady] = useState(false);
  // console.log(videoUrl)
  return (
    <div className="relative aspect-video">
      {/* { !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 ">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )} */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {/* <div className={cn(!isReady && "hidden")}> */}
        {!isLocked && <VideoPlayer videoUrl={videoUrl} />}
      {/* </div> */}
    </div>
  );
};

export default ChapterVideoPlayer;
