import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input as SearchInput } from "./ui/input";
import { DropDown, DropDownGroup, DropDownItem } from "@/components/SearchDropDownList";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Search({ children }) {
	const [search, setSearch] = useState("");
	const router = useRouter();

	const onEnter = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			router.push(`/shop/search?keyword=${search}`);
		}
	};

	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex">{children}</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<div className="md:flex md:h-12 md:w-full md:items-center md:justify-end">
							<SearchInput
								placeholder="Search"
								className="h-[45px] w-10/12 font-normal placeholder:text-info md:h-10 md:w-full"
								style={{ border: "none" }}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								onKeyDown={onEnter}
							></SearchInput>
						</div>
					</DialogTitle>
					<Separator className="!mt-0" />
					<DropDown>
						<DropDownGroup title="Designers">
							<DropDownItem>Yellow Hat</DropDownItem>
							<DropDownItem>Yellow Hat</DropDownItem>
							<DropDownItem>Yellow Hat</DropDownItem>
							<DropDownItem>Yellow Hat</DropDownItem>
						</DropDownGroup>
						<Separator className="!mt-0" />
						<DropDownGroup title="Listings">
							<DropDownItem>Yellow Hat</DropDownItem>
						</DropDownGroup>
					</DropDown>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
