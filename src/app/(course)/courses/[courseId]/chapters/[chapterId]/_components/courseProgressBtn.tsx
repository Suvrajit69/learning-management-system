"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../../../../hooks/useConfettiStore";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseProgressBtnProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
}

const CourseProgressBtn = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId,
}: CourseProgressBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const confetti = useConfettiStore();
  const Icon = isCompleted ? XCircle : CheckCircle;

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();

    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsLoading(false);
    }
    
  };
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

export default CourseProgressBtn;
