import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const rating = await db.courseRating.create({
      data: {
        courseId: params.courseId,
        userId: userId,
        ...values,
      },
    });

    return NextResponse.json(rating);
  } catch (error) {
    console.log("[COURSE_RATING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
