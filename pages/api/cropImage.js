import fs from "fs";
import sharp from "sharp";
import formidable, { errors as formidableErrors } from "formidable";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(req, res) {
	let file;

	try {
		const form = formidable({
			maxFiles: 1,
			maxFileSize: 5 * 1024 * 1024,
			maxFields: 1,
			uploadDir: "/Users/noahhong/Desktop",
		});
		const [fields, files] = await form.parse(req);

		file = Object.values(files)[0][0];

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
			.png()
			.toBuffer();

		res.setHeader("Content-Type", "image/png");
		res.send(croppedImage);
	} catch (err) {
		console.error(err);
		if (err.code === formidableErrors.maxFieldsExceeded) {
			console.error(err);
		}
	} finally {
		try {
			fs.unlink(file.filepath, (err) => {
				if (err) throw err;
			});
		} catch (err) {
			console.log(err);
		}
	}
}
