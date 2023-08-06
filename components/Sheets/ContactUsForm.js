"use client";

import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(1, { message: "username cannot be empty" }),
  orderNumber: z.string(),
  email: z.string().email({ message: "email is invalid" }),
  subject: z.string().min(1, { message: "subject cannot be empty" }),
  message: z.string().min(1, { message: "message cannot be empty" }),
});

export default function ContactUsForm() {
  const [open, setOpen] = useState(false);
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
    <Sheet open={open} setOpen={setOpen}>
      <SheetTrigger className="underline">
        Contact us through e-mail
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full overflow-scroll">
        <SheetHeader>
          <SheetTitle>Contact Us</SheetTitle>
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
                        className="w-full px-1 placeholder:text-info"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
