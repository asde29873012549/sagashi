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

	const user = session?.user?.username ?? "";

	useEffect(() => {
		if (user) {
			const eventSource = new EventSource(`${NOTIFICATION_SERVER}/events`, {
				withCredentials: true,
			});

			eventSource.onmessage = (event) => {
				const newNotification = JSON.parse(event.data);
				setNotification((prev) => [newNotification, ...prev]);
				setMessageActive(true);
			};
		}
	}, [user]);

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
