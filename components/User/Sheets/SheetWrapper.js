import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyItem from "./MyItemSheet";
import MyProfile from "./EditProfileSheet";
import MyAddress from "./AddAddressSheet";
import EditAddress from "./EditAddressSheet";
import MyLanguage from "./EditLanguageSheet";
import MyCountry from "./EditCountrySheet";
import ContactUs from "./ContactUsForm";
import ChangePassword from "./ChangePasswordSheet";

export default function SheetWrapper({
	user,
	trigger,
	feature,
	setFeature,
	sheet,
	side = "bottom",
	className = "h-[90%] overflow-scroll",
	addressData,
	open,
	setOpen,
}) {
	const featureActionMap = {
		"My Profile": `/user/${user?.data.username}/info`,
		"My Address": `/user/${user?.data.username}/shippingAddress`,
		"Edit Address": `/user/${user?.data.username}/shippingAddress`,
		"My Country": `/user/${user?.data.username}/info`,
	};

	const sheets = {
		MyItem: <MyItem setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyProfile: <MyProfile setOpen={setOpen} uri={featureActionMap[feature]} user={user} />,
		MyAddress: <MyAddress setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyLanguage: <MyLanguage setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyCountry: <MyCountry setOpen={setOpen} uri={featureActionMap[feature]} />,
		ContactUs: <ContactUs setOpen={setOpen} uri={featureActionMap[feature]} />,
		ChangePassword: <ChangePassword />,
		EditAddress: (
			<EditAddress
				setOpen={setOpen}
				uri={featureActionMap[feature]}
				addressData={addressData}
				setFeature={setFeature}
			/>
		),
	};

	return (
		<Sheet open={open} setOpen={setOpen}>
			<SheetTrigger>{trigger}</SheetTrigger>
			<SheetContent side={side} className={className}>
				<SheetHeader>
					<SheetTitle>{feature}</SheetTitle>
					{sheets[sheet]}
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
