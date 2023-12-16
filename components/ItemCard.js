import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getDateDistance } from "@/lib/utils";
import { useState, useRef } from "react";
import { Dot } from "lucide-react";
import readMessage from "@/lib/queries/fetchQuery";
import { useDispatch, useSelector } from "react-redux";
import {
	setMessageReadStatus,
	messageSelector,
	setCurrentActiveChatroom,
	setNotificationReadStatus,
	setCurrentTab,
} from "@/redux/messageSlice";

import Link from "next/link";

export default function ItemCard({
	user, // only Messages section will have user
	src,
	children,
	timing, // only notificationIcon will have timing
	link, // only itemCards in the header messageIcon or notificationIcon will have link
	setIsOpen,
	read_at, // only messageIcon and Messages Section will have read_at
	message_id, // only messageIcon and Messages Section will have message_id
	chatroom_id, // only messageIcon and Messages Section will have chatroom_id
	notification_id, // only notificationIcon will have notification_id
}) {
	const dispatch = useDispatch();
	const messageReadMap = useSelector(messageSelector).isMessageReadMap;
	const notificationReadMap = useSelector(messageSelector).isNotificationReadMap;
	const currentActiveChatroom = useSelector(messageSelector).currentActiveChatroom;
	const hasMsgSeen = messageReadMap[chatroom_id];
	const hasNotiSeen = notificationReadMap[notification_id];

	const isNotificationItemCard = useRef(notification_id ? true : false);

	const isItemCardActiveMsgVersion =
		!(currentActiveChatroom === chatroom_id) && !read_at && !hasMsgSeen;
	const isItemCardActiveNotiVersion = !read_at && !hasNotiSeen;

	const onToggleSelect = () => {
		setIsOpen();
		chatroom_id && dispatch(setMessageReadStatus(chatroom_id));
		chatroom_id && dispatch(setCurrentActiveChatroom(chatroom_id));
		notification_id && dispatch(setNotificationReadStatus(`${notification_id}`));
		user && dispatch(setCurrentTab((chatroom_id?.split("-")[1] ?? "") === user ? "sell" : "buy"));

		console.log("message_id", message_id, "notification_id", notification_id);

		if (message_id) {
			readMessage({
				uri: "/message",
				method: "PUT",
				body: {
					message_id,
				},
			});
		} else if (notification_id) {
			readMessage({
				uri: "/notification",
				method: "PUT",
				body: {
					notification_id,
				},
			});
		}
	};

	return (
		<Link href={link || ""} onClick={onToggleSelect} scroll={false}>
			<Alert>
				<AlertDescription
					className={`flex w-[400px] cursor-pointer items-center justify-between rounded-md p-4 hover:bg-slate-100 ${
						currentActiveChatroom === chatroom_id && !link ? "bg-slate-200 hover:bg-slate-200" : ""
						// use chatroom_id_from_url to check if this itemCard is in the User's page Message section
						// because although hasMsgSeen will turn off the gray background and the dot in the Header MessageIcon part
						// I still want the background to be gray if the user navigate to the User Message section to show which itemCard is currently selected
					} ${hasMsgSeen ? "" : hasNotiSeen ? "" : "bg-slate-100"}`}
				>
					<div className="flex w-full">
						<div className="mr-2 w-2/12 items-center">
							<Avatar className="aspect-square w-full">
								<AvatarImage src={src} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
						</div>
						<div style={{ width: "77%" }}>
							<div className="ml-1 line-clamp-2 w-full whitespace-break-spaces px-2">
								{children}
							</div>
							{timing && (
								<div className="ml-1 shrink-0 px-2 text-xs text-info">
									{getDateDistance(timing)}
								</div>
							)}
						</div>
						{isNotificationItemCard.current
							? isItemCardActiveNotiVersion && (
									<Dot strokeWidth={5} color="#4932f5" className="h-full shrink-0 self-center" />
							  )
							: isItemCardActiveMsgVersion && (
									<Dot strokeWidth={5} color="#4932f5" className="h-full shrink-0 self-center" />
							  )}
					</div>
				</AlertDescription>
			</Alert>
		</Link>
	);
}
