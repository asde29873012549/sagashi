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
				className="absolute right-2 top-2 z-1 hidden"
			>
				<MdCancel className="h-6 w-6 fill-foreground hover:cursor-pointer hover:fill-destructive " />
			</div>
			<label
				ref={(node) => getNode(node, id, "imageCard")}
				className={
					"relative flex aspect-[4/5] items-center justify-center rounded-md bg-gray-100 transition-transform duration-700 hover:scale-105 hover:cursor-pointer"
				}
			>
				<div ref={(node) => getNode(node, id, "cameraIcon")}>
					<BsCameraFill className="h-6 w-6" />
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
