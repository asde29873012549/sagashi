import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import ListDrawerItem from "./ListDrawer/item";

import getFeaturedDesigners from "@/lib/queries/fetchQuery";
import getTree from "@/lib/queries/fetchQuery";
import ListDrawer from "./ListDrawer";

import { useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Spinner from "./Spinner";

export default function MenuBar() {
	const menuRef = useRef();
	const initialTouchRef = useRef();
	const endingTouchRef = useRef();
	const isTouchActiveRef = useRef(false);
	const [open, setOpen] = useState(false);
	const [currentTab, setCurrentTab] = useState("Menswear");
	const [currentCategory, setCurrentCategory] = useState("");

	const { data: treeData } = useQuery({
		queryKey: ["tree"],
		queryFn: () => getTree({ uri: "/tree" }),
	});

	const {
		data: designerData,
		isError: designerError,
		isLoading: designerLoading,
	} = useQuery({
		queryKey: ["featuredDesingers"],
		queryFn: () => getFeaturedDesigners({ uri: "/designer/featured" }),
	});

	const category = treeData?.data.Category[currentTab] ?? {};

	const onTouchStart = (e) => {
		isTouchActiveRef.current = true;
		initialTouchRef.current = e.touches[0].screenY;
	};
	const onTouchMove = (e) => {
		endingTouchRef.current = e.touches[0].screenY;
		const movement = endingTouchRef.current - initialTouchRef.current;
		menuRef.current.style.transform = `translateY(${movement}px)`;
		//console.log(movement)
	};

	const onTouchEnd = () => {
		isTouchActiveRef.current = false;
		const distance = endingTouchRef.current - initialTouchRef.current;
		menuRef.current.style.transform =
			Math.abs(distance) > 70 ? "translateY(100vh)" : "translateY(0)";
	};

	const onTransitionEnd = (e) => {
		if (isTouchActiveRef.current) return;
		if (e.target.role && endingTouchRef.current - initialTouchRef.current > 70) {
			setOpen(false);
		}

		initialTouchRef.current = null;
		endingTouchRef.current = null;
	};

	const onChangeTab = (e) => {
		setCurrentTab(e.target.id);
	};

	const onGoBack = () => {
		setCurrentCategory("All");
	};

	return (
		<Sheet open={open} setOpen={setOpen}>
			<SheetTrigger className="flex h-6 w-6 flex-col justify-between md:hidden">
				<hr className="h-0.5 w-full border-0 bg-foreground" />
				<hr className="h-0.5 w-full border-0 bg-foreground" />
				<hr className="h-0.5 w-full border-0 bg-foreground" />
				<hr className="h-0.5 w-full border-0 bg-foreground" />
			</SheetTrigger>
			<SheetContent
				side="bottom"
				className="h-[95dvh] w-screen rounded-t-xl px-0 pt-0 transition-transform duration-75"
				ref={menuRef}
				onTransitionEnd={onTransitionEnd}
			>
				{designerLoading ? (
					<Spinner shouldNotCover={true} />
				) : (
					<>
						<div
							className="h-12 w-full"
							onTouchStart={onTouchStart}
							onTouchMove={onTouchMove}
							onTouchEnd={onTouchEnd}
						>
							{currentCategory && (
								<ChevronLeft className="absolute left-4 top-4 h-4 w-4" onClick={onGoBack} />
							)}
							<div className="flex h-full w-full items-center justify-center">
								<span
									className={`text-base transition-opacity duration-200 ${
										currentCategory ? "opacity-1" : "opacity-0"
									}`}
								>
									{currentCategory}
								</span>
							</div>
						</div>
						<SheetHeader>
							<div className={`flex items-center justify-center ${currentCategory && "hidden"}`}>
								<Button
									variant="ghost"
									className={`w-1/2 rounded-b-none ${currentTab === "Menswear" && "bg-gray-200"}`}
									id="Menswear"
									onClick={onChangeTab}
								>
									MENSWEAR
								</Button>
								<Button
									variant="ghost"
									className={`w-1/2 rounded-b-none ${currentTab === "Womenswear" && "bg-gray-200"}`}
									id="Womenswear"
									onClick={onChangeTab}
								>
									WOMENSWEAR
								</Button>
							</div>
						</SheetHeader>
						<Separator />
						<div className="relative h-full w-screen overflow-y-scroll font-light">
							<ListDrawerItem>{currentTab} Homepage</ListDrawerItem>
							<ListDrawerItem>New Arrivals</ListDrawerItem>
							<ListDrawer
								data={designerData?.data}
								currentCategory={currentCategory}
								setCurrentCategory={setCurrentCategory}
							>
								Designers
							</ListDrawer>
							{Object.keys(category).map((key, index) => (
								<ListDrawer
									key={`${index}-${key}`}
									data={category[key].sub}
									currentCategory={currentCategory}
									setCurrentCategory={setCurrentCategory}
								>
									{key}
								</ListDrawer>
							))}
						</div>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
