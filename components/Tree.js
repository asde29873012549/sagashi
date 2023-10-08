import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import getFeaturedDesigners from "@/lib/queries/fetchQuery";
import getAllDesigners from "@/lib/queries/fetchQuery";
import getAllCondition from "@/lib/queries/fetchQuery";
import {
	Command,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import debounce from "@/lib/utils";

export default function Tree({ categoryData }) {
	const [selectFilter, setSelectFilter] = useState([]);
	const [searchInput, setSearchInput] = useState("");
	const [initialDesignerData, setInitialDesignerData] = useState(true);

	const {
		data: featuredDesignerData,
		isError: designerError,
		isLoading: designerLoading,
	} = useQuery({
		queryKey: ["featuredDesingers"],
		queryFn: () => getFeaturedDesigners({ uri: "/designer/featured" }),
	});

	const { data: designerData, refetch: fetchDesigners } = useQuery({
		queryKey: ["designer", { keyword: searchInput }],
		queryFn: (obj) =>
			getAllDesigners({
				uri: `/designer?keyword=${obj.queryKey[1].keyword}}`,
			}),
		enabled: false,
		refetchOnWindowFocus: false,
	});

	const { data: conditionData } = useQuery({
		queryKey: ["condition"],
		queryFn: () => getAllCondition({ uri: "/listing/condition" }),
		refetchOnWindowFocus: false,
	});

	/*
	const { data: treeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getAllCondition({ uri: "/tree" }),
		refetchOnWindowFocus: false,
	});
	*/

	const memoizedFetch = useCallback(() => {
		fetchDesigners();
	}, [fetchDesigners]);

	const debounceSearch = useMemo(() => {
		return debounce(memoizedFetch, 300);
	}, [memoizedFetch]);

	const onSearch = (e) => {
		setSearchInput(e);
		if (e) {
			setInitialDesignerData(false);
			debounceSearch();
		} else {
			setInitialDesignerData(true);
		}
	};

	return (
		<Accordion type="multiple">
			<AccordionItem value="item-1">
				<AccordionTrigger>Department</AccordionTrigger>
				<AccordionContent className="space-y-3">
					{categoryData &&
						Object.keys(categoryData.data).map((department) => (
							<div className="flex items-center space-x-2" key={department}>
								<Checkbox id={department} />
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
				<AccordionContent>
					<div className="pl-2 text-base">Menswear</div>
					{categoryData &&
						Object.keys(categoryData.data.Menswear).map((category, index) => (
							<Accordion
								type="single"
								className="pl-4 text-sm"
								key={`${index}-${category}`}
								collapsible
							>
								<AccordionItem
									value={category}
									className={
										index === Object.keys(categoryData.data.Menswear).length - 1 && "!border-b-0"
									}
								>
									<AccordionTrigger>{category}</AccordionTrigger>
									<AccordionContent className="cursor-pointer pl-2 hover:underline">
										<div className="flex items-center space-x-2">
											<Checkbox id={category} />
											<label
												htmlFor={category}
												className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												All {category}
											</label>
										</div>
									</AccordionContent>
									{categoryData.data.Menswear[category].sub.map((obj) => (
										<AccordionContent
											key={obj.name}
											className="cursor-pointer pl-2 hover:underline"
										>
											<div className="flex items-center space-x-2">
												<Checkbox id={obj.name} />
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
				<AccordionContent>
					<div className="pl-2 text-base">Momenswear</div>
					{categoryData &&
						Object.keys(categoryData.data.Womenswear).map((category, index) => (
							<Accordion
								type="single"
								className="pl-4 text-sm"
								key={`${index}-${category}`}
								collapsible
							>
								<AccordionItem
									value={category}
									className={
										index === Object.keys(categoryData.data.Womenswear).length - 1 && "!border-b-0"
									}
								>
									<AccordionTrigger>{category}</AccordionTrigger>
									<AccordionContent className="cursor-pointer pl-2 hover:underline">
										<div className="flex items-center space-x-2">
											<Checkbox id={category} />
											<label
												htmlFor={category}
												className="ml-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>
												All {category}
											</label>
										</div>
									</AccordionContent>
									{categoryData.data.Womenswear[category].sub.map((obj) => (
										<AccordionContent
											key={obj.name}
											className="cursor-pointer pl-2 hover:underline"
										>
											<div className="flex items-center space-x-2">
												<Checkbox id={obj.name} />
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
			</AccordionItem>
			<AccordionItem value="item-4">
				<AccordionTrigger>Size</AccordionTrigger>

				<AccordionContent>
					<div>Please select a category first .</div>
					<Accordion type="single" collapsible>
						<AccordionItem value="item-4-3" className="border-b-0">
							<AccordionTrigger>Knitwear</AccordionTrigger>
							<AccordionContent>Blue Knitwear</AccordionContent>
							<AccordionContent>goe Jackets</AccordionContent>
						</AccordionItem>
					</Accordion>
				</AccordionContent>
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
								? featuredDesignerData?.data.map((obj) => (
										<CommandItem key={obj.designer_id}>{obj.Designer.name}</CommandItem>
								  ))
								: designerData?.data.map((obj) => (
										<CommandItem key={obj.name}>{obj.name}</CommandItem>
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
					{conditionData?.data.map((condition) => (
						<div className="flex items-center space-x-2" key={condition}>
							<Checkbox id={condition} />
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
