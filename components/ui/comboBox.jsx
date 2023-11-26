"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function Combobox({ data, defaultValue, fallBackValue, className, onSelect }) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen} modal={true}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={`${className} justify-between text-sm font-light ${!value ? "text-info" : ""}`}
				>
					{value ? value : defaultValue}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={`p-0 ${className} h-[400px]`}>
				<Command>
					<CommandInput placeholder={defaultValue} />
					<ScrollArea>
						<CommandEmpty>{fallBackValue}</CommandEmpty>
						<CommandGroup>
							{data.map((dta) => (
								<CommandItem
									key={dta}
									value={dta}
									onSelect={(currentValue) => {
										onSelect && onSelect(currentValue);
										setValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
									className="cursor-pointer"
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === data.value ? "opacity-100" : "opacity-0",
										)}
									/>
									{dta}
								</CommandItem>
							))}
						</CommandGroup>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
