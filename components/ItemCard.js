import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getDateDistance } from "@/lib/utils";
import { useState } from "react";
import { Dot } from "lucide-react";
import readMessage from "@/lib/queries/fetchQuery";
import { useDispatch, useSelector } from "react-redux";
import { setHasSeen, messageSelector } from "@/redux/messageSlice";

import Link from "next/link";

export default function ItemCard({
	src,
	children,
	timing,
	link,
	setIsOpen,
	read_at,
	message_id,
	chatroom_id_from_url,
}) {
	const [isSelected, setIsSelected] = useState(false);
	const dispatch = useDispatch();
	const hasSeen = useSelector(messageSelector).hasSeen;

	const onToggleSelect = () => {
		setIsSelected(true);
		setIsOpen();
		dispatch(setHasSeen(true));

		if (message_id)
			readMessage({
				uri: "/message",
				method: "PUT",
				body: {
					message_id,
				},
			});
	};

	return (
		<Link href={link || ""} onClick={onToggleSelect}>
			<Alert>
				<AlertDescription
					className={`flex w-[400px] cursor-pointer items-center justify-between rounded-md p-4 hover:bg-slate-100 ${
						isSelected && !timing ? "bg-slate-100" : ""
						// use chatroom_id_from_url to check if this itemCard is in the User's page Message section
						// because although hasSeen will turn off the gray background and the dot in the Header MessageIcon part
						// I still want the background to be gray if the user navigate to the User Message section to show which itemCard is currently selected
					} ${read_at && hasSeen && !chatroom_id_from_url ? "" : "bg-slate-100"}`}
				>
					<div className="flex">
						<div className="mr-2 flex shrink-0 items-center">
							<Avatar className="h-14 w-14">
								<AvatarImage src={src} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<div className="ml-1 line-clamp-2 w-full whitespace-break-spaces px-2">
								{children}
							</div>
							{timing && (
								<div className="ml-1 shrink-0 px-2 text-xs text-info">
									{getDateDistance(timing)}
								</div>
							)}
						</div>
					</div>
					{!read_at && !hasSeen && <Dot strokeWidth={5} color="#4932f5" className="shrink-0" />}
				</AlertDescription>
			</Alert>
		</Link>
	);
}
