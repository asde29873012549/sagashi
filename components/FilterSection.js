import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function FilterSection({ filter = [] }) {
	return (
		filter.length > 0 && (
			<div className="h-16 space-x-4 p-2 md:flex md:px-6">
				{filter.map((filter, index) => (
					<Button variant="outline" className="group space-x-2" key={`${index}-${filter.value}`}>
						<span>{filter.value}</span>
						<Ban className="h-4 w-4 group-hover:text-rose-900" />
					</Button>
				))}
			</div>
		)
	);
}
