import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import generalFetch from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { personalInfoUpdateSuccess, genericError } from "@/lib/userMessage";
import ComboBox from "@/components/ui/comboBox";
import region from "../../../lib/countries";

export default function EditAddressSheet({ setOpen, uri, user }) {
	const [countries, setCountries] = useState({});
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [address, setAddress] = useState("");
	const { toast } = useToast();

	useEffect((lang = "en") => {
		const countryName = new Intl.DisplayNames([lang], { type: "region" });
		const country = {};
		region.forEach((r) => {
			let name = countryName.of(r);
			country[r] = name;
		});
		setCountries(country);
	}, []);

	const onSaveAddress = async () => {
		const response = await generalFetch({
			uri,
			method: "POST",
			body: {
				user_name: user,
				address,
				city,
				country,
				postal_code: postalCode,
			},
		});
		if (response.status === "success") {
			setOpen(false);
			toast({
				title: personalInfoUpdateSuccess.title,
				description: personalInfoUpdateSuccess.desc,
				status: personalInfoUpdateSuccess.status,
			});
		} else {
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		}
	};

	const onCancel = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-between space-x-2">
					<div className="mb-2 text-sm font-normal">Country</div>
					<ComboBox
						data={Object.values(countries) || []}
						className="w-60"
						defaultValue="Select your country..."
						fallBackValue="Sorry, no country found"
						onSelect={setCountry}
					/>
				</div>
				<div className="flex items-center justify-between space-x-2">
					<div className="mb-2 text-sm font-normal">City</div>
					<Input
						className="w-60 px-4 text-sm font-light"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Input>
				</div>
				<div className="flex items-center justify-between space-x-2">
					<div className="mb-2 text-sm font-normal">Post Code</div>
					<Input
						className="w-60 px-4 text-sm font-light"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Input>
				</div>
				<div className="flex items-center justify-between space-x-2">
					<div className="mb-2 text-sm font-normal">Address</div>
					<Textarea
						value={address}
						className="h-1/3 w-60 px-4 text-sm font-light"
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
			</div>
			<div className="absolute bottom-0 right-0 w-full px-6">
				<Button className="mb-4 w-full" onClick={onSaveAddress}>
					SAVE
				</Button>
				<Button variant="destructive" className="mb-4 w-full" onClick={onCancel}>
					CANCEL
				</Button>
			</div>
		</Fragment>
	);
}
