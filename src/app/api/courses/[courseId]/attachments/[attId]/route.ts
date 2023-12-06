import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { utapi } from "@/app/api/uploadthing/core";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attId,
      },
    });

    if (attachment.url) {
      const attFileKey = attachment.url.slice(18);
      utapi.deleteFiles(attFileKey);
    }

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMENT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
