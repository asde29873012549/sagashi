import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import MyItem from "../../components/User/Sheets/MyItemSheet";
import ContactUs from "../../components/User/Sheets/ContactUsForm";

import ProfileInfo from "../../components/User/ProfileInfo";
import AddressInfo from "../../components/User/AddressInfo";
import LanguageInfo from "../../components/User/LanguageInfo";
import CountryInfo from "../../components/User/CountryInfo";
import About from "../../components/User/About";
import SheetWrapper from "@/components/User/Sheets/SheetWrapper";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function User() {
	const [displayFeature, setDisplayFeature] = useState(<ProfileInfo />);
	const [feature, setFeature] = useState("My Profile");
	const { data: session } = useSession();
	const user = session?.user?.username ?? "";

	const onProfileClick = () => {
		setDisplayFeature(<ProfileInfo />);
		setFeature("My Profile");
	};

	const onMyItemsClick = () => {
		setDisplayFeature(<MyItem />);
		setFeature("My Items");
	};

	const onMyAddressClick = () => {
		setDisplayFeature(<AddressInfo />);
		setFeature("My Address");
	};

	const onMyLanguageClick = () => {
		setDisplayFeature(<LanguageInfo />);
		setFeature("My Language");
	};

	const onMyCountryClick = () => {
		setDisplayFeature(<CountryInfo />);
		setFeature("My Country");
	};

	const onContactUsClick = () => {
		setDisplayFeature(<ContactUs rows="10" />);
		setFeature("Contact Us");
	};

	const onAboutClick = () => {
		setDisplayFeature(<About />);
	};

	return (
		<div className="w-screen px-20 py-5">
			<header className="flex items-center justify-between pb-8">
				<div className="flex items-center space-x-4 ">
					<Avatar className="mr-8 h-40 w-40 text-base">
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="text-xl font-semibold">{user}</div>
					<div className="h-14 ">
						<Separator orientation="vertical" />
					</div>
					<div>0 Transactions</div>
					<div className="h-14">
						<Separator orientation="vertical" />
					</div>
					<div>0 Followers</div>
				</div>

				<Link href={`/user/public/${user}`}>
					<Button className="bg-sky-900 hover:bg-sky-950">View Public Profile</Button>
				</Link>
			</header>
			<Separator />
			<div className="mt-5  flex">
				<div className="flex  w-1/5 flex-col items-start space-y-1">
					<Button variant="link" onClick={onProfileClick} className="group flex w-fit flex-col">
						<p>Profile</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onMyItemsClick} className="group flex w-fit flex-col">
						<p>My Items</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onMyAddressClick} className="group flex w-fit flex-col">
						<p>Shipping Address</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onMyLanguageClick} className="group flex w-fit flex-col">
						<p>Language</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onMyCountryClick} className="group flex w-fit flex-col">
						<p>Country / Region</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onContactUsClick} className="group flex w-fit flex-col">
						<p>Contact Us</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onAboutClick} className="group flex w-fit flex-col">
						<p>About</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onAboutClick} className="group flex w-fit flex-col">
						<p>Terms & Conditions</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<Button variant="link" onClick={onAboutClick} className="group flex w-fit flex-col">
						<p>Privacy Policy</p>
						<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
					</Button>
					<SheetWrapper
						trigger={
							<div
								onClick={onAboutClick}
								className="group flex inline-flex w-fit flex-col items-center justify-center px-4 py-2 text-sm font-medium text-primary"
							>
								<p>Change Password</p>
								<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
							</div>
						}
						feature="Change Password"
						sheet="ChangePassword"
						side="right"
						className="w-5/12"
					/>
				</div>
				<div className="flex w-4/5 flex-col space-y-4">
					<div className="text-2xl font-bold tracking-wider">{feature}</div>
					<div>
						<div>{displayFeature}</div>
						{feature !== "My Items" && feature !== "Contact Us" && (
							<SheetWrapper
								trigger={
									<div className="mt-10 flex h-10 w-36 items-center justify-center rounded-md bg-sky-900 text-background hover:bg-sky-950">
										Edit
									</div>
								}
								feature={feature}
								sheet={feature.split(" ").join("")}
								side="right"
								className="w-5/12"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
