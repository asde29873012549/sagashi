import { Button} from "@/components/ui/button";
import ComboBox from '../../components/ui/comboBox'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link'
import { GiCancel } from "react-icons/gi";

import {useState, useRef} from 'react'
import { v4 as uuid } from "uuid";
import PhotoCrop from "../../components/PhotoCrop";
import { centerAspectCrop, getCroppedImage, useDebounceEffect } from "../../lib/utils";
import ImageUploadCard from "../../components/ui/image-upload-card";
const cropAspet = 4/5

export default function MobileLastInfo() {
  const [tags, setTags] = useState([]);
  const [tagInputValue, setTagInputValue] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [crop, setCrop] = useState();
  const [completeCrop, setCompletedCrop] = useState()
  const imageInputRef = useRef();
  const imageCardRef = useRef();
  const cameraIconRef = useRef()
  const cancelIconRef = useRef()
  const croppedImageUrlRef = useRef();
  const clickedRefKey = useRef()
  const childStateRef = useRef()
  const [formInput, setFormInput] = useState({
	ItemName:"",
	Description:""
  })
  const dataRef = useRef({
	Designers:null,
	ItemName:null,
	Description:null,
	Tags:null,
	Photos:{}
})

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

  const onFormInput = (e, form) => {
	setFormInput({...formInput, ...{[form]:e.target.value}})
	dataRef.current[form] = e.target.value
	dataRef.current.Designers = childStateRef.current.val.value
	console.log(dataRef.current)
  }

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
		  dataRef.current.Tags = e.target.value
		}
	  };
	
	  const onTagInput = e => {
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
		const cameraIconMap = getMap(cameraIconRef)
		const cameraIconNode = cameraIconMap.get(clickedRefKey.current)
		const cancelIconMap = getMap(cancelIconRef)
		const cancelIconNode = cancelIconMap.get(clickedRefKey.current)
		imageCardNode.style.backgroundImage = `url(${croppedImageUrlRef.current})`;
		imageCardNode.style.backgroundSize = "contain";
		cameraIconNode.style.display = "none"
		cancelIconNode.style.display = "block"
		console.log(croppedImageUrlRef.current)
		setImgSrc(null);
		dataRef.current.Photos[clickedRefKey.current] = croppedImageUrlRef.current
	  };
	
	  const onCancelCrop = () => {
		if (croppedImageUrlRef.current) {
			URL.revokeObjectURL(croppedImageUrlRef.current);
		}
		setImgSrc(null);
	  };
	
	  const onCancelIconClick = () => {
		const cancelIconMap = getMap(cancelIconRef)
		const cancelIconNode = cancelIconMap.get(clickedRefKey.current)
		const imageCardMap = getMap(imageCardRef)
		const imageCardNode = imageCardMap.get(clickedRefKey.current)
		const cameraIconMap = getMap(cameraIconRef)
		const cameraIconNode = cameraIconMap.get(clickedRefKey.current)
		imageCardNode.style.backgroundImage = "";
		cancelIconNode.style.display = "none"
		cameraIconNode.style.display = "inline-block"
		setImgSrc(null);
		delete dataRef.current.Photos[clickedRefKey.current]
	
	  }
	
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
    <main className="p-4 relative h-full">
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
		<div className="font-semibold">Designers</div>
		<ComboBox ref={childStateRef}/>
		<div className="font-semibold mt-6">Item Name</div>
		<Input placeholder="Item Name" className="w-full h-10 mt-6" value={formInput.ItemName} onChange={(e) => onFormInput(e, "ItemName")}/>
		<div className="font-semibold mt-6">Description</div>
		<Textarea placeholder="Add details about condition, how the garments fits, additional measurements, etc." className="w-full h-36 mt-6"  value={formInput.Description} onChange={(e) => onFormInput(e, "Description")}/>
		<div>
        <div className="font-semibold mt-6">Tags</div>
        <div>
          {tags.map((tag) => (
            <Button
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
          value={tagInputValue}
        />
      </div>
	  <div className="grid grid-cols-2 gap-4">
			<div className="mt-6 col-span-2 font-semibold">Photos</div>
			{
			[1,2,3,4,5,6].map(id => <ImageUploadCard
				key={id}
				onSelectFile={onSelectFile}
				imageCardRef={imageCardRef}
				getNode={getNode}
				id= {id}
				clickedRefKey={clickedRefKey}
				cameraIconRef={cameraIconRef}
				cancelIconRef={cancelIconRef}
				onCancelIconClick={onCancelIconClick}
			  />)
		}
		</div>
	  
		<Button className="flex justify-content items-center bg-blue-800 w-full mt-10 bottom-0" asChild>
			<Link href="/sell/mobilelastinfo">SUMIT</Link>
	    </Button>
    </main>
  );
}