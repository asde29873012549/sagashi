import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import getUserDraft from "@/lib/queries/fetchQuery";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProductDialog from "../EditProductDialog";

export default function MyDraft({ user }) {
	const { data: draftData } = useQuery({
		queryKey: ["products", "draft", user],
		queryFn: () =>
			getUserDraft({
				uri: `/listing/draft/${user}`,
				method: "GET",
			}),
		refetchOnWindowFocus: false,
	});

	console.log(draftData);

	return (
		<div>
			{draftData?.data?.map((draft, index) => {
				return <MyItemCard key={`${index}-draft`} draftData={draft} user={user} />;
			})}
		</div>
	);
}

function MyItemCard({ draftData, user }) {
	const [isOpen, setIsOpen] = useState(false);

	const onEditProduct = (id) => {
		setIsOpen(true);
	};
	return (
		<>
			<div className="flex h-28 w-full items-center space-x-4 rounded-md px-3 py-2 hover:bg-slate-200">
				<Avatar className="h-20 w-20">
					<AvatarImage src={draftData?.primary_image || ""} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="flex w-full justify-between">
					<span>
						<div className="text-base font-semibold">Product Name : {draftData?.name}</div>
						<div className="text-sm italic underline">{draftData?.Designer?.name}</div>
						<div className="text-sm">Size {draftData?.Size?.name}</div>
					</span>
					<span className="flex flex-col items-end text-sm">
						<div>{draftData?.condition}</div>
						<div className="before:content-['$']">{draftData?.price}</div>
						<Button
							variant="secondary"
							className="mt-3 h-8 hover:bg-sky-900 hover:text-background"
							onClick={() => onEditProduct(draftData?.id)}
						>
							Edit
						</Button>
					</span>
				</div>
			</div>
			<Separator />
			{isOpen && (
				<EditProductDialog
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					productData={draftData}
					user={user}
					isDraft={true}
				/>
			)}
		</>
	);
}
