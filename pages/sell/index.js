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
import PhotoCrop from "../../components/PhotoCrop";
import { getCroppedImage, useDebounceEffect } from "../../lib/utils";
import ImageUploadCard from "../../components/ui/image-upload-card";

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

const cropAspet = 4 / 5;

export default function Sell() {
	const router = useRouter();
	const [tags, setTags] = useState([]);
	const [formInput, setFormInput] = useState({
		ItemName: "",
		Description: "",
		Tags: "",
	});
	const [imgSrc, setImgSrc] = useState();
	const [crop, setCrop] = useState();
	const [completeCrop, setCompletedCrop] = useState();
	const { toast } = useToast();
	const imageRef = useRef({
		imageInput: null,
		imageCard: null,
		cameraIcon: null,
		cancelIcon: null,
	});
	const croppedImageUrlRef = useRef();
	const clickedRefKey = useRef();
	const childStateRef = useRef();
	const dataRef = useRef({
		Department: null,
		Category: null,
		SubCategory: null,
		Condition: null,
		Size: null,
		Color: null,
		Price: null,
		Designers: null,
		ItemName: null,
		Description: null,
		Tags: [],
		Photos: {},
	});

	const [depValue, setDepValue] = useState();
	const [catValue, setCatValue] = useState();
	const [subCatValue, setSubCatValue] = useState();
	const [colorValue, setColorValue] = useState();
	const [conditionValue, setConditionValue] = useState();
	const [sizeValue, setSizeValue] = useState();

	useDebounceEffect(
		() => {
			const getCroppedImageUrl = async () => {
				if (imageRef.current.imageInput && completeCrop.width && completeCrop.height) {
					const url = await getCroppedImage(
						imageRef.current.imageInput,
						completeCrop,
						`${uuid()}.jpg`,
						croppedImageUrlRef,
					);
					croppedImageUrlRef.current = url;
				}
			};

			getCroppedImageUrl();
		},
		200,
		[completeCrop],
	);

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, ...{ [form]: e.target.value } });
		dataRef.current[form] = e.target.value;
		dataRef.current.Designers = childStateRef.current.val.value;
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
			dataRef.current.Tags.push(e.target.value);
		}
	};

	const onTagInput = (e) => {
		setFormInput({ ...formInput, Tags: e.target.value });
	};

	const onCancelTag = (tagId) => {
		setTags(tags.filter((tag) => tag.id !== tagId));
	};

	const onFinishCrop = () => {
		const imageCardNode = getMap("imageCard").get(clickedRefKey.current);
		const cameraIconNode = getMap("cameraIcon").get(clickedRefKey.current);
		const cancelIconNode = getMap("cancelIcon").get(clickedRefKey.current);

		const reader = new FileReader()
		reader.readAsDataURL(photoInputRef.current.files[0])
		
		imageCardNode.style.backgroundImage = `url(${croppedImageUrlRef.current})`;
		imageCardNode.style.backgroundSize = "contain";
		cameraIconNode.style.display = "none";
		cancelIconNode.style.display = "block";
		setImgSrc(null);
		setCrop(undefined);
		dataRef.current.Photos[clickedRefKey.current] = croppedImageUrlRef.current;
	};

	const onCancelCrop = () => {
		if (croppedImageUrlRef.current) {
			URL.revokeObjectURL(croppedImageUrlRef.current);
		}
		setImgSrc(null);
		setCrop(undefined);
	};

	const onCancelIconClick = (id) => {
		const cancelIconNode = getMap("cancelIcon").get(id);
		const imageCardNode = getMap("imageCard").get(id);
		const cameraIconNode = getMap("cameraIcon").get(id);
		imageCardNode.style.backgroundImage = "";
		cancelIconNode.style.display = "none";
		cameraIconNode.style.display = "inline-block";
		setImgSrc(null);
		delete dataRef.current.Photos[id];
	};

	const getMap = (ref) => {
		if (!imageRef.current[ref]) {
			imageRef.current[ref] = new Map();
		}
		return imageRef.current[ref];
	};

	const getNode = (node, key, ref) => {
		const map = getMap(ref);
		if (node) {
			map.set(key, node);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData()

		[["cat", 7], 
		["size", 1],
		["designer",1],
		["item_name", "mass"],
		["color", 1],
		["condition", 1],
		["price", 300],
		["desc", "dddddd"],
		["img", dataRef.current.Photos]].forEach(data => {
			formData.append(data[0], data[1])
		})

		console.log(formData)

		fetch("http://localhost:8080/listing/create", {
			method:"POST",
			body:formData
		}).then(response => console.log(response))
		.catch(err => console.log(err))

		/*
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
		*/
	};

	return (
		<main className="mx-72 p-4">
			<PhotoCrop
				imgSrc={imgSrc}
				setCrop={setCrop}
				crop={crop}
				imageRef={imageRef}
				onFinishCrop={onFinishCrop}
				onCancelCrop={onCancelCrop}
				setCompletedCrop={setCompletedCrop}
				cropAspet={cropAspet}
			/>
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-2 my-8 text-3xl font-semibold">Details</div>
				<Select value={depValue} setValue={setDepValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="Department" val={depValue} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="menswear">Menswear</SelectItem>
						<SelectItem value="womenswear">Womenswear</SelectItem>
					</SelectContent>
				</Select>
				<Select value={catValue} setValue={setCatValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="Category" val={catValue} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
				<Select value={subCatValue} setValue={setSubCatValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="SubCategory" val={subCatValue} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
				<Select value={sizeValue} setValue={setSizeValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="Size" val={sizeValue} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
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
				<Select value={colorValue} setValue={setColorValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="Color" val={colorValue} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>

				<div className="col-span-1 my-8 text-3xl font-semibold">Condition</div>
				<div className="col-span-1 my-8 text-3xl font-semibold">Price</div>
				<Select value={conditionValue} setValue={setConditionValue}>
					<SelectTrigger className="h-12 w-auto">
						<SelectValue ref={dataRef} identifier="Condition" val={conditionValue} />
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
						console.log(dataRef);
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
					<ImageUploadCard
						key={id}
						setImgSrc={setImgSrc}
						getNode={getNode}
						id={id}
						clickedRefKey={clickedRefKey}
						onCancelIconClick={onCancelIconClick}
					/>
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
