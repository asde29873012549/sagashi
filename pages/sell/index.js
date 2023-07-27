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

import { useState, useRef, useEffect } from "react";
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
		if (imageInputRef.current && crop.width && crop.height) {
			const url = await getCroppedImage(
			  imageInputRef.current,
			  crop,
			  `${uuid()}.jpg`,
			  croppedImageUrlRef
			);
			console.log('executed')
			croppedImageUrlRef.current = url;
		  }
	}
	getCroppedImageUrl()
  }, 200, [completeCrop, crop])

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

/*

import React, { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function App() {
  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(16 / 9);

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result ? reader.result.toString() : '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist');
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob');
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      const newCrop = centerAspectCrop(width, height, 16 / 9);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
      </div>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Download Crop</button>
            <a
              ref={hiddenAnchorRef}
              download
              style={{
                position: 'absolute',
                top: '-200vh',
                visibility: 'hidden',
              }}
            >
              Hidden download
            </a>
          </div>
        </>
      )}
    </div>
  );
}
*/