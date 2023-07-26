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
import { centerAspectCrop } from "../../lib/utils";
import ImageUploadCard from '../../components/ui/image-upload-card'

import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

export default function Sell() {
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [imgSrc, setImgSrc] = useState(null);
  const [completedCrop, setCompletedCrop] = useState();
  const [crop, setCrop] = useState();
  const { toast } = useToast();
  const imageInputRef = useRef()
  const imageCardRef = useRef()
  const croppedImageUrlRef = useRef()

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

  const onInput = (e) => {
    setTagInputValue(e.target.value);
  };

  const onCancelTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : ""),
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 4 / 5));
  };

  const onFinishCrop = () => {
	imageCardRef.current.style.backgroundImage = `url(${croppedImageUrlRef.current})`
	imageCardRef.current.style.backgroundSize = "contain"
	setImgSrc(null)
  }

  async function imageCropComplete(crop) {
    await userCrop(crop);
  }
  async function userCrop(crop) {
    if (imageInputRef.current && crop.width && crop.height) {
      const url = await getCroppedImage(imageInputRef.current, crop, "newFile.jpeg");
	  croppedImageUrlRef.current = url
    }
  }
  function getCroppedImage(image, crop, fileName) {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");
    imgCx.drawImage(
      image,
	  crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

	return new Promise((resolve, reject) => {
		imageCanvas.toBlob((blob) => {
			if (!blob) {
			  reject(new Error("the image canvas is empty"));
			  return;
			}
			blob.name = fileName;
			let imageURL;
			//URL.revokeObjectURL(imageURL);
			imageURL = URL.createObjectURL(blob);
			setCompletedCrop(imageURL);
			resolve(imageURL);
		  });
	})
    
	
  }

  return (
    <main className="p-4 mx-72">
      <PhotoCrop
        imgSrc={imgSrc}
        crop={crop}
        onImageLoad={onImageLoad}
        setCrop={setCrop}
		imageCropComplete={imageCropComplete}
		imageInputRef={imageInputRef}
		onFinishCrop={onFinishCrop}
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
		<ImageUploadCard onSelectFile={onSelectFile} imageCardRef={imageCardRef}/>
		
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
