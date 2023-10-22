import * as dotenv from "dotenv";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import MessageIcon from "./MessageIcon";
import { LuMessageCircle } from "react-icons/lu";
import MenuBar from "./MenuBar";
import { LuSearch } from "react-icons/lu";
import Search from "./Search";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { toggleRegisterForm } from "../redux/userSlice";
import { useDispatch } from "react-redux";

dotenv.config();

const homepage = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const NOTIFICATION_SERVER = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER;

export default function Header() {
	const [notification, setNotification] = useState([]);
	const [messageActive, setMessageActive] = useState(false);
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

	useEffect(() => {
		const eventSource = new EventSource(`${NOTIFICATION_SERVER}/events`, { withCredentials: true });

		eventSource.onmessage = (event) => {
			const newNotification = JSON.parse(event.data);
			console.log(newNotification, "newNotification");
			setNotification((prev) => [newNotification, ...prev]);
			setMessageActive(true);
		};
	}, []);

	const isUsingMobile = () => {
		if (typeof window !== "undefined") return window.innerWidth < 768; //&& navigator.maxTouchPoints > 0;
	};

	const onLogout = () => {
		signOut({ callbackUrl: homepage });
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
						<Link className="mr-2 inline-block hover:cursor-pointer" href="/sell">
							SELL
						</Link>
						<Link className="inline-block hover:cursor-pointer" href="/shop">
							SHOP
						</Link>
						<div
							className="inline-block hover:cursor-pointer"
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
									<LuSearch className="mx-1 h-7 w-7" />
								</Search>
							</div>
							{session && (
								<MessageIcon
									message={notification}
									messageActive={messageActive}
									onMessageIconClick={onMessageIconClick}
								/>
							)}
							{session && (
								<Link href={"/shoppingBag"}>
									<LuShoppingCart className="h-7 w-7 hover:cursor-pointer" />
								</Link>
							)}
							{session && (
								<Link className="inline-block hover:cursor-pointer" href="/user">
									<LuUser className="h-7 w-7" />
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
<Fragment>
			<div
				className="relative top-0 z-[19] flex h-16 w-full items-center justify-between bg-background px-3 py-2 shadow-md sm:px-6 sm:py-4 md:h-20 md:justify-between md:px-9 md:py-1 md:shadow-none"
				style={{ position: "sticky" }}
			>
				<MenuBar />
				<div className="md:flex md:w-1/6 md:justify-between">
					<Link className="hidden hover:cursor-pointer md:mr-2 md:inline-block" href="/sell">
						SELL
					</Link>
					<Link className="hidden hover:cursor-pointer md:inline-block" href="/shop">
						SHOP
					</Link>
					<div
						className="hidden hover:cursor-pointer md:inline-block"
						onClick={session ? onLogout : onToggleRegisterForm}
					>
						{session ? "LOGOUT" : "LOGIN"}
					</div>
				</div>
				<Logo className="absolute m-auto w-[20vw] md:w-[7vw]" />
				{session && <MessageIcon message={notification} />}

				<div className="md:text-md fixed bottom-0 right-0 z-8 flex w-full items-center justify-between bg-background px-5 py-3 md:relative md:flex md:w-1/6 md:justify-end">
					<div className="flex w-full items-center justify-around md:w-fit md:space-x-6">
						<div className="hidden md:inline-block" style={{ height: "28px" }}>
							<Search>
								<LuSearch className="mx-1 h-7 w-7 md:flex " />
							</Search>
						</div>

						<Link
							className="inline-block hover:cursor-pointer md:hidden"
							href="/sell/mobile/stageFirst"
						>
							SELL
						</Link>
						<Link className="inline-block hover:cursor-pointer md:hidden" href="/shop">
							SHOP
						</Link>
						<div
							className="inline-block hover:cursor-pointer md:hidden"
							onClick={session ? onLogout : onToggleRegisterForm}
						>
							{session ? "LOGOUT" : "LOGIN"}
						</div>
						<div className="inline-block hover:cursor-pointer md:hidden" style={{ height: "28px" }}>
							<Search>
								<LuSearch className="mx-1 h-7 w-7 md:flex " />
							</Search>
						</div>
						{session && (
							<Popover>
								<PopoverTrigger className="hidden md:inline-block">
									<div className="hidden md:relative md:flex ">
										<LuMessageCircle className="h-7 w-7" />
										<div className="absolute right-[1px] z-50 mb-3 h-2.5 w-2.5 rounded-full bg-red-700"></div>
									</div>
								</PopoverTrigger>
								<PopoverContent className="max-h-[80%]">
									<Alert>
										<AlertDescription className="flex items-center justify-between">
											<Avatar className="h-10 w-10">
												<AvatarImage src="https://github.com/shadcn.png" />
												<AvatarFallback>CN</AvatarFallback>
											</Avatar>
											<div className="ml-1 truncate px-2">123345677ssssssssssss86</div>
											<div className="shrink-0 text-xs text-info">3 min</div>
										</AlertDescription>
									</Alert>
								</PopoverContent>
							</Popover>
						)}
						{session && (
							<Link href={"/shoppingBag"}>
								<LuShoppingCart className="h-7 w-7 hover:cursor-pointer" />
							</Link>
						)}
						{session && (
							<Link className="hidden hover:cursor-pointer md:inline-block" href="/user">
								<LuUser className="h-7 w-7" />
							</Link>
						)}
						{session && (
							<Link className="inline-block hover:cursor-pointer md:hidden" href="/user/mobile">
								<LuUser className="h-7 w-7" />
							</Link>
						)}
					</div>
				</div>
			</div>
		</Fragment>
*/
