/*eslint-disable*/
import { BsCameraFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

export default function ImageUploadCard({
  setImgSrc,
  id,
  getNode,
  clickedRefKey,
  onCancelIconClick,
}) {
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : ""),
      );
    }
  };
  return (
    <div className="relative">
      <div
        ref={(node) => getNode(node, id, "cancelIcon")}
        onClick={() => onCancelIconClick(id)}
        className="absolute top-2 right-2 z-1 hidden"
      >
        <MdCancel className="fill-foreground hover:fill-destructive hover:cursor-pointer w-6 h-6 " />
      </div>
      <label
        ref={(node) => getNode(node, id, "imageCard")}
        className={
          "relative rounded-md bg-gray-100 flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-transform duration-700 aspect-[4/5]"
        }
      >
        <div ref={(node) => getNode(node, id, "cameraIcon")}>
          <BsCameraFill className="w-6 h-6" />
        </div>
        <input
          type="file"
          accept="image/png, image/jpg"
          className="hidden"
          multiple={false}
          onChange={onSelectFile}
          onClick={() => (clickedRefKey.current = id)}
        />
      </label>
    </div>
  );
}
