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
import { ScrollArea } from "@/components/ui/scroll-area";
import useInterSectionObserver from "@/lib/hooks/useIntersectionObserver";

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
			className,
			popoverWidth,
			disabled,
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

		const lastDesignerElement = useInterSectionObserver({
			isFetchingNextPage,
			hasNextPage,
			fetchNextPage,
		});

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={`mt-6 w-full justify-between text-base font-light md:col-span-2 md:h-12 ${
							!value && "!text-gray-400"
						} ${className}`}
						disabled={disabled}
					>
						{value ? value : "Select Designers..."}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={`h-80 w-[calc(100vw-2rem)] ${
						popoverWidth ? popoverWidth : "md:w-[calc(100vw-38rem)]"
					}`}
				>
					<Command>
						<CommandInput placeholder="Search designers..." />
						<ScrollArea>
							<CommandEmpty>No designers found.</CommandEmpty>
							<CommandGroup className="overflow-scroll">
								{datas.map((page) => {
									const pageData = page.data;
									return pageData.map((data, index) => {
										if (pageData.length === index + 1) {
											return (
												<CommandItem
													key={data.name}
													onSelect={() => {
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
													onSelect={() => {
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
						</ScrollArea>
					</Command>
				</PopoverContent>
			</Popover>
		);
	},
);

DesignerComboBox.displayName = "DesignerComboBox";

export default DesignerComboBox;
