import { Input } from "@/components/ui/input";
import DatePicker from "../../DatePicker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, Fragment } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personalInfoUpdateSuccess, genericError } from "@/lib/userMessage";
import { useToast } from "@/components/ui/use-toast";
import generalFetch from "@/lib/queries/fetchQuery";
import { Button } from "@/components/ui/button";
import * as DOMPurify from "dompurify";

export default function EditProfileSheet({ setOpen, uri, user }) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [formVal, setFormVal] = useState({
		name: user?.data.fullname ?? "",
		email: user?.data.email ?? "",
		birth: user?.data.birth_date ?? "",
		gender: user?.data.gender ?? "PreferNotToTell",
	});

	const onNameChange = (e) => {
		setFormVal({ ...formVal, name: e.target.value });
	};

	const onEmailChange = (e) => {
		setFormVal({ ...formVal, email: e.target.value });
	};

	const onRadioGroupSelect = (e) => {
		setFormVal({ ...formVal, gender: e });
	};

	const { mutateAsync: mutateProfile } = useMutation({
		mutationFn: () =>
			generalFetch({
				uri,
				method: "PUT",
				body: {
					fullname: DOMPurify.sanitize(formVal.name),
					email: DOMPurify.sanitize(formVal.email),
					birth_date: formVal.birth,
					gender: formVal.gender,
				},
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userData"] });
			setOpen(false);
			toast({
				title: personalInfoUpdateSuccess.title,
				description: personalInfoUpdateSuccess.desc,
				status: personalInfoUpdateSuccess.status,
			});
		},
		onError: (err) => {
			console.log(err);
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onCancel = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<div className="flex flex-col">
				<div className="flex items-center justify-between py-2">
					<div>NAME</div>
					<Input className="h-fit w-2/3" value={formVal.name} onChange={onNameChange} />
				</div>
				<div className="flex items-center justify-between py-2">
					<div>EMAIL</div>
					<Input className="h-fit w-2/3" value={formVal.email} onChange={onEmailChange} />
				</div>
				<div className="flex items-center justify-between py-2">
					<div>BIRTH DATE</div>
					<DatePicker className="h-fit w-2/3" formVal={formVal} setFormVal={setFormVal} />
				</div>
				<div className="flex items-center justify-between py-2">
					<div>GENDER</div>
					<RadioGroup
						className="w-2/3 flex-col"
						value={formVal.gender}
						onValueChange={onRadioGroupSelect}
					>
						<div className="mb-2 mr-2 flex items-center space-x-1">
							<RadioGroupItem value="Male" id="Male" />
							<Label htmlFor="Male">Male</Label>
						</div>
						<div className="mb-2 mr-2 flex items-center space-x-1">
							<RadioGroupItem value="Female" id="Female" />
							<Label htmlFor="Female">Female</Label>
						</div>
						<div className="flex items-center space-x-1">
							<RadioGroupItem value="PreferNotToTell" id="PreferNotToTell" />
							<Label htmlFor="PreferNotToTell">Prefer Not To Tell</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div className="absolute bottom-0 right-0 w-full px-6">
				<Button className="mb-4 w-full" onClick={mutateProfile}>
					SAVE
				</Button>
				<Button variant="destructive" className="mb-4 w-full" onClick={onCancel}>
					CANCEL
				</Button>
			</div>
		</Fragment>
	);
}
