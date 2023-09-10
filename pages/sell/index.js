import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ComboBox from "../../components/ui/comboBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GiCancel } from "react-icons/gi";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import ImageUploadCard from "../../components/ui/image-upload-card";

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

export default function Sell() {
	const router = useRouter();
	const [tags, setTags] = useState([]);
	const [formInput, setFormInput] = useState({});
	const { toast } = useToast();
	const childStateRef = useRef();

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, ...{ [form]: e.target.value } });
	};

	const onTagInputKeyDown = (e, id) => {
		if (e.keyCode === 32 || e.keyCode === 13) {
			setTags([
				...tags,
				{
					id,
					value: e.target.value,
				},
			]);
			setFormInput({ ...formInput, Tags: "" });
		}
	};

	const onTagInput = (e) => {
		setFormInput({ ...formInput, Tags: e.target.value });
	};

	const onCancelTag = (tagId) => {
		setTags(tags.filter((tag) => tag.id !== tagId));
	};

	const onSubmit = (e) => {
		/*
		const formData = new FormData()

		datas.forEach(data => {
			formData.append(data[0], data[1])
		})

		fetch("http://localhost:8080/listing/create", {
			method:"POST",
			body:formData
		}).then(response => console.log(response))
		.catch(err => console.log(err))
		*/

		const id = setTimeout(() => {
			router.push("/");
		}, 2000);
		toast({
			title: "Just One Step Left",
			description: "Your submission will be reviewed to avoid illegal content.",
			action: (
				<ToastAction
					altText="OK"
					onClick={() => {
						clearTimeout(id);
						router.push("/");
					}}
				>
					OK
				</ToastAction>
			),
		});
	};

	return (
		<main className="mx-72 p-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-2 my-8 text-3xl font-semibold">Details</div>
				{["Department", "Category", "SubCategory", "Size"].map((id) => (
					<Select value={formInput} setValue={setFormInput} id={id} key={id}>
						<SelectTrigger className="h-12 w-auto">
							<SelectValue placeholder={id} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Menswear">Menswear</SelectItem>
							<SelectItem value="Womenswear">Womenswear</SelectItem>
						</SelectContent>
					</Select>
				))}
				<div className="col-span-1 mt-8 text-3xl font-semibold">Designers</div>
				<ComboBox ref={childStateRef} />

				<div className="col-span-1 my-8 text-3xl font-semibold">Item Name</div>
				<div className="col-span-1 my-8 text-3xl font-semibold">Color</div>
				<Input
					placeholder="Item Name"
					className="h-12 w-auto"
					value={formInput.ItemName}
					onChange={(e) => onFormInput(e, "ItemName")}
				/>
				<Select value={formInput} setValue={setFormInput} id="Color">
					<SelectTrigger className="h-12 w-auto">
						<SelectValue placeholder="Color" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>

				<div className="col-span-1 my-8 text-3xl font-semibold">Condition</div>
				<div className="col-span-1 my-8 text-3xl font-semibold">Price</div>
				<Select value={formInput} setValue={setFormInput} id="Condition">
					<SelectTrigger className="h-12 w-auto">
						<SelectValue placeholder="Condition" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
				<Input placeholder="Price" className="h-12 w-auto" />

				<div className="col-span-2 my-8 text-3xl font-semibold">Description</div>
				<Textarea
					className="col-span-2 h-48"
					placeholder="Add details about condition, how the garments fits, additional measurements, etc."
					value={formInput.Description}
					onChange={(e) => {
						return onFormInput(e, "Description");
					}}
				/>
			</div>
			<div>
				<div className="my-12 text-3xl font-semibold">Tags</div>
				<div>
					{tags.map((tag) => (
						<Button
							key={tag.id}
							variant="secondary"
							className="mb-2 mr-2 hover:bg-destructive"
							onClick={() => onCancelTag(tag.id)}
						>
							#{tag.value}
							<GiCancel className="ml-1" />
						</Button>
					))}
				</div>
				<Input
					placeholder="#tags"
					className="mt-3 h-12 w-full"
					onKeyDown={(e) => onTagInputKeyDown(e, uuid())}
					onChange={onTagInput}
					value={formInput.Tags}
				/>
			</div>
			<section className="mt-20 grid grid-cols-3 gap-10">
				{[1, 2, 3, 4, 5, 6].map((id) => (
					<ImageUploadCard key={id} id={id} formInput={formInput} setFormInput={setFormInput} />
				))}
			</section>
			<div className="mt-10 flex items-center justify-end">
				<Button
					variant="outline"
					className="flex items-center justify-center border-2 border-foreground"
					onClick={() => {
						toast({
							title: "Data Saved ! Come Back Later !",
						});
					}}
				>
					SAVE AS DRAFT
				</Button>
				<Button className="ml-6 flex items-center justify-center" type="submit" onClick={onSubmit}>
					SUBMIT
				</Button>
			</div>
		</main>
	);
}
