import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { BsFillPencilFill } from "react-icons/bs";
import SheetWrapper from "@/components/User/Sheets/SheetWrapper";

import ProfileInfo from "@/components/User/ProfileInfo";
import LanguageInfo from "@/components/User/LanguageInfo";
import AddressInfo from "@/components/User/AddressInfo";
import CountryInfo from "@/components/User/CountryInfo";
import About from "@/components/User/About";

export default function User() {
	return (
		<div className="h-full w-screen px-3">
			<div className="py-4 text-2xl font-bold">Account</div>
			<Alert>
				<div className="flex items-center justify-between">
					<AlertDescription className="flex items-center">
						<Avatar className="h-20 w-20">
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="ml-3">
							<AlertTitle className="font-semibold">Noah Hung</AlertTitle>
							<div>0 reviews</div>
						</div>
					</AlertDescription>
					<SheetWrapper
						trigger={<div className="text-xs underline">Change Password</div>}
						feature="Change Password"
						sheet="ChangePassword"
					/>
				</div>
			</Alert>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>My Items</AccordionTrigger>
					<AccordionContent>
						<div className="flex items-center justify-between">
							<SheetWrapper
								trigger={<div className="text-xs underline">See All Items</div>}
								feature="My Items"
								sheet="MyItem"
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>My Profile</AccordionTrigger>
					<AccordionContent>
						<ProfileInfo
							sheet={
								<SheetWrapper
									trigger={<BsFillPencilFill />}
									feature="Edit Profile"
									sheet="MyProfile"
								/>
							}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Shipping Address</AccordionTrigger>
					<AccordionContent>
						<AddressInfo
							sheet={
								<SheetWrapper
									trigger={<BsFillPencilFill />}
									feature="Edit Address"
									sheet="MyAddress"
								/>
							}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Language</AccordionTrigger>
					<AccordionContent>
						<LanguageInfo
							sheet={
								<SheetWrapper
									trigger={<BsFillPencilFill />}
									feature="Edit Language"
									sheet="MyLanguage"
								/>
							}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Country/Region</AccordionTrigger>
					<AccordionContent>
						<CountryInfo
							sheet={
								<SheetWrapper
									trigger={<BsFillPencilFill />}
									feature="Edit Countries"
									sheet="MyCountry"
								/>
							}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Contact Us</AccordionTrigger>
					<AccordionContent>
						<SheetWrapper
							trigger={<div className="text-xs underline">Contact us through email</div>}
							feature="Contact Us"
							sheet="ContactUs"
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>About</AccordionTrigger>
					<AccordionContent>
						<About />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Terms & Conditions</AccordionTrigger>
					<AccordionContent>
						<div>123</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Private Policy</AccordionTrigger>
					<AccordionContent>
						<div>123</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
