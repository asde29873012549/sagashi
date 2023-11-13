import { Fragment } from "react";
import ItemCard from "../../ItemCard";
import { Separator } from "@/components/ui/separator";

export default function MyItemSheet() {
	return (
		<Fragment>
			<ItemCard
				src="https://github.com/shadcn.png"
				postTime={
					<div className="flex items-center">
						<div className="mr-4 text-base text-foreground before:content-['NT']">600</div>
						<FilledPencil />
					</div>
				}
			>
				<div>
					<div className="w-fit">Yellow Hat</div>
					<div className="text-xs text-info">Maison Margiela</div>
				</div>
			</ItemCard>
			<Separator />
			<ItemCard
				src="https://github.com/shadcn.png"
				postTime={
					<div className="flex items-center">
						<div className="mr-4 text-base text-foreground before:content-['NT']">600</div>
						<FilledPencil />
					</div>
				}
			>
				<div>
					<div className="w-fit">Yellow Hat</div>
					<div className="text-xs text-info">Maison Margiela</div>
				</div>
			</ItemCard>
			<Separator />
			<ItemCard
				src="https://github.com/shadcn.png"
				postTime={
					<div className="flex items-center">
						<div className="mr-4 text-base text-foreground before:content-['NT']">600</div>
						<FilledPencil />
					</div>
				}
			>
				<div>
					<div className="w-fit">Yellow Hat</div>
					<div className="text-xs text-info">Maison Margiela</div>
				</div>
			</ItemCard>
			<Separator />
			<ItemCard
				src="https://github.com/shadcn.png"
				postTime={
					<div className="flex items-center">
						<div className="mr-4 text-base text-foreground before:content-['NT']">600</div>
						<FilledPencil />
					</div>
				}
			>
				<div>
					<div className="w-fit">Yellow Hat</div>
					<div className="text-xs text-info">Maison Margiela</div>
				</div>
			</ItemCard>
			<Separator />
			<ItemCard
				src="https://github.com/shadcn.png"
				postTime={
					<div className="flex items-center">
						<div className="mr-4 text-base text-foreground before:content-['NT']">600</div>
						<FilledPencil />
					</div>
				}
			>
				<div>
					<div className="w-fit">Yellow Hat</div>
					<div className="text-xs text-info">Maison Margiela</div>
				</div>
			</ItemCard>
		</Fragment>
	);
}

function FilledPencil() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
			<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
		</svg>
	);
}
