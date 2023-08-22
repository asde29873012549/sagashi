import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input as SearchInput } from "./ui/input";

export default function Search({ children }) {
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
							></SearchInput>
						</div>
					</DialogTitle>
					<DialogDescription style={{ margin: "0px" }}></DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
