import * as dotenv from "dotenv";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import MessageIcon from "./MessageIcon";
import MenuBar from "./MenuBar";
import { LuSearch } from "react-icons/lu";
import Search from "./Search";

import { toggleRegisterForm } from "../redux/userSlice";
import { useDispatch } from "react-redux";

dotenv.config();

const homepage = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const NOTIFICATION_SERVER = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER;

export default function MobileHeader() {
	const [notification, setNotification] = useState([]);
	const dispatch = useDispatch();
	const { data: session } = useSession();
	const onToggleRegisterForm = () => dispatch(toggleRegisterForm());

	useEffect(() => {
		const eventSource = new EventSource(`${NOTIFICATION_SERVER}/events`, { withCredentials: true });

		eventSource.onmessage = (event) => {
			const newNotification = JSON.parse(event.data);
			setNotification((prev) => [...prev, newNotification]);
		};
	}, []);

	const isUsingMobile = () => {
		if (typeof window !== "undefined") return window.innerWidth < 768; //&& navigator.maxTouchPoints > 0;
	};

	const onLogout = () => {
		signOut({ callbackUrl: homepage });
	};

	return (
		isUsingMobile() && (
			<Fragment>
				<div className="relative top-0 z-[19] flex h-16 w-full items-center justify-between bg-background px-3 py-2 shadow-md sm:px-6 sm:py-4 md:hidden">
					<MenuBar />
					<Logo className="absolute m-auto w-[20vw]" />
					{session && <MessageIcon message={notification} />}
					<div className="text-md fixed bottom-0 right-0 z-8 flex w-full items-center justify-between bg-background px-5 py-3">
						<div className="flex w-full items-center justify-around">
							<Link className="inline-block hover:cursor-pointer" href="/sell/mobile/stageFirst">
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
							<div className="inline-block hover:cursor-pointer" style={{ height: "28px" }}>
								<Search>
									<LuSearch className="mx-1 h-7 w-7" />
								</Search>
							</div>
							{session && (
								<Link href={"/shoppingBag"}>
									<LuShoppingCart className="h-7 w-7 hover:cursor-pointer" />
								</Link>
							)}
							{session && (
								<Link className="inline-block hover:cursor-pointer" href="/user/mobile">
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
