import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, Fragment } from "react";

export default function ChangePasswordSheet() {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const onChangeOld = (e) => {
		setOldPassword(e.target.value);
	};

	const onChangeNew = (e) => {
		setNewPassword(e.target.value);
	};

	const onCancel = () => {
		setOpen(false);
	};
	return (
		<Fragment>
			<div className="flex w-full flex-col items-start space-y-4">
				<div>Old Password</div>
				<Input className="w-full" type="password" value={oldPassword} onChange={onChangeOld} />
				<div>New Password</div>
				<Input className="w-full" type="password" value={newPassword} onChange={onChangeNew} />
			</div>
			<div className="absolute bottom-0 right-0 w-full px-6">
				<Button className="mb-4 w-full">SAVE</Button>
				<Button variant="destructive" className="mb-4 w-full" onClick={onCancel}>
					CANCEL
				</Button>
			</div>
		</Fragment>
	);
}
