import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import { formSchema } from "../conversation/constants";

export default function MusicPage() {
  const [music, setMusic] = useState("");

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
      setMusic(undefined);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/music`,
        {
          messages: data.prompt,
        }
      );

      setMusic(response)

      //   setMessages((prevMessages) => [
      //     { role: "user", content: data.prompt },
      //     { role: "gemini", content: response.data },
      //     ...prevMessages,
      //   ]);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(music)

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music"
        Icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                  placeholder="Piano solo"
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
            {/* {messages.length === 0 && !isLoading && (
              <div>
                <Empty label="No conversation started" />
              </div>
            )} */}
            {/* {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg w-full items-start gap-x-8 ${
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  }`}
                >
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                  />
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
