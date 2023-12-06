import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { utapi } from "../../uploadthing/core";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unautorized", { status: 401 });
    }

    const { courseId } = params;
    const values = await req.json();

    const existingImageUrl = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
      select: {
        imageUrl: true,
      },
    });

    if (existingImageUrl?.imageUrl) {
      const imageFileKey = existingImageUrl.imageUrl.slice(18);
      await utapi.deleteFiles(imageFileKey);
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    // const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorize user", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorize courseOwner", { status: 401 });
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
      include: {
        attachments: true,
        chapters: true,
      },
    });

    if (deletedCourse.imageUrl) {
      const imageFileKey = deletedCourse.imageUrl.slice(18);
      await utapi.deleteFiles(imageFileKey);
    }
    if (deletedCourse.attachments.length !== 0) {
      deletedCourse.attachments.map((attchment) => {
        const attFileKey = attchment.url.slice(18);
        utapi.deleteFiles(attFileKey);
      });
    }
    if (deletedCourse.chapters.length !== 0) {
      deletedCourse.chapters.map((chapter) => {
        const videoFileKey = chapter.videoUrl?.slice(18);
        utapi.deleteFiles(videoFileKey!);
      });
    }

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("COURSE_ID_DELETE", error);
    return new NextResponse("Internal server", { status: 500 });
  }
};
