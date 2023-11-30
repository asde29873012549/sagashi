import * as dotenv from "dotenv";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ShoppingCart, User, Search as SearchIcon } from "lucide-react";
import NotificationHeartIcon from "./NotificationHeartIcon";
import MessageIcon from "./MessageIcon";
import MenuBar from "./MenuBar";
import Search from "./Search";

import { toggleRegisterForm } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import getNotification from "@/lib/queries/fetchQuery";
import getMessages from "@/lib/queries/fetchQuery";

dotenv.config();

const homepage = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const NOTIFICATION_SERVER = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER;

export default function Header() {
	const [onlineNotification, setOnlineNotification] = useState([]);
	const [onlineMessage, setOnlineMessage] = useState([]);
	const [notificationActive, setNotificationActive] = useState(false);
	const [messageActive, setMessageActive] = useState(false);
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

	const user = session?.user?.username ?? "";

	const { data: notificationData, refetch: notificationRefetch } = useQuery({
		queryKey: ["notification"],
		queryFn: () =>
			getNotification({
				uri: "/notification",
			}),
		refetchOnWindowFocus: false,
	});

	const { data: messageData, refetch: messageRefetch } = useQuery({
		queryKey: ["messageList"],
		queryFn: () =>
			getMessages({
				uri: "/message",
			}),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (user) {
			const eventSource = new EventSource(`${NOTIFICATION_SERVER}/events`, {
				withCredentials: true,
			});

			eventSource.onmessage = (event) => {
				const newNotification = JSON.parse(event.data);
				if (newNotification.type === "notification.message") {
					setOnlineMessage((prev) => [newNotification, ...prev]);
					setMessageActive(true);
				} else {
					setOnlineNotification((prev) => [newNotification, ...prev]);
					setNotificationActive(true);
				}
			};

			notificationRefetch();
		}
	}, [user, notificationRefetch]);

	const isUsingMobile = () => {
		if (typeof window !== "undefined") return window.innerWidth < 768; //&& navigator.maxTouchPoints > 0;
	};

	const onLogout = () => {
		signOut({ callbackUrl: homepage });
	};

	const onNotificationHeartIconClick = () => {
		setNotificationActive(false);
	};

	const onMessageIconClick = () => {
		setMessageActive(false);
	};

	return (
		!isUsingMobile() && (
			<Fragment>
				<div className="top-0 z-[19] hidden w-full bg-background md:relative md:flex md:h-20 md:items-center md:justify-between md:px-9 md:py-1 md:shadow-none">
					<MenuBar />
					<div className="flex w-1/6 justify-between">
						<Link className="mr-2 inline-block w-1/4 hover:cursor-pointer" href="/sell">
							SELL
						</Link>
						<Link className="inline-block w-1/4 hover:cursor-pointer" href="/shop">
							SHOP
						</Link>
						<div
							className={`${
								status === "loading" ? "invisible opacity-0" : "inline-block"
							} w-1/3 hover:cursor-pointer`}
							onClick={session ? onLogout : onToggleRegisterForm}
						>
							{session ? "LOGOUT" : "LOGIN"}
						</div>
					</div>
					<Logo className="absolute m-auto w-[7vw]" />
					<div className="text-md flex w-1/6 justify-end">
						<div className="flex w-fit space-x-6">
							<div className="inline-block" style={{ height: "28px" }}>
								<Search>
									<SearchIcon className="mx-1 h-7 w-7" />
								</Search>
							</div>
							{session && (
								<NotificationHeartIcon
									onlineNotification={onlineNotification}
									notificationActive={notificationActive}
									onNotificationHeartIconClick={onNotificationHeartIconClick}
									offlineNotification={notificationData?.data ?? []}
								/>
							)}
							{session && (
								<MessageIcon
									user={user}
									onlineMessage={onlineMessage}
									messageActive={messageActive}
									onMessageIconClick={onMessageIconClick}
									offlineMessage={messageData?.data ?? []}
								/>
							)}
							{session && (
								<Link href={"/shoppingBag"}>
									<ShoppingCart className="h-7 w-7 hover:cursor-pointer" />
								</Link>
							)}
							{session && (
								<Link className="inline-block hover:cursor-pointer" href="/user">
									<User className="h-7 w-7" />
								</Link>
							)}
						</div>
					</div>
				</div>
			</Fragment>
		)
	);
}

/*
<Popover>
								<PopoverTrigger className="inline-block hover:cursor-pointer">
									<User className="h-7 w-7" />
								</PopoverTrigger>
								<PopoverContent className="w-20 h-fit box-border">
									<div className="p-2 hover:cursor-pointer text-sm font-semibold text-foreground hover:bg-gray-100">Profile</div>
									<div className="p-2 hover:cursor-pointer text-sm font-semibold text-foreground hover:bg-gray-100">Edit</div>
								</PopoverContent>
							  </Popover>
*/
