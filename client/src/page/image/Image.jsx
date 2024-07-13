import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { amountOptions, formSchema, resolutionOptions } from "./imageConstants";
import { Card, CardFooter } from "@/components/ui/card";

export default function Image() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const [images, setImages] = useState([]);

  const isLoading = form.formState.isSubmitting;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      setImages([]);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/image`,
        {
          messages: data.prompt,
          amount: data.amount,
          resolution: data.resolution,
        }
      );

      //   console.log(response.data);

      setImages((prevMessages) => [
        { role: "user", content: data.prompt },
        { role: "replicate", content: response.data },
        ...prevMessages,
      ]);

      //   console.log(images);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Turn your prompt into an image"
        Icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />

      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormItem className="w-full col-span-12 lg:col-span-6">
              <FormControl>
                <Input
                  id="prompt"
                  type="text"
                  {...register("prompt")}
                  className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  disabled={isLoading}
                  placeholder="A picture of a horse in Swiss alps"
                />
              </FormControl>
              {errors.prompt && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.prompt.message}
                </p>
              )}
            </FormItem>

            {/* amount  */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* resolution */}
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

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
            {images.length === 0 && !isLoading && (
              <div>
                <Empty label="No images generated" />
              </div>
            )}

            {/* <div>Images will be rendered here.</div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images &&
                images.map(
                  (image, index) =>
                    image.role !== "user" &&
                    image.content.map((i, imgIndex) => (
                      <Card
                        key={imgIndex}
                        className="rounded-lg overflow-hidden"
                      >
                        <div className="relative aspect-square">
                          <img src={i} alt="" className="object-center"/>
                        </div>
                        <CardFooter className="p-2">
                          <Button
                            variant="secondary"
                            className="w-full"
                            onClick={() => window.open(i)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
