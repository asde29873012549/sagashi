import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";

export default function EditLanguageSheet({ setOpen }) {
	const [radio, setRadio] = useState("English");

	const onRadioSelect = (e) => {
		setRadio(e);
	};

	const onSaveLanguage = () => {
		setOpen(false);
	};

	const onCancel = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<RadioGroup
				defaultValue="English"
				className="flex-col"
				value={radio}
				onValueChange={onRadioSelect}
			>
				<div className="flex items-center space-x-1">
					<RadioGroupItem value="English" id="English" />
					<Label htmlFor="English">English</Label>
				</div>
				<div className="mb-3 mt-4 flex items-center space-x-1">
					<RadioGroupItem value="TraditionalChinese" id="TraditionalChinese" />
					<Label htmlFor="TraditionalChinese">Traditional Chinese</Label>
				</div>
			</RadioGroup>
			<div className="absolute bottom-0 right-0 w-full px-6">
				<Button className="mb-4 w-full" onClick={onSaveLanguage}>
					SAVE
				</Button>
				<Button variant="destructive" className="mb-4 w-full" onClick={onCancel}>
					CANCEL
				</Button>
			</div>
		</Fragment>
	);
}
