import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading";
import { Music, VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import { formSchema } from "../conversation/constants";

export default function MusicPage() {
  const [video, setVideo] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      setVideo(undefined);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/video`,
        {
          messages: data.prompt,
        }
      );

      setVideo(response.data[0]);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(video);

  return (
    <div>
      <Heading
        title="Video Generation"
        description="Turn your prompt into music"
        Icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormItem className="w-full col-span-12 lg:col-span-10">
              <FormControl>
                <Input
                  id="prompt"
                  type="text"
                  {...register("prompt")}
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="Virat Kohli playing football"
                />
              </FormControl>
              {errors.prompt && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.prompt.message}
                </p>
              )}
            </FormItem>

            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>

        <div className="space-y-4  py-4">
          <div className="flex flex-col gap-y-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {!video && !isLoading && (
              <div>
                <Empty label="No video generated" />
              </div>
            )}
            {video && (
              <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                <source src={video} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
