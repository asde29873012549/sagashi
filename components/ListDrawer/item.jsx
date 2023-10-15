import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ListDrawerItem({ children, currentCategory, item }) {
	return (
		<div className={`w-full hover:bg-slate-100 ${currentCategory !== item ? "h-0" : ""}`}>
			<div className="box-border flex justify-between px-4 py-3 text-accent-foreground">
				<span>{children}</span>
				<ChevronRight strokeWidth={1} />
			</div>
			<Separator className="w-full" />
		</div>
	);
}
