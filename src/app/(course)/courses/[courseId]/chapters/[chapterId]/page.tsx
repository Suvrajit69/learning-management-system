import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getChapter } from "../../../../../../../actions/getChapter";
import Banner from "@/components/banner";
import ChapterVideoPlayer from "./_components/chapterVideoPlayer";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, attachments, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You already completes this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <ChapterVideoPlayer
            videoUrl={chapter.videoUrl!}
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
