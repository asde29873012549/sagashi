import { BsCameraFill } from "react-icons/bs";

export default function ImageUploadCard({ onSelectFile, id, imageCardRef, getNode, clickedRefKey}) {
  return (
    <label
      ref={node => getNode(node, id, imageCardRef)}
      className="w-[252px] h-[315px] rounded-md bg-gray-100 flex justify-center items-center hover:cursor-pointer hover:scale-105 transition-transform duration-700"
    >
      <BsCameraFill className="w-6 h-6" />
      <input
        type="file"
        accept="image/png, image/jpg"
        className="hidden"
        multiple={false}
        onChange={onSelectFile}
		onClick={() => clickedRefKey.current = id}
      />
    </label>
  );
}
