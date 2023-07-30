import { Button } from "@/components/ui/button";
import ComboBox from "../../components/ui/comboBox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { GiCancel } from "react-icons/gi";

import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import PhotoCrop from "../../components/PhotoCrop";
import { getCroppedImage, useDebounceEffect } from "../../lib/utils";
import ImageUploadCard from "../../components/ui/image-upload-card";
const cropAspet = 4 / 5;

export default function MobileLastInfo() {
  const [tags, setTags] = useState([]);
  const [formInput, setFormInput] = useState({
    ItemName: "",
    Description: "",
    Tags: "",
  });
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState();
  const [completeCrop, setCompletedCrop] = useState();
  const croppedImageUrlRef = useRef();
  const imageRef = useRef({
    imageInput: null,
    imageCard: null,
    cameraIcon: null,
    cancelIcon: null,
  });
  const clickedRefKey = useRef();
  const childStateRef = useRef();
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
    <main className="p-4 relative h-full">
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
      <div className="font-semibold">Designers</div>
      <ComboBox ref={childStateRef} />
      <div className="font-semibold mt-6">Item Name</div>
      <Input
        placeholder="Item Name"
        className="w-full h-10 mt-6"
        value={formInput.ItemName}
        onChange={(e) => onFormInput(e, "ItemName")}
      />
      <div className="font-semibold mt-6">Description</div>
      <Textarea
        placeholder="Add details about condition, how the garments fits, additional measurements, etc."
        className="w-full h-36 mt-6"
        value={formInput.Description}
        onChange={(e) => onFormInput(e, "Description")}
      />
      <div>
        <div className="font-semibold mt-6">Tags</div>
        <div>
          {tags.map((tag) => (
            <Button
              key={tag.id}
              variant="secondary"
              className="hover:bg-destructive mr-2 mb-2 mt-6"
              onClick={() => onCancelTag(tag.id)}
            >
              #{tag.value}
              <GiCancel className="ml-1" />
            </Button>
          ))}
        </div>
        <Input
          placeholder="#tags"
          className="h-12 mt-6"
          onKeyDown={(e) => onTagInputKeyDown(e, uuid())}
          onChange={onTagInput}
          value={formInput.Tags}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="mt-6 col-span-2 font-semibold">Photos</div>
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
      </div>

      <Button
        className="flex justify-content items-center bg-blue-800 w-full mt-10 bottom-0"
        asChild
      >
        <Link href="/sell/mobilelastinfo">SUMIT</Link>
      </Button>
    </main>
  );
}
