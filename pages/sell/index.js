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
import {
  centerAspectCrop,
  getCroppedImage,
  useDebounceEffect,
} from "../../lib/utils";
import ImageUploadCard from "../../components/ui/image-upload-card";

import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

const cropAspet = 4 / 5;

export default function Sell() {
  const [tags, setTags] = useState([]);
  const [formInput, setFormInput] = useState({
    ItemName: "",
    Description: "",
    Tags: "",
  });
  //const [tagInputValue, setTagInputValue] = useState("");
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
  //const imageInputRef = useRef();
  //const imageCardRef = useRef();
  //const cameraIconRef = useRef();
  //const cancelIconRef = useRef();
  const croppedImageUrlRef = useRef();
  const clickedRefKey = useRef();
  const dataRef = useRef({
    Designers: null,
    ItemName: null,
    Description: null,
    Tags: null,
    Photos: {},
  });

  useDebounceEffect(
    () => {
      const getCroppedImageUrl = async () => {
        if (
          imageRef.current.imageInput &&
          completeCrop.width &&
          completeCrop.height
        ) {
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
      dataRef.current.Tags = e.target.value;
    }
  };

  const onTagInput = (e) => {
    setFormInput({ ...formInput, Tags: e.target.value });
  };

  const onCancelTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  /*
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : ""),
      );
    }
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    console.log(width, height, "omimageload");
    setCrop(centerAspectCrop(width, height, cropAspet));
  };*/

  const onFinishCrop = () => {
    const imageCardNode = getMap("imageCard").get(clickedRefKey.current);
    const cameraIconNode = getMap("cameraIcon").get(clickedRefKey.current);
    const cancelIconNode = getMap("cancelIcon").get(clickedRefKey.current);
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

  return (
    <main className="p-4 mx-72">
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
			  key={tag.id}
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
          onChange={onTagInput}
          value={formInput.Tags}
        />
      </div>
      <section className="grid grid-cols-3 gap-10 mt-20">
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
      <div className="flex justify-end items-center mt-10">
        <Button
          variant="outline"
          className="flex justify-center items-center border-2 border-foreground"
          onClick={() => {
            toast({
              title: "Data Saved ! Come Back Later !",
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
