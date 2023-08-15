/* eslint-disable*/
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "username cannot be empty" }),
  orderNumber: z.string(),
  email: z.string().email({ message: "email is invalid" }),
  subject: z.string().min(1, { message: "subject cannot be empty" }),
  message: z.string().min(1, { message: "message cannot be empty" }),
});

export default function ContactUsForm({ setOpen, rows }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      orderNumber: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = () => {
    //do something
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full px-1 placeholder:text-info"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="orderNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Order Number</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full px-1 placeholder:text-info"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full px-1 placeholder:text-info"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full px-1 placeholder:text-info"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  {...field}
                  className="w-full px-1 placeholder:text-info text-base"
                  rows={rows}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-start">
          <Button
            type="submit"
            className="bg-sky-900 hover:bg-sky-950 w-full md:w-1/6"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
