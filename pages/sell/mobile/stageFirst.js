import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateCategoryIcon } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import SaveDraftBtn from "@/components/SaveDraftBtn";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import getAllCategories from "@/lib/queries/fetchQuery";

import { makeProgress, mobileFormInput, sellSelector } from "@/redux/sellSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MobilePreInfo() {
	const dispatch = useDispatch();
	const btnRef = useRef();
	const dataRef = useRef({
		department: null,
		category: null,
		category_id: null,
		subCategory: null,
		subCategory_id: null,
	});
	const progressStatus = useSelector(sellSelector).progress;
	const formInput = useSelector(sellSelector).formInput;

	const { data: categoryData } = useQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category" }),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 30,
		cacheTime: 1000 * 60 * 35,
	});

	const onBtnSelect = (e, catId) => {
		const dept = e.currentTarget.parentNode.getAttribute("data-department");
		const text = e.currentTarget.innerText.trim();
		const btnMap = getMap(btnRef);
		const btnObj = btnMap.get(dept);
		const btnNode = btnObj[text];
		Object.values(btnObj).forEach((btn) => (btn.style.backgroundColor = "transparent"));
		btnNode.style.backgroundColor = "rgb(203, 213, 225)";
		dataRef.current[dept] = text;
		if (catId) dataRef.current[`${dept}_id`] = catId;

		switch (dept) {
			case "department":
				onMakeProgress(15);
				onFormInput({ key: "department", value: dataRef.current[dept] });
				break;
			case "category":
				onMakeProgress(25);
				onFormInput({ key: "category", value: dataRef.current[dept] });
				onFormInput({ key: "category_id", value: dataRef.current[`${dept}_id`] });
				break;
			case "subCategory":
				onMakeProgress(35);
				onFormInput({ key: "subCategory", value: dataRef.current[dept] });
				onFormInput({ key: "subCategory_id", value: dataRef.current[`${dept}_id`] });
				break;
		}
	};

	const getMap = (ref) => {
		if (!ref.current) {
			ref.current = new Map();
		}
		return ref.current;
	};

	const getNode = (node, department, key, ref) => {
		const map = getMap(ref);
		if (node && map.get(department)) {
			const dpObj = map.get(department);
			dpObj[key] = node;
		} else {
			map.set(department, { [key]: node });
		}
	};

	const onMakeProgress = (progress) => dispatch(makeProgress(progress));
	const onFormInput = (input) => dispatch(mobileFormInput({ key: input.key, value: input.value }));

	return (
		<Fragment>
			<Progress
				value={progressStatus}
				className="fixed z-10 h-1 rounded-none shadow-sm md:hidden"
			/>
			<main className="p-4">
				<SaveDraftBtn className="h-fit w-fit p-0 text-sky-900 hover:underline" />
				<div className="grid grid-cols-2 gap-4" data-department="department">
					<div className="col-span-2 font-semibold">Department</div>
					{categoryData?.data &&
						Object.keys(categoryData.data).map((department) => (
							<Button
								key={department}
								variant="outline"
								className={`row-span-1 focus:bg-accent ${
									formInput.department === department && "bg-slate-300"
								}`}
								onClick={(e) => onBtnSelect(e)}
								ref={(node) => getNode(node, "department", department, btnRef)}
							>
								{department}
							</Button>
						))}
				</div>
				<div className="mt-6 grid grid-cols-2 gap-4" data-department="category">
					<div className="col-span-2 font-semibold">Category</div>
					{formInput.department ? (
						Object.keys(categoryData.data[formInput.department]).map((category) => {
							const cat_id = categoryData.data[formInput.department][category]?.id;
							return (
								<Button
									key={cat_id}
									variant="outline"
									className={`row-span-1 flex h-16 flex-col focus:bg-accent ${
										formInput.category === category && "bg-slate-300"
									}`}
									onClick={(e) => onBtnSelect(e, cat_id)}
									ref={(node) => getNode(node, "category", category, btnRef)}
								>
									{generateCategoryIcon(category)}
									<div>{category}</div>
								</Button>
							);
						})
					) : (
						<div className="col-span-2 text-sm">Please select department first</div>
					)}
				</div>
				<div className="mt-6 grid grid-cols-2 gap-4" data-department="subCategory">
					<div className="col-span-2 font-semibold">SubCategory</div>
					{formInput.category_id ? (
						Object.values(categoryData.data[formInput.department])
							.filter((obj) => String(obj.id) === String(formInput.category_id))[0]
							?.sub.map((subCategory) => {
								const subCat_id = subCategory.id;
								return (
									<Button
										key={subCat_id}
										variant="outline"
										className={`row-span-1 focus:bg-accent ${
											formInput.subCategory === subCategory.name && "bg-slate-300"
										}`}
										onClick={(e) => onBtnSelect(e, subCat_id)}
										ref={(node) => getNode(node, "subCategory", subCategory.name, btnRef)}
									>
										{subCategory.name}
									</Button>
								);
							})
					) : (
						<div className="col-span-2 text-sm">Please select category first</div>
					)}
				</div>
				<Button
					className="justify-content bottom-0 mt-10 flex w-full items-center bg-sky-900"
					asChild
				>
					<Link href="/sell/mobile/stageSecond">NEXT</Link>
				</Button>
			</main>
		</Fragment>
	);
}
