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
import * as DOMPurify from "dompurify";

const formSchema = z.object({
	username: z
		.string()
		.min(1, { message: "username cannot be empty" })
		.refine((val) => DOMPurify.sanitize(val)),
	orderNumber: z.string().refine((val) => DOMPurify.sanitize(val)),
	email: z
		.string()
		.email({ message: "email is invalid" })
		.refine((val) => DOMPurify.sanitize(val)),
	subject: z
		.string()
		.min(1, { message: "subject cannot be empty" })
		.refine((val) => DOMPurify.sanitize(val)),
	message: z
		.string()
		.min(1, { message: "message cannot be empty" })
		.refine((val) => DOMPurify.sanitize(val)),
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start">
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} className="w-full px-1 placeholder:text-info" />
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
								<Input placeholder="" {...field} className="w-full px-1 placeholder:text-info" />
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
								<Input placeholder="" {...field} className="w-full px-1 placeholder:text-info" />
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
								<Input placeholder="" {...field} className="w-full px-1 placeholder:text-info" />
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
									className="w-full px-1 text-base placeholder:text-info"
									rows={rows}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-start">
					<Button type="submit" className="w-full max-w-[300px] bg-sky-900 hover:bg-sky-950">
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
