import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllDesigners from "@/lib/queries/fetchQuery";

import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import debounce from "@/lib/utils";

export default function Tree({ treeData, onChangeFilter, filter }) {
	const [searchInput, setSearchInput] = useState("");
	const [initialDesignerData, setInitialDesignerData] = useState(true);
	const [openedAccordion, setOpenedAccordion] = useState([]);

	const { data: designerData, refetch: fetchDesigners } = useQuery({
		queryKey: ["designer", { keyword: searchInput }],
		queryFn: (obj) =>
			getAllDesigners({
				uri: `/designer?keyword=${obj.queryKey[1].keyword}}`,
			}),
		enabled: false,
		refetchOnWindowFocus: false,
	});

	const onDesignerSelect = (e) => {
		onAddFilter((prev) => (!prev.includes(e) ? [...prev, e] : prev));
	};

	const onCheck = (key, value, department) => {
		const newFilter = { ...filter };

		// Determine the target property based on the key
		const targetProperty = key === "category" ? department : key;

		if (!newFilter[targetProperty]) {
			newFilter[targetProperty] = [value];
		} else {
			const isValueExist = newFilter[targetProperty].includes(value);
			if (isValueExist) {
				newFilter[targetProperty] = newFilter[targetProperty].filter((item) => item !== value);
			} else {
				newFilter[targetProperty].push(value);
			}

			if (newFilter[targetProperty].length === 0) {
				delete newFilter[targetProperty];
			}
		}
		onChangeFilter(newFilter);
	};

	const onOpenAccordion = (e) => {
		setOpenedAccordion(e);
	};

	const memoizedFetch = useCallback(() => {
		fetchDesigners();
	}, [fetchDesigners]);

	const debounceSearch = useMemo(() => {
		return debounce(memoizedFetch, 300);
	}, [memoizedFetch]);

	const onSearch = (e) => {
		setSearchInput(e);
		if (e && e.length > 1) {
			setInitialDesignerData(false);
			debounceSearch();
		} else {
			setInitialDesignerData(true);
		}
	};

	const shouldRenderSize = Object.keys(filter).length > 0;
	const isChecked = (key, value) => {
		return filter[key]?.includes(value) ?? false;
	};

	return (
		<Accordion type="multiple" value={openedAccordion} onValueChange={onOpenAccordion}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Department</AccordionTrigger>
				<AccordionContent className="space-y-3">
					{treeData?.Department.map((department) => (
						<div className="flex items-center space-x-2" key={department}>
							<Checkbox
								id={department}
								checked={isChecked("department", department)}
								onCheckedChange={() => onCheck("department", department)}
							/>
							<label
								htmlFor={department}
								className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{department}
							</label>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>NEW ARRIVALS</AccordionTrigger>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>Category</AccordionTrigger>
				{Object.keys(treeData?.Category ?? []).map((department) => (
					<AccordionContent key={department}>
						<div className="pl-2 text-base">{department}</div>
						{Object.keys(treeData?.Category[department]).map((category, index) => (
							<Accordion
								type="multiple"
								className="pl-4 text-sm"
								key={`${department}-${index}-${category}`}
								value={openedAccordion}
								onValueChange={onOpenAccordion}
							>
								<AccordionItem
									value={`${department}-${index}-${category}`}
									className={
										index === Object.keys(treeData.Category[department]).length - 1 && "!border-b-0"
									}
								>
									<AccordionTrigger>{category}</AccordionTrigger>
									<AccordionContent className="cursor-pointer pl-2 hover:underline">
										<div className="flex items-center space-x-2">
											<Checkbox
												id={category}
												checked={isChecked(department, category)}
												onCheckedChange={() => onCheck("category", category, department)}
											/>
											<label
												htmlFor={category}
												className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												All {category}
											</label>
										</div>
									</AccordionContent>
									{treeData.Category[department][category].sub.map((obj) => (
										<AccordionContent
											key={obj.name}
											className="cursor-pointer pl-2 hover:underline"
										>
											<div className="flex items-center space-x-2">
												<Checkbox
													id={obj.name}
													checked={isChecked("subCategory", obj.name)}
													onCheckedChange={() => onCheck("subCategory", obj.name)}
												/>
												<label
													htmlFor={obj.name}
													className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{obj.name}
												</label>
											</div>
										</AccordionContent>
									))}
								</AccordionItem>
							</Accordion>
						))}
					</AccordionContent>
				))}
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger>Size</AccordionTrigger>
				{shouldRenderSize ? (
					Object.keys(treeData?.Sizes ?? []).map((department, index) => (
						<AccordionContent key={`${department}-${index}`}>
							<div className="pl-2 text-base">{department}</div>
							{Object.keys(treeData?.Sizes[department]).map((category, index) => (
								<Accordion
									type="multiple"
									className="pl-4 text-sm"
									key={`${category}-${index}-${department}`}
									value={openedAccordion}
									onValueChange={onOpenAccordion}
								>
									<AccordionItem
										value={`${category}-${index}-${department}`}
										className={
											index === Object.keys(treeData.Sizes[department]).length - 1 && "!border-b-0"
										}
									>
										<AccordionTrigger>{category}</AccordionTrigger>
										{treeData.Sizes[department][category].map((size, index) => (
											<AccordionContent
												key={`${index}-${size}`}
												className="cursor-pointer pl-2 hover:underline"
											>
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`${index}-${size}`}
														checked={isChecked("sizes", size)}
														onCheckedChange={() => onCheck("sizes", size)}
													/>
													<label
														htmlFor={`${index}-${size}`}
														className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
													>
														{size}
													</label>
												</div>
											</AccordionContent>
										))}
									</AccordionItem>
								</Accordion>
							))}
						</AccordionContent>
					))
				) : (
					<AccordionContent className="text-sm">Please select category first</AccordionContent>
				)}
			</AccordionItem>
			<AccordionItem value="item-5">
				<AccordionTrigger>Designers</AccordionTrigger>
				<AccordionContent>
					<Command>
						<CommandInput
							placeholder="Search for designers..."
							value={searchInput}
							onValueChange={onSearch}
						/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							{initialDesignerData
								? treeData?.Designer.map((designer, index) => (
										<CommandItem
											key={`${designer}-${index}`}
											className="cursor-pointer"
											onSelect={onDesignerSelect}
										>
											{designer}
										</CommandItem>
								  ))
								: designerData?.data.map((obj) => (
										<CommandItem key={obj.name} className="cursor-pointer">
											{obj.name}
										</CommandItem>
								  ))}
						</CommandList>
					</Command>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-6">
				<AccordionTrigger>Price</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-col items-end space-y-4 p-2">
						<div className="flex items-center space-x-3">
							<Input
								placeholder="minimun"
								className="h-fit w-1/2 placeholder:font-light placeholder:text-gray-400"
							/>
							<span>-</span>
							<Input
								placeholder="maximun"
								className="w-1/2 placeholder:font-light placeholder:text-gray-400"
							/>
						</div>
						<div className="cursor-pointer underline hover:text-sky-900">Apply</div>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-7">
				<AccordionTrigger>Conditions</AccordionTrigger>
				<AccordionContent className="space-y-3">
					{treeData?.Condition.map((condition) => (
						<div className="flex items-center space-x-2" key={condition}>
							<Checkbox
								id={condition}
								checked={isChecked("condition", condition)}
								onCheckedChange={() => onCheck("condition", condition)}
							/>
							<label
								htmlFor={condition}
								className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								{condition}
							</label>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
