import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { utapi } from "@/app/api/uploadthing/core";

export const DELETE = async (
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: params.chapterId,
      },
    });

    if (deletedChapter.videoUrl) {
      const videoFileKey = deletedChapter.videoUrl.slice(18);
      console.log(videoFileKey);
      await utapi.deleteFiles(videoFileKey);
    }

    const publishedChaptersInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublised: true,
      },
    });
    if (!publishedChaptersInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }
    return NextResponse.json(deletedChapter, { status: 201 });
  } catch (error) {
    console.log("[CHAPTER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const existingVideoUrl = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      select: {
        videoUrl: true,
      },
    });

    if (existingVideoUrl?.videoUrl) {
      const videoFileKey = existingVideoUrl.videoUrl.slice(18);
      await utapi.deleteFiles(videoFileKey);
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
