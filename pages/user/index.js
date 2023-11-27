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
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import getUser from "@/lib/queries/fetchQuery";
import { getToken } from "next-auth/jwt";

import { useState } from "react";
import Link from "next/link";

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export default function User({ user }) {
	const { data: userData } = useQuery({
		queryKey: ["userData"],
		queryFn: () => getUser({ uri: `/user/${user}/info` }),
		refetchOnWindowFocus: false,
	});

	const [displayFeature, setDisplayFeature] = useState(<ProfileInfo userData={userData} />);
	const [feature, setFeature] = useState("My Profile");
	const [open, setOpen] = useState(false);

	const [addressData, setAddressData] = useState(null);

	const onProfileClick = () => {
		setDisplayFeature(<ProfileInfo userData={userData} />);
		setFeature("My Profile");
	};

	const onMyItemsClick = () => {
		setDisplayFeature(<MyItem />);
		setFeature("My Items");
	};

	const onMyAddressClick = () => {
		setDisplayFeature(
			<AddressInfo
				userData={userData}
				setFeature={setFeature}
				setAddressData={setAddressData}
				setOpen={setOpen}
			/>,
		);
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
		setFeature("About");
	};

	return (
		<div className="w-screen px-20 py-5">
			<header className="flex items-center justify-between pb-8">
				<div className="flex items-center space-x-4 ">
					<Avatar className="mr-8 h-40 w-40 text-base">
						<AvatarImage src={userData?.data.avatar} />
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
					<div>{userData?.data.follower_count ?? 0} Followers</div>
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
					<Link href="/info/terms&conditions">
						<Button variant="link" className="group flex w-fit flex-col">
							<p>Terms & Conditions</p>
							<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
						</Button>
					</Link>
					<Link href="/info/privacypolicy">
						<Button variant="link" className="group flex w-fit flex-col">
							<p>Privacy Policy</p>
							<hr className="h-px w-0 border-foreground transition-all duration-300 ease-in-out group-hover:w-full" />
						</Button>
					</Link>
					<SheetWrapper
						trigger={
							<div
								onClick={onAboutClick}
								className="group inline-flex w-fit flex-col items-center justify-center px-4 py-2 text-sm font-medium text-primary"
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
					<div className="text-2xl font-bold tracking-wider">
						{feature === "Edit Address" ? "My Address" : feature}
					</div>
					<div>
						<div>{displayFeature}</div>
						{feature !== "My Items" && feature !== "Contact Us" && (
							<SheetWrapper
								user={userData}
								addressData={addressData}
								trigger={
									<div className="mt-10 flex h-10 w-36 items-center justify-center rounded-md bg-sky-900 text-background hover:bg-sky-950">
										{feature === "My Address" || feature === "Edit Address" ? "Add" : "Edit"}
									</div>
								}
								feature={feature}
								setFeature={setFeature}
								sheet={feature.split(" ").join("")}
								side="right"
								className="w-5/12"
								open={open}
								setOpen={setOpen}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getServerSideProps({ req }) {
	const queryClient = new QueryClient();
	const token = await getToken({ req, secret: JWT_TOKEN_SECRET });
	const username = token.username;
	const accessToken = token.accessToken;

	await queryClient.prefetchQuery({
		queryKey: ["userData"],
		queryFn: () => getUser({ uri: `/user/${username}/info`, server: true, token: accessToken }),
	});

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			user: username,
		},
	};
}
