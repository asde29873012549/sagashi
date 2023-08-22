import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

import { useRef, useState } from "react";

export default function MenuBar() {
	const menuRef = useRef();
	const initialTouchRef = useRef();
	const endingTouchRef = useRef();
	const [open, setOpen] = useState(false);

	const onTouchStart = (e) => {
		initialTouchRef.current = e.touches[0].screenY;
	};
	const onTouchMove = (e) => {
		endingTouchRef.current = e.touches[0].screenY;
		const movement = endingTouchRef.current - initialTouchRef.current;
		menuRef.current.style.transform = `translateY(${movement}px)`;
	};

	const onTouchEnd = () => {
		const distance = endingTouchRef.current - initialTouchRef.current;
		if (Math.abs(distance) > 70) {
			menuRef.current.style.transform = "translateY(100vh)";
		}
		initialTouchRef.current = null;
		endingTouchRef.current = null;
	};

	const onTransitionEnd = (e) => {
		if (e.target.role) {
			setOpen(false);
		}
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
				className="h-[85vh] w-screen rounded-t-xl transition-transform duration-75"
				ref={menuRef}
				onTransitionEnd={onTransitionEnd}
			>
				<div
					className="h-10 w-full transition-all"
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				></div>
				<SheetHeader>
					<div className="flex items-center justify-center">
						<Button variant="ghost">Men</Button>
						<Button variant="ghost">Men</Button>
						<Button variant="ghost">Men</Button>
						<Button variant="ghost">Men</Button>
					</div>
				</SheetHeader>
				<Separator />
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>HOME</AccordionTrigger>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>NEW ARRIVALS</AccordionTrigger>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>DESIGNERS</AccordionTrigger>
						<AccordionContent>Acne Studios</AccordionContent>
						<AccordionContent>Maison Margiela</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger>CLOTHING</AccordionTrigger>
						<AccordionContent>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-5">
									<AccordionTrigger>Jackets</AccordionTrigger>
									<AccordionContent>Blazers</AccordionContent>
									<AccordionContent>Leather Jackets</AccordionContent>
								</AccordionItem>
							</Accordion>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-6">
									<AccordionTrigger>Blazers</AccordionTrigger>
									<AccordionContent>Short Blazers</AccordionContent>
									<AccordionContent>Long Jackets</AccordionContent>
								</AccordionItem>
							</Accordion>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-7">
									<AccordionTrigger>Knitwear</AccordionTrigger>
									<AccordionContent>Blue Knitwear</AccordionContent>
									<AccordionContent>goe Jackets</AccordionContent>
								</AccordionItem>
							</Accordion>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</SheetContent>
		</Sheet>
	);
}
