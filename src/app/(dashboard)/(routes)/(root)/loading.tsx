import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <section className="p-6 space-y-4">
      <section className="flex items-center gap-x-2 overflow-x-auto pb-2">
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
        <Skeleton className=" w-auto py-5 px-14 rounded-full transition" />
      </section>
      <section className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <Skeleton className=" group  transition overflow-hidden border rounded-lg p-3  h-60" />
        <Skeleton className=" group  transition overflow-hidden border rounded-lg p-3  h-60" />
        <Skeleton className=" group  transition overflow-hidden border rounded-lg p-3  h-60" />
        <Skeleton className=" group  transition overflow-hidden border rounded-lg p-3  h-60" />
      </section>
    </section>
  );
};

export default Loading;
