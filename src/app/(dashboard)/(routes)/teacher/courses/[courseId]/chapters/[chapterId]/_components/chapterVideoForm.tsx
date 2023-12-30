"use client";
import { useState } from "react";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";

import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";

import { FileUpload } from "@/components/fileUpload";
import VideoPlayer from "@/components/videoPlayer";

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  chapterId: string;
  courseId: string;
}
const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const ChapterVideoForm = ({
  initialData,
  chapterId,
  courseId,
}: ChapterVideoFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      // console.log(values);
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Somethig went wrong");
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <VideoPlayer videoUrl={initialData.videoUrl} />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload the chapter video
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Refresh the page if the
          video does not appear
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
