"use client";
import { useEffect, useState } from "react";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";


import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle } from "lucide-react";

import { useRouter } from "next/navigation";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";

interface ChapterFormProps {
  initialData: Course & {chapters: Chapter[]};
  courseId: string;
}
const formSchema = z.object({
  title: z.string().min(1),
});
const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      console.log(values);
      toast.success("Course created");
      toggleCreating();
      router.refresh();
    } catch (error) {
        toggleCreating()
      toast.error("Somethig went wrong");
    }
  };

  const toggleCreating = () => setIsCreating((current) => !current);

   useEffect(() => {
     console.log(isCreating)
   }, [isCreating])
   

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}
      {isCreating || (
        <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic ")}>{!initialData.chapters.length && "No chapters"}</div>
        // TODO add a list of chapter
      )}
      {isCreating || (
        <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
