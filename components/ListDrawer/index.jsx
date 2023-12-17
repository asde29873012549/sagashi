import ListDrawerItem from "./item";
import { useRouter } from "next/router";

import { useRef } from "react";

const slideThreshold = 100;

export default function ListDrawer({
	data,
	children,
	currentCategory,
	setCurrentCategory,
	setOpen,
	currentTab,
}) {
	const router = useRouter();
	const initialTouchRef = useRef();
	const endingTouchRef = useRef();
	const isTouchActiveRef = useRef(false);
	const pageRef = useRef();

	const onSwitch = () => {
		setCurrentCategory(children);
		pageRef.current.style.transform = `translateX(0px)`;
	};

	const onTouchStart = (e) => {
		e.preventDefault();

		isTouchActiveRef.current = true;
		initialTouchRef.current = e.touches[0].screenX;
	};
	const onTouchMove = (e) => {
		endingTouchRef.current = e.touches[0].screenX;
		let movement = endingTouchRef.current - initialTouchRef.current;
		movement = movement > slideThreshold ? movement : 0;
		pageRef.current.style.transform = `translateX(${movement}px)`;
	};

	const onTouchEnd = () => {
		isTouchActiveRef.current = false;
		const distance = endingTouchRef.current - initialTouchRef.current;
		if (distance > slideThreshold) {
			pageRef.current.style.transform = `translateX(${pageRef.current.offsetWidth}px)`;
			setTimeout(() => setCurrentCategory(""), 500);
		} else {
			pageRef.current.style.transform = "translateX(0px)";
			setTimeout(() => setCurrentCategory(children), 500);
		}

		initialTouchRef.current = null;
		endingTouchRef.current = null;
	};

	const onNavigatePage = (obj) => {
		console.log(obj, children);
		setOpen(false);
		if (children === "Designers") {
			return router.push(`/designers/${obj?.id}`);
		}

		return router.push(`/shop?dept=${currentTab || ""}&cat=${children}&subCat=${obj.name}`);
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
						<ListDrawerItem
							key={obj.id}
							currentCategory={currentCategory}
							item={children}
							onNavigatePage={() => onNavigatePage(obj)}
						>
							{obj.name || obj.Designer.name}
						</ListDrawerItem>
					))}
			</div>
		</div>
	);
}
