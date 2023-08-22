import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LuShirt, LuWallet } from "react-icons/lu";
import { PiPants, PiShirtFoldedBold } from "react-icons/pi";
import { TbJacket, TbShoe } from "react-icons/tb";
import { Progress } from "@/components/ui/progress";

import { useRef } from "react";

import { makeProgress, sellSelector } from "../../../redux/sellSlice";
import { useDispatch, useSelector } from "react-redux";

export default function MobilePreInfo() {
	const dispatch = useDispatch();
	const btnRef = useRef();
	const dataRef = useRef({
		Department: null,
		Category: null,
		SubCategory: null,
	});
	const progressStatus = useSelector(sellSelector).progress;

	const onBtnSelect = (e) => {
		const dept = e.currentTarget.parentNode.getAttribute("data-department");
		const text = e.currentTarget.innerText.trim();
		const btnMap = getMap(btnRef);
		const btnObj = btnMap.get(dept);
		const btnNode = btnObj[text];
		Object.values(btnObj).forEach((btn) => (btn.style.backgroundColor = "transparent"));
		btnNode.style.backgroundColor = "rgb(203, 213, 225)";
		dataRef.current[dept] = text;

		switch (dept) {
			case "Department":
				onMakeProgress(15);
				break;
			case "Category":
				onMakeProgress(25);
				break;
			case "SubCategory":
				onMakeProgress(35);
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

	return (
		<Fragment>
			<Progress
				value={progressStatus}
				className="fixed z-10 h-1 rounded-none shadow-sm md:hidden"
			/>
			<main className="p-4">
				<div className="grid grid-cols-2 gap-4" data-department="Department">
					<div className="col-span-2 font-semibold">Department</div>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Department", "Menswear", btnRef)}
					>
						Menswear
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Department", "Womenswear", btnRef)}
					>
						Womenswear
					</Button>
				</div>
				<div className="mt-6 grid grid-cols-2 gap-4" data-department="Category">
					<div className="col-span-2 font-semibold">Category</div>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Tops", btnRef)}
					>
						<LuShirt className="pointer-events-none" />
						<div>Tops</div>
					</Button>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Bottoms", btnRef)}
					>
						<PiPants />
						<div>Bottoms</div>
					</Button>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Outerwear", btnRef)}
					>
						<TbJacket />
						<div>Outerwear</div>
					</Button>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Footwear", btnRef)}
					>
						<TbShoe />
						<div>Footwear</div>
					</Button>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Tailoring", btnRef)}
					>
						<PiShirtFoldedBold />
						<div>Tailoring</div>
					</Button>
					<Button
						variant="outline"
						className="row-span-1 flex h-16 flex-col focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "Category", "Accessories", btnRef)}
					>
						<LuWallet />
						<div>Accessories</div>
					</Button>
				</div>
				<div className="mt-6 grid grid-cols-2 gap-4" data-department="SubCategory">
					<div className="col-span-2 font-semibold">SubCategory</div>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "Shirts", btnRef)}
					>
						Shirts
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "Sleeveless Shirt", btnRef)}
					>
						Sleeveless Shirt
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "T-shirt", btnRef)}
					>
						T-shirt
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "Long-Sleeve Shirt", btnRef)}
					>
						Long-Sleeve Shirt
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "Polos", btnRef)}
					>
						Polos
					</Button>
					<Button
						variant="outline"
						className="row-span-1 focus:bg-accent"
						onClick={(e) => onBtnSelect(e)}
						ref={(node) => getNode(node, "SubCategory", "Poncho", btnRef)}
					>
						Poncho
					</Button>
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
