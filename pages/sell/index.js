import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GiCancel } from "react-icons/gi";
import { useToast } from "@/components/ui/use-toast";
import PhotoCrop from "../../components/PhotoCrop";
import { centerAspectCrop, getCroppedImage, useDebounceEffect } from "../../lib/utils";
import ImageUploadCard from "../../components/ui/image-upload-card";

import { useState, useRef} from "react";
import { v4 as uuid } from "uuid";

const cropAspet = 4/5

export default function Sell() {
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState();
  const [completeCrop, setCompletedCrop] = useState()
  const { toast } = useToast();
  const imageInputRef = useRef();
  const imageCardRef = useRef();
  const croppedImageUrlRef = useRef();
  const clickedRefKey = useRef()

  useDebounceEffect(() => {
	const getCroppedImageUrl = async () => {
		if (imageInputRef.current && completeCrop.width && completeCrop.height) {
			const url = await getCroppedImage(
			  imageInputRef.current,
			  completeCrop,
			  `${uuid()}.jpg`,
			  croppedImageUrlRef
			);
			croppedImageUrlRef.current = url;
		  }
	}
	
	getCroppedImageUrl()
  }, 200, [completeCrop])

  const onTagInputKeyDown = (e, id) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      setTags([
        ...tags,
        {
          id,
          value: e.target.value,
        },
      ]);
      setTagInputValue("");
    }
  };

  const onInput = e => {
    setTagInputValue(e.target.value);
  };

  const onCancelTag = tagId => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
	  setCrop(undefined)
      const reader = new FileReader();
	  reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : ""),
      );
    }
  };

  const onImageLoad = e => {
    const { width, height } = e.currentTarget;
	console.log(width, height, 'omimageload')
    setCrop(centerAspectCrop(width, height, cropAspet));
  };

  const onFinishCrop = () => {
	const imageCardMap = getMap(imageCardRef)
	const imageCardNode = imageCardMap.get(clickedRefKey.current)
    imageCardNode.style.backgroundImage = `url(${croppedImageUrlRef.current})`;
    imageCardNode.style.backgroundSize = "contain";
	console.log(croppedImageUrlRef.current)
    setImgSrc(null);
  };

  const onCancelCrop = () => {
	if (croppedImageUrlRef.current) {
		URL.revokeObjectURL(croppedImageUrlRef.current);
	}
    setImgSrc(null);
  };

  const getMap = (ref) => {
	if (!ref.current) {
		ref.current = new Map()
	}
	return ref.current
}

const getNode = (node, key, ref) => {
	const map = getMap(ref)
	if (node) {
		map.set(key, node)
	}
}

  return (
    <main className="p-4 mx-72">
      <PhotoCrop
        imgSrc={imgSrc}
        crop={crop}
        onImageLoad={onImageLoad}
        setCrop={setCrop}
        imageInputRef={imageInputRef}
        onFinishCrop={onFinishCrop}
		onCancelCrop={onCancelCrop}
		setCompletedCrop={setCompletedCrop}
		cropAspet={cropAspet}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 text-3xl font-semibold my-8">Details</div>
        <Select>
          <SelectTrigger className="w-auto h-12">
            <SelectValue placeholder="Department/Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menswear">Menswear</SelectItem>
            <SelectItem value="womenswear">Womenswear</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-auto h-12">
            <SelectValue placeholder="Sub-Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-auto mt-6 h-12">
            <SelectValue placeholder="Designer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-auto mt-6 h-12">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <div className="col-span-1 text-3xl font-semibold my-8">Item Name</div>
        <div className="col-span-1 text-3xl font-semibold my-8">Color</div>
        <Input placeholder="Item Name" className="w-auto h-12" />
        <Input
          placeholder='Designer Color Name, i.e. "Frozen Yellow"'
          className="w-auto h-12"
        />

        <div className="col-span-1 text-3xl font-semibold my-8">Condition</div>
        <div className="col-span-1 text-3xl font-semibold my-8">Price</div>
        <Select>
          <SelectTrigger className="w-auto h-12">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Price" className="w-auto h-12" />

        <div className="col-span-2 text-3xl font-semibold my-8">
          Description
        </div>
        <Textarea
          className="col-span-2 h-48"
          placeholder="Add details about condition, how the garments fits, additional measurements, etc."
        />
      </div>
      <div>
        <div className="text-3xl font-semibold my-12">Tags</div>
        <div>
          {tags.map((tag) => (
            <Button
              variant="secondary"
              className="hover:bg-destructive mr-2 mb-2"
              onClick={() => onCancelTag(tag.id)}
            >
              #{tag.value}
              <GiCancel className="ml-1" />
            </Button>
          ))}
        </div>
        <Input
          placeholder="#tags"
          className="h-12 mt-3"
          onKeyDown={(e) => onTagInputKeyDown(e, uuid())}
          onChange={onInput}
          value={tagInputValue}
        />
      </div>
      <section className="grid grid-cols-3 gap-10 mt-20">
        <ImageUploadCard
          onSelectFile={onSelectFile}
          imageCardRef={imageCardRef}
		  getNode={getNode}
		  id= {1}
		  clickedRefKey={clickedRefKey}
        />
		<ImageUploadCard
          onSelectFile={onSelectFile}
          imageCardRef={imageCardRef}
		  getNode={getNode}
		  id= {2}
		  clickedRefKey={clickedRefKey}
        />
      </section>
      <div className="flex justify-end items-center mt-10">
        <Button
          variant="outline"
          className="flex justify-center items-center border-2 border-foreground"
          onClick={() => {
            toast({
              title: "Your Data Was Saved ! Come Back Later !",
            });
          }}
        >
          SAVE AS DRAFT
        </Button>
        <Button className="flex justify-center items-center ml-6">
          SUBMIT
        </Button>
      </div>
    </main>
  );
}
