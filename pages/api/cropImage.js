import fs from "fs";
import sharp from "sharp";
import { fileTypeFromFile } from "file-type";
import formidable, { errors as formidableError } from "formidable";
import { ValidationError } from "@/lib/api_error.js";
import Response from "@/lib/response_template.js";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	let file;
	const allowFileType = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

	try {
		const form = formidable({
			maxFiles: 1,
			maxFileSize: 8 * 1024 * 1024,
			maxFields: 1,
		});

		const [fields, files] = await form.parse(req);

		file = Object.values(files)[0][0];

		const fileType = await fileTypeFromFile(file.filepath);
		if (!allowFileType.includes(fileType.mime)) {
			throw new ValidationError();
		}

		const Image = sharp(file.filepath);
		const metadata = await Image.metadata();
		const { width: originalWidth, height: originalHeight } = metadata;

		const cropInfo = JSON.parse(fields.cropInfo[0]).cropInfo;
		const { left, top, width, height } = cropInfo;

		const croppedImage = await Image.extract({
			left: Math.floor((left / 100) * originalWidth),
			top: Math.floor((top / 100) * originalHeight),
			width: Math.floor((width / 100) * originalWidth),
			height: Math.floor((height / 100) * originalHeight),
		})
			.webp()
			.toBuffer();

		res.setHeader("Content-Type", "image/webp");
		res.status(200).send(croppedImage);
	} catch (err) {
		if (err instanceof ValidationError) {
			res.status(err.status).json(new Response(err).fail());
		}
		if (err.code === formidableError.biggerThanTotalMaxFileSize) {
			res
				.status(500)
				.json(new Response({ message: "File too large. Please stay under 8MB" }).fail());
		}
		res.status(500).json(new Response({ message: "Unknown Error" }).fail());
	} finally {
		try {
			file &&
				fs.unlink(file.filepath, (err) => {
					if (err) throw err;
				});
		} catch (err) {
			console.log(err);
		}
	}
}
