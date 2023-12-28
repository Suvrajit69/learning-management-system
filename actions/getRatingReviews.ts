import { db } from "@/lib/db";

export const getRatingReviews = async (courseId: string) => {
  try {
    const avgRating = await db.courseRating.aggregate({
      where: {
        courseId: courseId,
      },
      _avg: {
        rating: true,
      },
    });

    const totalRatings = await db.courseRating.aggregate({
      where: {
        courseId: courseId,
      },
      _count: {
        rating: true,
      },
    });

    const totalPurshases = await db.purchase.aggregate({
      where: {
        courseId: courseId,
      },
      _count: {
        courseId: true,
      },
    });

    return {
      avgRating: avgRating._avg.rating,
      totalRatings: totalRatings._count.rating,
      totalPurchase: totalPurshases._count.courseId,
    };
  } catch (error) {
    console.log("[GET_RATINGS_REVIEWS]", error);
    return {
      avgRating: null,
      totalRatings: null,
      totalPurchases: null,
      // reviews: [],
      // oneStar: null,
      // twoStar: null,
      // threeStar: null,
      // fourStar: null,
      // fiveStar: null,
      // totalReviews: null,
    };
  }
};
