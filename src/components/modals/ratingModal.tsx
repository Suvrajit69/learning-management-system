"use client";

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

import { Textarea } from "@/components/ui/textarea";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import StarRating from "../rating&&review/starRating";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface RatingModalProps {
  children: React.ReactNode;
  courseId: string;
  initialRating: number;
  initialReview: string;
}

const formSchema = z.object({
  review: z.string().optional(),
});

const RatingModal = ({
  children,
  courseId,
  initialRating,
  initialReview,
}: RatingModalProps) => {
  const [ratingValue, setRatingValue] = useState({ rating: initialRating });
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: initialReview || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const handleRating = (value: number) => {
    setRatingValue({ rating: value });
  };

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    const ratingReview = { ...ratingValue, ...value };

    try {
      await axios.post(`/api/courses/${courseId}/rating&&review`, ratingReview);
      toast.success("Course updated");
      router.refresh();
    } catch (error) {
      toast.error("Somethig went wrong");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rate this course</AlertDialogTitle>
          <AlertDialogDescription>
            Select star or stars according to your satisfaction.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <StarRating setRating={handleRating} initialRating={initialRating} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Please write your opinion about this course."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                type="submit"
                disabled={ratingValue.rating ? false : true || isValid}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RatingModal;
