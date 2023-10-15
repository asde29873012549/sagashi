import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function FilterSection({ filter = {}, setFilter }) {
	let filterArray = [];

	const filterKeys = Object.keys(filter);

	filterKeys.forEach((key) => {
		const temp = filter[key].map((item) => {
			if (item.cat) return { ...item, key };
			return { name: item, key };
		});
		filterArray = [...filterArray, ...temp];
	});

	const nameFormatter = (obj) => {
		if (obj.cat) return `${obj.dept} ${obj.cat} ${obj.name}`;
		return obj.name;
	};

	const onRemoveFilter = (item) => {
		if (item.cat) {
			filterArray = filterArray.filter(
				(obj) => `${obj.dept} ${obj.cat} ${obj.name}` !== `${item.dept} ${item.cat} ${item.name}`,
			);
			setFilter((prev) => ({
				...prev,
				[item.key]: prev[item.key].filter(
					(obj) => `${obj.dept} ${obj.cat} ${obj.name}` !== `${item.dept} ${item.cat} ${item.name}`,
				),
			}));
			return;
		}
		filterArray = filterArray.filter((obj) => obj.name !== item.name);
		setFilter((prev) => ({ ...prev, [item.key]: prev[item.key].filter((id) => id !== item.name) }));
		return;
	};

	const onRemoveAll = () => {
		filterArray = [];
		setFilter({});
	};

	return (
		filterArray.length > 0 && (
			<div className="h-fit w-screen flex-wrap p-2 md:flex md:px-6">
				{filterArray.map((obj, index) => (
					<Button
						variant="outline"
						className="group mx-2 my-2 min-w-fit space-x-2 hover:bg-red-900"
						key={`${index}`}
						onClick={() => onRemoveFilter(obj)}
					>
						<span className="group-hover:text-background">{nameFormatter(obj)}</span>
						<Ban className="h-4 w-4 group-hover:text-background" />
					</Button>
				))}
				<Button
					variant="ghost"
					className="mx-2 my-2 min-w-fit space-x-2 hover:underline"
					onClick={onRemoveAll}
				>
					<span className="group-hover:text-background">Clear All</span>
				</Button>
			</div>
		)
	);
}
