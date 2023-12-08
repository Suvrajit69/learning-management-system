"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

interface CourseEnrollBtnProps {
  price: number;
  courseId: string;
}

const CourseEnrollBtn = ({ price, courseId }: CourseEnrollBtnProps) => {
  return (
    <Button size="sm" className="w-full md:w-auto">
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollBtn;
