"use client";

import RatingModal from "@/components/modals/ratingModal";
import { Button } from "@/components/ui/button";

interface CourseEnrollBtnProps {
  courseId: string;
  rating: number;
  review: string;
}

const CourseRatingBtn = ({
  courseId,
  rating,
  review,
}: CourseEnrollBtnProps) => {
  return (
    <RatingModal
      courseId={courseId}
      initialRating={rating}
      initialReview={review}
    >
      <Button variant="secondary">
        {rating ? "Edit rating" : "Rate this course"}
      </Button>
    </RatingModal>
  );
};

export default CourseRatingBtn;
