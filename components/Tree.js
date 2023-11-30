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
import { Check } from "lucide-react";
import debounce from "@/lib/utils";

export default function Tree({
	treeData,
	onChangeFilter,
	filter,
	isDesigner,
	isMenswear,
	isWomenswear,
}) {
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
		onChangeFilter((prev) => {
			if (!prev.designers) {
				return { ...prev, designers: [e] };
			}
			if (!prev.designers.includes(e)) return { ...prev, designers: [...prev.designers, e] };
			return prev;
		});
	};

	const onCheck = (key, value, department, category) => {
		const newFilter = { ...filter };

		switch (key) {
			case "category":
				const items = treeData.Category[department][value].sub.map((obj) => ({
					name: obj.name,
					dept: department,
					cat: value,
				}));
				if (!newFilter.subCategory) {
					newFilter.subCategory = items;
				} else {
					const isExist = newFilter.subCategory.some(
						(obj) => obj.dept === department && obj.cat === value,
					);
					newFilter.subCategory = isExist
						? newFilter.subCategory.filter((obj) => obj.dept !== department || obj.cat !== value)
						: [...newFilter.subCategory, ...items];
					newFilter.subCategory.length === 0 && delete newFilter.subCategory;
				}

				break;
			case "sizes":
			case "subCategory":
				if (!newFilter[key]) {
					newFilter[key] = [{ name: value, dept: department, cat: category }];
				} else {
					const isExist = newFilter[key].some(
						(obj) => obj.dept === department && obj.cat === category && obj.name === value,
					);

					newFilter[key] = isExist
						? newFilter[key].filter((obj) => obj.name !== value)
						: [...newFilter[key], { name: value, dept: department, cat: category }];
					newFilter[key].length === 0 && delete newFilter[key];
				}

				break;
			default:
				if (!newFilter[key]) {
					newFilter[key] = [value];
				} else {
					const isExist = newFilter[key].includes(value);
					newFilter[key] = isExist
						? newFilter[key].filter((item) => item !== value)
						: [...newFilter[key], value];
					newFilter[key].length === 0 && delete newFilter[key];
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

	const isChecked = (key, value, department, category) => {
		if (key === "Menswear" || key === "Womenswear") {
			if (!filter.subCategory || filter.subCategory.length === 0) return false;
			return (
				filter.subCategory.filter((obj) => obj.dept === key && obj.cat === value).length ===
				treeData.Category[key][value].sub.length
			);
		} else if (key === "sizes" || key === "subCategory") {
			if (!filter[key] || filter[key].length === 0) return false;
			return (
				filter[key].some(
					(obj) => obj.name === value && obj.dept === department && obj.cat === category,
				) || false
			);
		}
		return filter[key]?.includes(value) ?? false;
	};

	const shouldRenderSize = Object.keys(filter).length > 0;

	return (
		<Accordion type="multiple" value={openedAccordion} onValueChange={onOpenAccordion}>
			{!isMenswear && !isWomenswear && (
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
			)}
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
													checked={isChecked("subCategory", obj.name, department, category)}
													onCheckedChange={() =>
														onCheck("subCategory", obj.name, department, category)
													}
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
										{treeData.Sizes[department][category]?.map((size, index) => (
											<AccordionContent
												key={`${index}-${size}`}
												className="cursor-pointer pl-2 hover:underline"
											>
												<div className="flex items-center space-x-2">
													<Checkbox
														id={`${index}-${size}`}
														checked={isChecked("sizes", size, department, category)}
														onCheckedChange={() => onCheck("sizes", size, department, category)}
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
			{!isDesigner && (
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
									? treeData?.Designer?.map((designer, index) => (
											<CommandItem
												key={`${designer}-${index}`}
												className="cursor-pointer justify-between"
												onSelect={() => onDesignerSelect(designer)}
											>
												<span>{designer}</span>
												{filter.designers?.includes(designer) && <Check size={16} color="#0c4a6e" />}
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
			)}

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

/*
if (key === "category") {
			if (!newFilter[department] || !newFilter[department][value]) {
				newFilter[department] = {
					...newFilter[department],
					[value]: {
						...newFilter[department]?.[value],
						subCategory: treeData.Category[department][value].sub.map((obj) => obj.name),
					},
				};
			} else {
				const isValueExist = newFilter[department][value].subCategory ?? false;
				if (isValueExist) {
					delete newFilter[department][value].subCategory;
				} else {
					newFilter[department][value].subCategory = treeData.Category[department][value].sub.map(
						(obj) => obj.name,
					);
				}

				if (Object.keys(newFilter[department][value]).length === 0) {
					delete newFilter[department][value];
				}
			}
		} else if (key === "sizes") {
			if (
				!newFilter[department] ||
				!newFilter[department][category] ||
				!newFilter[department][category].sizes
			) {
				newFilter[department] = {
					...newFilter[department],
					[category]: { ...newFilter[department]?.[category], sizes: [value] },
				};
			} else {
				const isValueExist = newFilter[department][category].sizes.includes(value);
				if (isValueExist) {
					newFilter[department][category].sizes = newFilter[department][category].sizes.filter(
						(item) => item !== value,
					);
					newFilter[department][category].sizes.length < 1 &&
						delete newFilter[department][category].sizes;
				} else {
					newFilter[department][category].sizes.push(value);
				}

				if (Object.keys(newFilter[department][category]).length === 0) {
					delete newFilter[department];
				}
			}
		} else if (key === "subCategory") {
			if (
				!newFilter[department] ||
				!newFilter[department][category] ||
				!newFilter[department][category].subCategory
			) {
				newFilter[department] = {
					...newFilter[department],
					[category]: { ...newFilter[department]?.[category], subCategory: [value] },
				};
			} else {
				const isValueExist = newFilter[department][category].subCategory.includes(value);
				if (isValueExist) {
					newFilter[department][category].subCategory = newFilter[department][
						category
					].subCategory.filter((item) => item !== value);
					newFilter[department][category].subCategory.length < 1 &&
						delete newFilter[department][category].subCategory;
				} else {
					newFilter[department][category].subCategory.push(value);
				}
				if (Object.keys(newFilter[department][category]).length === 0) {
					delete newFilter[department][category];
				}
			}
		} else {
			if (!newFilter[key]) {
				newFilter[key] = [value];
			} else {
				const isValueExist = newFilter[key].includes(value);
				if (isValueExist) {
					newFilter[key] = newFilter[key].filter((item) => item !== value);
				} else {
					newFilter[key].push(value);
				}

				if (newFilter[key].length === 0) {
					delete newFilter[key];
				}
			}
		}

		if (newFilter[department] && Object.keys(newFilter[department]).length === 0) {
			delete newFilter[department];
		}

*/
