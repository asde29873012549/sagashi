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

export default forwardRef(({ onMakeProgress, data:datas = [] }, ref) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	useImperativeHandle(
		ref,
		() => ({
			val: { value },
		}),
		[value],
	);

	const observer = useRef();
	const lastDesignerElement = useCallback((node) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				console.log("visible")
			}
		});

		if (node) observer.current.observe(node)

	}, [])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="mt-6 w-full justify-between font-normal md:col-span-2 md:h-12"
				>
					{value
						? datas.find((data) => data.name === value)?.name
						: "Select Designers..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[calc(100vw-2rem)] md:w-[calc(100vw-38rem)] h-80">
				<Command>
					<CommandInput placeholder="Search designers..." />
					<CommandEmpty>No designers found.</CommandEmpty>
					<CommandGroup className="overflow-scroll">
						{datas.map((data, index) => {
							return datas.length === index + 1 ?
							(<CommandItem
								key={data.name}
								onSelect={(currentValue) => {
									onMakeProgress && onMakeProgress(85);
									setValue(currentValue === value ? "" : currentValue);
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
							</CommandItem>) :
							(
								<CommandItem
								key={data.name}
								onSelect={(currentValue) => {
									onMakeProgress && onMakeProgress(85);
									setValue(currentValue === value ? "" : currentValue);
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
							)
							})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
});
