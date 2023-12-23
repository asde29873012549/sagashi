import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import SheetWrapper from "@/components/User/Sheets/SheetWrapper";

export default function Info() {
	const router = useRouter();
	const infoSecRef = useRef();
	const [routes, setRoutes] = useState(router.query.slug);

	useEffect(() => {
		setRoutes(router.query.slug);
	}, [router.query.slug]);

	useEffect(() => {
		const Map = infoSecRef.current;
		Map.get(routes) &&
			Map.get(routes).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
	}, [routes]);

	const getMap = (ref) => {
		if (!ref.current) {
			ref.current = new Map();
		}
		return ref.current;
	};

	const getNode = (node, key, ref) => {
		const map = getMap(ref);
		const res = map.get(key);
		if (!res) {
			return map.set(key, node);
		}
		return res;
	};

	return (
		<main className="flex w-screen flex-col space-y-9 p-2 md:px-14 md:py-8">
			<section className="m-auto w-full md:w-4/6">
				<h1 className="my-2 text-2xl font-semibold md:my-4">Customer Service</h1>
				<Accordion type="single" value={routes} onValueChange={setRoutes} collapsible>
					<AccordionItem value="order&delivery">
						<AccordionTrigger ref={(node) => getNode(node, "order&delivery", infoSecRef)}>
							Order & Delivery
						</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="return&refund">
						<AccordionTrigger ref={(node) => getNode(node, "return&refund", infoSecRef)}>
							Return & Refund
						</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="contactus">
						<AccordionTrigger ref={(node) => getNode(node, "contactus", infoSecRef)}>
							Contact Us
						</AccordionTrigger>
						<AccordionContent>
							<SheetWrapper
								trigger={<div className="text-sm hover:underline">Contact us through email</div>}
								feature="Contact Us"
								sheet="ContactUs"
								side="right"
								className="h-full w-[90%] md:w-1/4"
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>
			<section className="m-auto w-full md:w-4/6">
				<h1 className="my-2 text-2xl font-semibold md:my-4">Information</h1>
				<Accordion type="single" value={routes} onValueChange={setRoutes} collapsible>
					<AccordionItem value="faqs">
						<AccordionTrigger ref={(node) => getNode(node, "faqs", infoSecRef)}>
							FAQs
						</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="terms&conditions">
						<AccordionTrigger ref={(node) => getNode(node, "order&delivery", infoSecRef)}>
							TERMS & CONDITIONS
						</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="privacypolicy">
						<AccordionTrigger ref={(node) => getNode(node, "privacypolicy", infoSecRef)}>
							PRIVACY POLICY
						</AccordionTrigger>
						<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>
			<section className="m-auto my-10 flex w-full flex-col md:w-4/6">
				<h1 className="text-lg">Do you find these information helpful?</h1>
				<div className="mt-5 flex flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0">
					<Button className="w-full md:w-24">Yes</Button>
					<Button className="w-full md:w-24">No</Button>
				</div>
			</section>
		</main>
	);
}
