"use client";

import * as React from "react";
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

const frameworks = [
	{
		value: "acne studio",
		label: "Acne Studio",
	},
	{
		value: "sveltekit",
		label: "SvelteKit",
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js",
	},
	{
		value: "remix",
		label: "Remix",
	},
	{
		value: "astro",
		label: "Astro",
	},
];

export default React.forwardRef(({ onMakeProgress }, ref) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	React.useImperativeHandle(
		ref,
		() => ({
			val: { value },
		}),
		[value],
	);

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
						? frameworks.find((framework) => framework.value === value)?.label
						: "Select Designers..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[calc(100vw-2rem)] md:w-[calc(100vw-36rem)]">
				<Command>
					<CommandInput placeholder="Search designers..." />
					<CommandEmpty>No designers found.</CommandEmpty>
					<CommandGroup>
						{frameworks.map((framework) => (
							<CommandItem
								key={framework.value}
								onSelect={(currentValue) => {
									onMakeProgress && onMakeProgress(85);
									setValue(currentValue === value ? "" : currentValue);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === framework.value ? "opacity-100" : "opacity-0",
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
});
