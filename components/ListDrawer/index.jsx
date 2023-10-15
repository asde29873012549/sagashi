import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import ListDrawerItem from "./item";

import { useRef, useState } from "react";
import { is } from "date-fns/locale";

export default function ListDrawer({ data, children, currentCategory, setCurrentCategory }) {
	const initialTouchRef = useRef();
	const endingTouchRef = useRef();
	const isTouchActiveRef = useRef(false);
	const pageRef = useRef();

	const onSwitch = () => {
		setCurrentCategory(children);
		pageRef.current.style.transform = `translateX(0px)`;
	};

	const onTouchStart = (e) => {
		isTouchActiveRef.current = true;
		initialTouchRef.current = e.touches[0].screenX;
	};
	const onTouchMove = (e) => {
		endingTouchRef.current = e.touches[0].screenX;
		pageRef.current.style.transform = `translateX(${
			endingTouchRef.current - initialTouchRef.current
		}px)`;
	};

	const onTouchEnd = () => {
		isTouchActiveRef.current = false;
		const distance = endingTouchRef.current - initialTouchRef.current;
		if (Math.abs(distance) > 30) {
			pageRef.current.style.transform = `translateX(${pageRef.current.offsetWidth}px)`;
			setTimeout(() => setCurrentCategory(""), 500);
		} else {
			pageRef.current.style.transform = "translateX(0px)";
			setTimeout(() => setCurrentCategory(children), 500);
		}

		initialTouchRef.current = null;
		endingTouchRef.current = null;
	};

	return (
		<div className="font-light" onClick={onSwitch}>
			<ListDrawerItem>{children}</ListDrawerItem>
			<div
				className={`absolute top-0 box-border h-full w-0 translate-x-full bg-white transition-transform duration-500 ${
					currentCategory !== children ? "invisible opacity-0" : "w-full"
				}`}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				ref={pageRef}
			>
				{children === "Designers" && <ListDrawerItem>View All</ListDrawerItem>}
				{data &&
					data.map((obj) => (
						<ListDrawerItem key={obj.id} currentCategory={currentCategory} item={children}>
							{obj.name || obj.Designer.name}
						</ListDrawerItem>
					))}
			</div>
		</div>
	);
}
