import * as dotenv from "dotenv";
import { genericError } from "../userMessage";

dotenv.config();

const NEXT_PUBLIC_SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN;
const BACKEND_SERVER = process.env.BACKEND_SERVER;

const fetchQuery = async ({ uri, method, body, server = false, isFormData = false }) => {
	const configObj = {
		method: method || "GET",
		withCredentials: true,
	};

	if (method === "POST" || method === "PUT") {
		if (!body) throw new Error(genericError);

		configObj.body = isFormData ? body : JSON.stringify(body);
	}

	if (!isFormData) {
		configObj.headers = {
			"Content-Type": "application/json",
		};
	}

	const fetch_uri = server
		? `${BACKEND_SERVER}${uri}`
		: `${NEXT_PUBLIC_SERVER_DOMAIN}/api/proxy${uri}`;

	const response = await fetch(fetch_uri, configObj);

	if (!response.ok) {
		throw new Error(genericError);
	}

	const res = await response.json();

	if (res.status === "fail") {
		throw new Error(res.data);
	}

	return res;
};

export default fetchQuery;
