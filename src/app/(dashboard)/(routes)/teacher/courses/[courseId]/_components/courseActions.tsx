"use client";

import ConfirmModal from "@/components/modals/confirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useConfettiStore } from "../../../../../../../../hooks/useConfettiStore";

interface CourseActionProps {
  disabled: boolean;
  courseId: string;
  isPublised: boolean;
}

const CourseAction = ({
  disabled,
  courseId,
  isPublised,
}: CourseActionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      if (isPublised) {
        await axios.patch(
          `/api/courses/${courseId}/unpublish`
        );
        toast.success("Course unpublished");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/publish`
        );
        toast.success("Course published");
        confetti.onOpen();
      }
      router.refresh()
    } catch (error) {
      toast.error("Something error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublised ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseAction;
