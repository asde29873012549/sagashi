import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import getAllSizes from "@/lib/queries/fetchQuery";
import getAllColor from "@/lib/queries/fetchQuery";
import getAllCondition from "@/lib/queries/fetchQuery";
import SaveDraftBtn from "@/components/SaveDraftBtn";
import { useToast } from "@/components/ui/use-toast";

import { makeProgress, mobileFormInput, sellSelector } from "../../../redux/sellSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MobileMidInfo() {
	const dispatch = useDispatch();
	const formInput = useSelector(sellSelector).formInput;
	const btnRef = useRef();
	const dataRef = useRef({
		condition: null,
		size: null,
		size_id: null,
		color: null,
		price: null,
	});

	const { data: sizeData } = useQuery({
		queryKey: ["size", formInput.category_id && formInput.category_id],
		queryFn: (obj) => getAllSizes({ uri: `/category/size/${obj.queryKey[1]}` }),
		refetchOnWindowFocus: false,
	});

	const { data: colorData } = useQuery({
		queryKey: ["color"],
		queryFn: () => getAllColor({ uri: "/listing/color" }),
		refetchOnWindowFocus: false,
	});

	const { data: conditionData } = useQuery({
		queryKey: ["condition"],
		queryFn: () => getAllCondition({ uri: "/listing/condition" }),
		refetchOnWindowFocus: false,
	});

	const onPriceInput = (e) => {
		onFormInput({ key: "price", value: e.target.value });
	};

	const onBtnSelect = (e, sizeId) => {
		const dept = e.currentTarget.parentNode.getAttribute("data-department");
		const text = e.currentTarget.innerText;
		const btnMap = getMap(btnRef);
		const btnObj = btnMap.get(dept);
		const btnNode = btnObj[text];
		Object.values(btnObj).forEach((btn) => (btn.style.backgroundColor = "transparent"));
		btnNode.style.backgroundColor = "rgb(203, 213, 225)";
		dataRef.current[dept] = text;
		if (sizeId) dataRef.current[`${dept}_id`] = sizeId;

		switch (dept) {
			case "condition":
				onMakeProgress(45);
				onFormInput({ key: "condition", value: dataRef.current[dept] });
				break;
			case "size":
				onMakeProgress(55);
				onFormInput({ key: "size", value: dataRef.current[dept] });
				onFormInput({ key: "size_id", value: dataRef.current[`${dept}_id`] });
				break;
			case "color":
				onMakeProgress(65);
				onFormInput({ key: "color", value: dataRef.current[dept] });
				break;
		}
	};

	const progressStatus = useSelector(sellSelector).progress;
	const onMakeProgress = (progress) => dispatch(makeProgress(progress));

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

	const onNextPage = () => {
		onMakeProgress(75);
	};
	const onFormInput = (input) => dispatch(mobileFormInput({ key: input.key, value: input.value }));

	return (
		<Fragment>
			<Progress
				value={progressStatus}
				className="fixed z-10 h-1 rounded-none shadow-sm md:hidden"
			/>
			<main className="relative h-full p-4">
				<SaveDraftBtn className="h-fit w-fit p-0 text-sky-900 hover:underline" />
				<div className="grid grid-cols-2 gap-4" data-department="condition">
					<div className="col-span-2 font-semibold">Condition</div>
					{conditionData?.data.map((condition) => (
						<Button
							key={condition}
							variant="outline"
							className={`row-span-1 focus:bg-accent ${
								formInput.condition === condition && "bg-slate-300"
							}`}
							onClick={(e) => onBtnSelect(e)}
							ref={(node) => getNode(node, "condition", condition, btnRef)}
						>
							{condition}
						</Button>
					))}
				</div>
				<div className="mt-8 grid grid-cols-2 gap-4" data-department="size">
					<div className="col-span-2 font-semibold">Size</div>
					{formInput.subCategory_id ? (
						sizeData?.data.map((obj, index) => (
							<Button
								key={`${obj.Size.name}_${index}`}
								variant="outline"
								className={`row-span-1 focus:bg-accent ${
									formInput.size === obj.Size.name && "bg-slate-300"
								}`}
								onClick={(e) => onBtnSelect(e, obj.Size.id)}
								ref={(node) => getNode(node, "size", obj.Size.name, btnRef)}
							>
								{obj.Size.name}
							</Button>
						))
					) : (
						<div className="col-span-2 text-sm">Please select category first</div>
					)}
				</div>
				<div className="mt-8 grid grid-cols-4 gap-4" data-department="color">
					<div className="col-span-4 font-semibold">Color</div>
					{colorData?.data.map((color) => (
						<Button
							key={color}
							variant="outline"
							className={`col-span-1 focus:bg-accent ${
								formInput.color === color && "bg-slate-300"
							}`}
							onClick={(e) => onBtnSelect(e)}
							ref={(node) => getNode(node, "color", color, btnRef)}
						>
							{color}
						</Button>
					))}
				</div>
				<div className="mt-8 font-semibold" data-department="price">
					price
				</div>
				<Input
					placeholder="price"
					className="mt-4 w-full text-base"
					onChange={onPriceInput}
					value={formInput.price || ""}
				/>
				<div className="grid grid-cols-2 gap-4">
					<Button className="justify-content bottom-0 mt-10 flex items-center bg-sky-900" asChild>
						<Link href="/sell/mobile/stageFirst">PREVIOUS</Link>
					</Button>
					<Button className="justify-content bottom-0 mt-10 flex items-center bg-sky-900" asChild>
						<Link href="/sell/mobile/stageFinal" onClick={onNextPage}>
							NEXT
						</Link>
					</Button>
				</div>
			</main>
		</Fragment>
	);
}
