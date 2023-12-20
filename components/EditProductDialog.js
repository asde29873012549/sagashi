import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploadCard from "@/components/ui/image-upload-card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { activate } from "@/redux/loadingSlice";
import getAllCondition from "@/lib/queries/fetchQuery";
import editProductData from "@/lib/queries/fetchQuery";
import getAllCategories from "@/lib/queries/fetchQuery";
import getAllSizes from "@/lib/queries/fetchQuery";
import getAllColor from "@/lib/queries/fetchQuery";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { genericError } from "@/lib/userMessage";
import { useToast } from "@/components/ui/use-toast";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { uploadSuccess } from "@/lib/userMessage";

export default function EditProductDialog({ isOpen, setIsOpen, productData, user }) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const dispatch = useDispatch();

	const generatePhotoObj = (productData) => {
		const photoObj = {};
		if (productData) {
			photoObj[1] = productData?.primary_image || "";
			const secondary_image = JSON.parse(productData?.secondary_image);
			Object.keys(secondary_image).forEach((key, index) => {
				if (key.startsWith("image_")) {
					photoObj[Number(index) + 2] = secondary_image[key];
				}
			});
		}
		return photoObj;
	};

	const [formInput, setFormInput] = useState({
		item_name: productData?.name || "",
		tags: productData?.tags || "",
		desc: productData?.desc || "",
		size: productData?.size || "",
		color: productData?.color || "",
		price: productData?.price || "",
		department: productData?.department || "",
		category: productData?.category || "",
		condition: productData?.condition || "",
		subCategory: productData?.subCategory || "",
		designer: productData?.designer || "",
		subCategory_id: "",
		size_id: "",
		photos: generatePhotoObj(productData),
	});

	const { data: conditionData } = useQuery({
		queryKey: ["condition"],
		queryFn: () => getAllCondition({ uri: "/listing/condition" }),
		enabled: isOpen,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60 * 24,
	});

	const { data: categoryData } = useQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category" }),
		enabled: isOpen && productData ? true : false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 30,
	});

	const subCategoryData =
		categoryData?.data?.[productData?.department]?.[productData?.category]?.sub || [];

	const { data: sizeData } = useQuery({
		queryKey: ["size", categoryData?.data?.[productData?.department]?.[productData?.category]?.id],
		queryFn: (obj) => getAllSizes({ uri: `/category/size/${obj.queryKey[1]}` }),
		enabled: isOpen && categoryData && productData ? true : false,
		refetchOnWindowFocus: false,
		onSuccess: (sizeData) => {
			const subCategoryData =
				categoryData.data?.[productData?.department]?.[productData?.category]?.sub || [];
			const subCategory = subCategoryData.find(
				(subCat) => subCat.name === productData?.subCategory,
			);
			setFormInput({
				...formInput,
				subCategory_id: subCategory?.id,
				size_id: sizeData?.data?.find((sizeObj) => sizeObj.Size.name === productData?.size)?.Size
					.id,
			});
		},
	});

	const { data: colorData } = useQuery({
		queryKey: ["color"],
		queryFn: () => getAllColor({ uri: "/listing/color" }),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 60 * 24,
	});

	const size = sizeData?.data.map((sizeData) => sizeData.Size.name) || [];

	const { mutate: editMutate } = useMutation({
		mutationFn: (product) =>
			editProductData({
				uri: `/listing/${productData?.prod_id}`,
				method: "PUT",
				body: product,
				isFormData: true,
			}),
		onSuccess: () => {
			dispatch(activate());
			toast({
				title: uploadSuccess.title,
				description: uploadSuccess.desc,
				status: uploadSuccess.status,
			});

			queryClient.invalidateQueries({ queryKey: ["products", {}, user] });

			setIsOpen(false);
		},
		onError: (error) => {
			dispatch(activate());
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onSelect = (e, form) => {
		setFormInput({ ...formInput, [form]: e });
	};

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, ...{ [form]: e.target.value } });
	};

	const onEditProductData = () => {
		dispatch(activate());

		const formData = new FormData();

		Object.keys(formInput).forEach((key) => {
			if (key === "photos") {
				Object.keys(formInput.photos).forEach((photo_key) => {
					if (String(photo_key) === "1") {
						formData.append("primary_image", formInput.photos[photo_key]);
					} else {
						// start from `image_0` to `image_5`
						formData.append(`image_${Number(photo_key) - 2}`, formInput.photos[photo_key]);
					}
				});
			} else if (key === "tags" && tags.length > 0) {
				formData.append("tags", DOMPurify.sanitize(tags.map((obj) => obj.value).join("&")));
			} else {
				formData.append(key, DOMPurify.sanitize(formInput[key]));
			}
		});

		try {
			editMutate(formData);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="max-h-screen gap-1 overflow-y-scroll px-6 py-4">
				<div className="grid grid-cols-6 gap-3">
					<div className="col-span-3 items-center">
						<Label htmlFor="name" className="text-right">
							Item Name
						</Label>
						<Input
							id="name"
							placeholder="Item Name"
							className="col-span-2 h-10 w-full text-sm font-light placeholder:font-light placeholder:text-gray-400"
							value={formInput.item_name || ""}
							onChange={(e) => onFormInput(e, "item_name")}
						/>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="designer" className="text-right">
							Designer
						</Label>
						<Select value={productData?.designer} disabled={true}>
							<SelectTrigger className="col-span-2 h-10 w-full bg-slate-200 text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Designer" />
							</SelectTrigger>
							<SelectContent>
								{[productData?.designer].map((designer) => (
									<SelectItem key={designer} value={designer}>
										{designer}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="department" className="text-right">
							Department
						</Label>
						<Select value={productData?.department} disabled={true}>
							<SelectTrigger className="col-span-2 h-10 w-full bg-slate-200 text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Department" />
							</SelectTrigger>
							<SelectContent>
								{[productData?.department].map((dept) => (
									<SelectItem key={dept} value={dept}>
										{dept}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<Select value={productData?.category} disabled={true}>
							<SelectTrigger className="col-span-2 h-10 w-full bg-slate-200 text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								{[productData?.category].map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="subCategory" className="text-right">
							SubCategory
						</Label>
						<Select value={formInput.subCategory} onValueChange={(e) => onSelect(e, "subCategory")}>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="SubCategory" />
							</SelectTrigger>
							<SelectContent>
								{subCategoryData?.map((subCat) => (
									<SelectItem key={subCat.name} value={subCat.name}>
										{subCat.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="size" className="text-right">
							Size
						</Label>
						<Select value={formInput.size} onValueChange={(e) => onSelect(e, "size")}>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="size" />
							</SelectTrigger>
							<SelectContent>
								{size.map((size) => (
									<SelectItem key={size} value={size}>
										{size}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-2 items-center">
						<Label htmlFor="color" className="text-right">
							Color
						</Label>
						<Select value={formInput.color} onValueChange={(e) => onSelect(e, "color")}>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="color" />
							</SelectTrigger>
							<SelectContent>
								{colorData?.data.map((color) => (
									<SelectItem key={color} value={color}>
										{color}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-2 items-center">
						<Label htmlFor="condition" className="text-right">
							Condition
						</Label>
						<Select value={formInput.condition} onValueChange={(e) => onSelect(e, "condition")}>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Condition" />
							</SelectTrigger>
							<SelectContent>
								{conditionData?.data.map((condition) => (
									<SelectItem key={condition} value={condition}>
										{condition}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-2 items-center gap-2">
						<Label htmlFor="price" className="text-right">
							Price
						</Label>
						<Input
							id="price"
							placeholder="price"
							className="col-span-2 h-10 w-full text-sm font-light placeholder:font-light placeholder:text-gray-400"
							value={formInput.price || ""}
							onChange={(e) => onFormInput(e, "price")}
						/>
					</div>
					<div className="col-span-6 items-center gap-2">
						<Label htmlFor="tags" className="text-right">
							Tags
						</Label>
						<Input
							id="tags"
							placeholder="#Tags"
							className="col-span-2 h-10 w-full text-sm font-light placeholder:font-light placeholder:text-gray-400"
							value={formInput.tags || ""}
							onChange={(e) => onFormInput(e, "tags")}
						/>
					</div>
					<div className="col-span-6 items-center gap-2">
						<Label htmlFor="description" className="text-right">
							Description
						</Label>
						<Textarea
							className="min-h-[70px] w-full text-sm font-light placeholder:font-light placeholder:text-gray-400"
							placeholder="Add details about condition, how the garments fits, additional measurements, etc."
							value={formInput.desc || ""}
							onChange={(e) => {
								return onFormInput(e, "desc");
							}}
						/>
					</div>
				</div>
				<section className="mt-4 grid grid-cols-6 gap-2">
					{["1", "2", "3", "4", "5", "6"].map((id) => (
						<ImageUploadCard
							key={id}
							id={id}
							noBackDrop={true}
							formInput={formInput}
							initialBgImage={
								id === "1"
									? productData?.primary_image
									: JSON.parse(productData?.secondary_image)[`image_${Number(id) - 2}`]
							}
							setFormInput={setFormInput}
						/>
					))}
				</section>
				<DialogFooter>
					<Button type="submit" className="mt-2 h-10 text-sm" onClick={onEditProductData}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
