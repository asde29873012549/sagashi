import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";

import { makeProgress, sellSelector } from "../../../redux/sellSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MobileMidInfo() {
	const dispatch = useDispatch();
	const [priceInputState, setPriceInputState] = useState();
	const btnRef = useRef();
	const dataRef = useRef({
		Condition: null,
		Size: null,
		Color: null,
		Price: null,
	});

	const onPriceInput = (e) => {
		setPriceInputState(e.target.value);
		dataRef.current.Price = e.target.value;
	};

	const onBtnSelect = (e) => {
		const dept = e.currentTarget.parentNode.getAttribute("data-department");
		const text = e.currentTarget.innerText;
		const btnMap = getMap(btnRef);
		const btnObj = btnMap.get(dept);
		const btnNode = btnObj[text];
		Object.values(btnObj).forEach((btn) => (btn.style.backgroundColor = "transparent"));
		btnNode.style.backgroundColor = "rgb(203, 213, 225)";
		dataRef.current[dept] = text;

		switch (dept) {
			case "Condition":
				onMakeProgress(45);
				break;
			case "Size":
				onMakeProgress(55);
				break;
			case "Color":
				onMakeProgress(65);
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

	return (
		<Fragment>
			<Progress
				value={progressStatus}
				className="fixed z-10 h-1 rounded-none shadow-sm md:hidden"
			/>
			<main className="relative h-full p-4">
				<div className="grid grid-cols-2 gap-4" data-department="Condition">
					<div className="col-span-2 font-semibold">Condition</div>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Condition", "New / Never Worn", btnRef)}
					>
						New / Never Worn
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Condition", "Gently Used", btnRef)}
					>
						Gently Used
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Condition", "Used", btnRef)}
					>
						Used
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Condition", "Very Worn", btnRef)}
					>
						Very Worn
					</Button>
				</div>
				<div className="mt-8 grid grid-cols-2 gap-4" data-department="Size">
					<div className="col-span-4 font-semibold">Size</div>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "XXS", btnRef)}
					>
						XXS
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "XS", btnRef)}
					>
						XS
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "S", btnRef)}
					>
						S
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "M", btnRef)}
					>
						M
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "L", btnRef)}
					>
						L
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "XL", btnRef)}
					>
						XL
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "XXL", btnRef)}
					>
						XXL
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Size", "3XL", btnRef)}
					>
						3XL
					</Button>
				</div>
				<div className="mt-8 grid grid-cols-2 gap-4" data-department="Color">
					<div className="col-span-4 font-semibold">Color</div>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Black", btnRef)}
					>
						Black
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "White", btnRef)}
					>
						White
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Blue", btnRef)}
					>
						Blue
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Red", btnRef)}
					>
						Red
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Grey", btnRef)}
					>
						Grey
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Brown", btnRef)}
					>
						Brown
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Navy", btnRef)}
					>
						Navy
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Green", btnRef)}
					>
						Green
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Yellow", btnRef)}
					>
						Yellow
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Orange", btnRef)}
					>
						Orange
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Purple", btnRef)}
					>
						Purple
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Beige", btnRef)}
					>
						Beige
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Pink", btnRef)}
					>
						Pink
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Silver", btnRef)}
					>
						Silver
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Color", "Gold", btnRef)}
					>
						Gold
					</Button>
				</div>
				<div className="mt-8 font-semibold" data-department="Price" value={priceInputState}>
					Price
				</div>
				<Input placeholder="price" className="mt-4 w-full text-base" onChange={onPriceInput} />
				<Button
					className="justify-content bottom-0 mt-10 flex w-full items-center bg-sky-900"
					asChild
				>
					<Link href="/sell/mobile/stageFinal" onClick={onNextPage}>
						NEXT
					</Link>
				</Button>
			</main>
		</Fragment>
	);
}
