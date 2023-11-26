import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MyItem from "./MyItemSheet";
import MyProfile from "./EditProfileSheet";
import MyAddress from "./AddAddressSheet";
import MyLanguage from "./EditLanguageSheet";
import MyCountry from "./EditCountrySheet";
import ContactUs from "./ContactUsForm";
import ChangePassword from "./ChangePasswordSheet";

export default function SheetWrapper({
	user,
	trigger,
	feature,
	sheet,
	side = "bottom",
	className = "h-[90%] overflow-scroll",
}) {
	const [open, setOpen] = useState(false);

	const featureActionMap = {
		"My Profile": `/user/${user}/info`,
		"My Address": `/user/${user}/shippingAddress`,
		"My Country": `/user/${user}/info`,
	};

	const sheets = {
		MyItem: <MyItem setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyProfile: <MyProfile setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyAddress: <MyAddress setOpen={setOpen} uri={featureActionMap[feature]} user={user} />,
		MyLanguage: <MyLanguage setOpen={setOpen} uri={featureActionMap[feature]} />,
		MyCountry: <MyCountry setOpen={setOpen} uri={featureActionMap[feature]} />,
		ContactUs: <ContactUs setOpen={setOpen} uri={featureActionMap[feature]} />,
		ChangePassword: <ChangePassword />,
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
