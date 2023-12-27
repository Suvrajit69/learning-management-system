import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const existingRatingReview = await db.courseRating.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    
    if (!existingRatingReview) {
      const newRatingReview = await db.courseRating.create({
        data: {
          userId: userId,
          courseId: params.courseId,
          ...values,
        },
      });
      return NextResponse.json(newRatingReview);

    } else {
      const updatedRatingReview = await db.courseRating.update({
        where: {
          userId_courseId: {
            userId: userId,
            courseId: params.courseId,
          },
        },
        data: {
          ...values,
        },
      });
      return NextResponse.json(updatedRatingReview);
    }
    
  } catch (error) {
    console.log("[COURSE_RATING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
