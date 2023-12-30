import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./iconBadge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import CourseProgress from "./courseProgress";
import { getRatingReviews } from "../../actions/getRatingReviews";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

const CourseCard = async ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {
  const { avgRating, totalRatings, totalPurchase } = await getRatingReviews(
    id
  );

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let num = index + 0.5;
    return (
      <span key={index}>
        {avgRating! >= index + 1 ? (
          <FaStar size="0.8rem" color="rgb(234 179 8)" />
        ) : avgRating! >= num ? (
          <FaStarHalfAlt size="0.8rem" color="rgb(234 179 8)" />
        ) : (
          <AiOutlineStar size="0.8rem" color="rgb(234 179 8)" />
        )}
      </span>
    );
  });

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3  h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="aspect-square"
            sizes="(min-width: 808px) 50vw, 100vw"
            alt={title}
            priority
            src={imageUrl}
          />
        </div>
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-muted-foreground ">{category}</p>
        <div className="my-3 flex justify-between items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-x-1 text-slate-500 ">
            <IconBadge size="sm" icon={BookOpen} />
            <span>
              {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
          <div className="flex items-center flex-col">
            <span className="text-yellow-700 font-bold text-sm">
              {avgRating}
            </span>
            <div className="flex gap-1">{ratingStar}</div>
            <div className="md:flex gap-1">
              <p className="text-slate-600 font-medium flex flex-row">
                ({totalRatings} {totalRatings! > 1 ? "ratings" : "rating"})
              </p>
              <p className="text-slate-600 font-medium flex flex-row">
                {totalPurchase} {totalPurchase! > 1 ? "students" : "student"}
              </p>
            </div>
          </div>
        </div>
        {progress !== null ? (
          <CourseProgress
            size="sm"
            value={progress}
            variant={progress === 100 ? "success" : "default"}
          />
        ) : (
          <p className="text-md md:text-sm font-medium text-slate-700">
            {formatPrice(price)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
