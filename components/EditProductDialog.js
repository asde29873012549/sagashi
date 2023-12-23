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
import DesignerComboBox from "@/components/DesignerComboBox";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { activate } from "@/redux/loadingSlice";
import getAllCondition from "@/lib/queries/fetchQuery";
import editProductData from "@/lib/queries/fetchQuery";
import getAllCategories from "@/lib/queries/fetchQuery";
import getAllSizes from "@/lib/queries/fetchQuery";
import getAllColor from "@/lib/queries/fetchQuery";
import getAllDesigners from "@/lib/queries/fetchQuery";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { genericError } from "@/lib/userMessage";
import { useToast } from "@/components/ui/use-toast";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { uploadSuccess } from "@/lib/userMessage";
import { XCircle } from "lucide-react";

export default function EditProductDialog({
	isOpen,
	setIsOpen,
	productData,
	user,
	isDraft = false,
}) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const childStateRef = useRef();
	const dispatch = useDispatch();

	const generatePhotoObj = (productData) => {
		const photoObj = {};
		if (productData) {
			photoObj[1] = productData?.primary_image || "";
			const secondary_image = JSON.parse(productData?.secondary_image);
			secondary_image &&
				Object.keys(secondary_image).forEach((key, index) => {
					if (key.startsWith("image_")) {
						photoObj[Number(index) + 2] = secondary_image[key];
					}
				});
		}
		return photoObj;
	};

	const cachedCategoryData = queryClient.getQueryData(["category"]);

	const category_id =
		cachedCategoryData.data?.[productData?.department]?.[productData?.category]?.id || "";
	const subCategory_id =
		cachedCategoryData.data?.[productData?.department]?.[productData?.category]?.sub?.find(
			(subCat) => subCat.name === productData?.subCategory,
		)?.id || "";

	const [formInput, setFormInput] = useState({
		item_name: productData?.name || "",
		tags: productData?.tags?.split("&") || "",
		desc: productData?.desc || "",
		size: productData?.size || "",
		color: productData?.color || "",
		price: productData?.price || "",
		department: productData?.department || "",
		category: productData?.category || "",
		category_id,
		condition: productData?.condition || "",
		subCategory: productData?.subCategory || "",
		designer: productData?.designer || "",
		subCategory_id,
		size_id: "",
		photos: generatePhotoObj(productData),
	});

	const [tagInput, setTagInput] = useState("");

	const { data: conditionData } = useQuery({
		queryKey: ["condition"],
		queryFn: () => getAllCondition({ uri: "/listing/condition" }),
		enabled: isOpen,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 30,
		cacheTime: 1000 * 60 * 35,
	});

	const { data: categoryData } = useQuery({
		queryKey: ["category"],
		queryFn: () => getAllCategories({ uri: "/category" }),
		enabled: isOpen && productData ? true : false,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 30,
		cacheTime: 1000 * 60 * 35,
		onSuccess: (categoryData) => {
			setFormInput({
				...formInput,
				category_id: categoryData.data?.[productData?.department]?.[productData?.category]?.id,
				subCategory_id: categoryData.data?.[productData?.department]?.[
					productData?.category
				]?.sub?.find((subCat) => subCat.name === productData?.subCategory)?.id,
			});
		},
	});

	const {
		data: designerData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["designer", "infinite"],
		queryFn: ({ pageParam = "" }) =>
			getAllDesigners({
				uri: `/designer?cursor=${pageParam && encodeURI(JSON.stringify(pageParam))}&limit=10`,
			}),
		getNextPageParam: (lastPage, pages) => lastPage?.data[lastPage.data.length - 1]?.sort,
		refetchOnWindowFocus: false,
	});

	const { data: sizeData, refetch: fetchSize } = useQuery({
		queryKey: ["size", formInput.category_id && formInput.category_id],
		queryFn: (obj) => getAllSizes({ uri: `/category/size/${obj.queryKey[1]}` }),
		enabled: formInput.category_id ? true : false,
		refetchOnWindowFocus: false,
		onSuccess: (sizeData) => {
			const sizeObj = sizeData?.data?.find((sizeObj) => sizeObj.Size.name === productData?.size);
			setFormInput({ ...formInput, size_id: sizeObj?.Size.id });
		},
	});

	const { data: colorData } = useQuery({
		queryKey: ["color"],
		queryFn: () => getAllColor({ uri: "/listing/color" }),
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 30,
		cacheTime: 1000 * 60 * 35,
	});

	const { mutate: editMutate } = useMutation({
		mutationFn: (product) =>
			editProductData({
				uri: `/listing/${isDraft ? productData?.id : productData?.prod_id}`,
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

	const onSelect = (e, category, shouldFetchSize) => {
		const [cat_id, cat_name] = String(e)?.split("_");

		shouldFetchSize && fetchSize();

		return category !== "department" && category !== "color" && category !== "condition"
			? setFormInput({ ...formInput, [category]: cat_name, [`${category}_id`]: cat_id })
			: setFormInput({ ...formInput, [category]: e });
	};

	const onFormInput = (e, form) => {
		setFormInput({ ...formInput, ...{ [form]: e.target.value } });
	};

	const onTagInputKeyDown = (e) => {
		if (e.keyCode === 32 || e.keyCode === 13) {
			setFormInput({ ...formInput, tags: [...formInput.tags, e.target.value] });
			setTagInput("");
		}
	};

	const onTagInput = (e) => {
		setTagInput(e.target.value);
	};

	const onRemoveTag = (tag) => {
		setFormInput({ ...formInput, tags: formInput.tags?.filter((arr) => arr !== tag) });
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

		formData.append("isDraft", isDraft);

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
						<DesignerComboBox
							ref={childStateRef}
							data={designerData?.pages ?? []}
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
							setFormInput={setFormInput}
							cacheValue={formInput.designer}
							className="col-span-2 mt-0 w-full text-sm placeholder:font-light placeholder:text-gray-400 hover:bg-background md:h-10"
							popoverWidth="md:w-[224px]"
							disabled={!isDraft}
						/>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="department" className="text-right">
							Department
						</Label>
						<Select
							value={formInput.department || undefined}
							onValueChange={(e) => onSelect(e, "department")}
							disabled={!isDraft}
						>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Department" />
							</SelectTrigger>
							<SelectContent>
								{categoryData?.data &&
									Object.keys(categoryData.data).map((department) => (
										<SelectItem key={department} value={department}>
											{department}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="category" className="text-right">
							Category
						</Label>
						<Select
							value={
								formInput.category ? `${formInput.category_id}_${formInput.category}` : undefined
							}
							onValueChange={(e) => onSelect(e, "category")}
							disabled={!isDraft}
						>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								{formInput.department ? (
									Object.keys(categoryData.data[formInput.department]).map((category) => {
										const cat_id = categoryData.data[formInput.department][category]?.id;
										return (
											<SelectItem key={cat_id} value={`${cat_id}_${category}`}>
												{category}
											</SelectItem>
										);
									})
								) : (
									<SelectItem
										value="Please Select Department First"
										className="pl-2 text-cyan-900"
										disabled
									>
										Please Select Department First
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="subCategory" className="text-right">
							SubCategory
						</Label>
						<Select
							value={
								formInput.subCategory
									? `${formInput.subCategory_id}_${formInput.subCategory}`
									: undefined
							}
							onValueChange={(e) => onSelect(e, "subCategory", true)}
						>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="SubCategory" />
							</SelectTrigger>
							<SelectContent>
								{formInput.category_id ? (
									Object.values(categoryData.data[formInput.department])
										.filter((obj) => String(obj.id) === String(formInput.category_id))[0]
										?.sub.map((subCategory) => {
											const subCat_id = subCategory.id;
											return (
												<SelectItem key={subCat_id} value={`${subCat_id}_${subCategory.name}`}>
													{subCategory.name}
												</SelectItem>
											);
										})
								) : (
									<SelectItem
										value="Please Select Category First"
										className="pl-2 text-cyan-900"
										disabled
									>
										Please Select Category First
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>
					<div className="col-span-3 items-center">
						<Label htmlFor="size" className="text-right">
							Size
						</Label>
						<Select
							value={formInput.size ? `${formInput.size_id}_${formInput.size}` : undefined}
							onValueChange={(e) => onSelect(e, "size")}
						>
							<SelectTrigger className="col-span-2 h-10 w-full text-sm placeholder:font-light placeholder:text-gray-400">
								<SelectValue placeholder="size" />
							</SelectTrigger>
							<SelectContent>
								{formInput.subCategory_id ? (
									sizeData?.data.map((obj, index) => (
										<SelectItem
											key={`${obj.Size.name}_${index}`}
											value={`${obj.Size.id}_${obj.Size.name}`}
										>
											{obj.Size.name}
										</SelectItem>
									))
								) : (
									<SelectItem
										value="Please Select SubCategory First"
										className="text-cyan-900"
										disabled
									>
										Please Select Category First
									</SelectItem>
								)}
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
						<div className="col-span-2 flex h-fit flex-wrap rounded-md border border-gray-500 px-1">
							{formInput.tags?.map((tag, index) => {
								if (tag)
									return (
										<div
											key={`${tag}-${index}-tags`}
											className="mx-0.5 my-1 flex h-8 items-center justify-center space-x-1 rounded-sm bg-sky-900 px-2 py-1 text-sm font-light text-white"
										>
											<span>#{tag}</span>
											<XCircle
												size={16}
												strokeWidth={2}
												className="cursor-pointer hover:text-rose-800"
												onClick={() => onRemoveTag(tag)}
											/>
										</div>
									);
							})}
							<Input
								id="tags"
								placeholder="Press Enter or Space to add #Tags"
								className="my-1 h-8 min-w-[10px] grow border-none px-0.5 py-1 text-sm font-light outline-none placeholder:font-light placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
								value={tagInput}
								onChange={(e) => onTagInput(e)}
								onKeyDown={(e) => onTagInputKeyDown(e)}
							/>
						</div>
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
									: productData?.secondary_image &&
									  JSON.parse(productData?.secondary_image)[`image_${Number(id) - 2}`]
							}
							setFormInput={setFormInput}
						/>
					))}
				</section>
				<DialogFooter>
					<Button type="submit" className="mt-2 h-10 text-sm" onClick={onEditProductData}>
						{isDraft ? "Publish" : "Save changes"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
