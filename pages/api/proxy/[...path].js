import * as dotenv from "dotenv";
import httpProxy from "http-proxy";
import Cookies from "cookies";
import { decode } from "next-auth/jwt";

dotenv.config();

//const SERVER_DOMAIN = process.env.SERVER_DOMAIN;
const BACKEND_SERVER = process.env.BACKEND_SERVER;
const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

const proxy = httpProxy.createProxyServer();

export const config = {
	api: {
		bodyParser: false,
	},
};

export default function handler(req, res) {
	return new Promise(async (resolve, reject) => {
		//const pathname = new URL(req.url, SERVER_DOMAIN).pathname;

		const cookies = new Cookies(req, res);
		const jwtToken = cookies.get("next-auth.session-token");

		// rewrite url to omit the /api/proxy str
		req.url = req.url.replace(/^\/api\/proxy/, "");
		//remove the cookies from the request
		req.headers.cookies = "";

		if (jwtToken) {
			const jwtObj = await decode({
				token: jwtToken,
				secret: JWT_TOKEN_SECRET,
			});

			if (jwtObj) req.headers.authorization = `Bearer ${jwtObj.accessToken}`;
		}

		proxy.once("error", reject);

		proxy.web(req, res, {
			target: BACKEND_SERVER,
			autoRewrite: false,
		});
	});
}
