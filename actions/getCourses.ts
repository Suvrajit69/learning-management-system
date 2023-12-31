import { Category, Course } from "@prisma/client";

import { getProgress } from "./getProgress";
import { db } from "@/lib/db";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string | null;
  title?: string;
  categoryId: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    if (!userId) {
      const courses = await db.course.findMany({
        where: {
          isPublished: true,
          title: {
            contains: title,
          },
          categoryId,
        },
        include: {
          category: true,
          chapters: {
            where: {
              isPublised: true,
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const CourseWithProgress: CourseWithProgressWithCategory[] =
        await Promise.all(
          courses.map(async (course) => {
            return {
              ...course,
              progress: null,
            };
          })
        );
      return CourseWithProgress;
    }
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublised: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const CourseWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }
          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );
    return CourseWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
