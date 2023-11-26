"use client";

import { useState, forwardRef, useImperativeHandle, useRef, useCallback } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mobileFormInput } from "@/redux/sellSlice";
import { useDispatch } from "react-redux";

const DesignerComboBox = forwardRef(
	(
		{
			onMakeProgress,
			data: datas = [],
			fetchNextPage,
			isFetchingNextPage,
			hasNextPage,
			setFormInput,
			dispatchFormInput,
			cacheValue,
		},
		ref,
	) => {
		const [open, setOpen] = useState(false);
		const [value, setValue] = useState(cacheValue || "");
		const dispatch = useDispatch();

		useImperativeHandle(
			ref,
			() => ({
				val: { value },
			}),
			[value],
		);

		const observer = useRef();
		const lastDesignerElement = useCallback(
			(node) => {
				if (isFetchingNextPage) return;
				if (observer.current) {
					observer.current.disconnect();
				}
				observer.current = new IntersectionObserver((entries) => {
					if (entries[0].isIntersecting && hasNextPage) {
						fetchNextPage();
					}
				});

				if (node) observer.current.observe(node);
			},
			[isFetchingNextPage, hasNextPage],
		);

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={`mt-6 w-full justify-between text-base font-light md:col-span-2 md:h-12 ${
							!value && "!text-gray-400"
						}`}
					>
						{value ? value : "Select Designers..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="h-80 w-[calc(100vw-2rem)] md:w-[calc(100vw-38rem)]">
					<Command>
						<CommandInput placeholder="Search designers..." />
						<CommandEmpty>No designers found.</CommandEmpty>
						<CommandGroup className="overflow-scroll">
							{datas.map((page) => {
								const pageData = page.data;
								return pageData.map((data, index) => {
									if (pageData.length === index + 1) {
										return (
											<CommandItem
												key={data.name}
												onSelect={(currentValue) => {
													onMakeProgress && onMakeProgress(85);
													setValue(data.name);

													if (dispatchFormInput) {
														dispatch(mobileFormInput({ key: "designer", value: data.name }));
														dispatch(
															mobileFormInput({ key: "designer_id", value: data.designer_id }),
														);
													} else {
														setFormInput((prev) => ({
															...prev,
															designer: data.name,
															designer_id: data.designer_id,
														}));
													}

													setOpen(false);
												}}
												ref={lastDesignerElement}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														value === data.name ? "opacity-100" : "opacity-0",
													)}
												/>
												{data.name}
											</CommandItem>
										);
									} else {
										return (
											<CommandItem
												key={data.name}
												onSelect={(currentValue) => {
													onMakeProgress && onMakeProgress(85);
													setValue(data.name);
													if (dispatchFormInput) {
														dispatch(mobileFormInput({ key: "designer", value: data.name }));
														dispatch(
															mobileFormInput({ key: "designer_id", value: data.designer_id }),
														);
													} else {
														setFormInput((prev) => ({
															...prev,
															designer: data.name,
															designer_id: data.designer_id,
														}));
													}
													setOpen(false);
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														value === data.name ? "opacity-100" : "opacity-0",
													)}
												/>
												{data.name}
											</CommandItem>
										);
									}
								});
							})}
							{isFetchingNextPage && (
								<CommandItem className="flex justify-center" disabled>
									<div className="h-4 w-4 animate-spin  rounded-full border-2 border-solid border-gray-400 border-t-transparent"></div>
								</CommandItem>
							)}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		);
	},
);

DesignerComboBox.displayName = "DesignerComboBox";

export default DesignerComboBox;
