/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
				pathname: "/sagashi_designer/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
				pathname: "/sagashi_curations/**",
			},
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				port: "",
				pathname: "/sagashi_products_data/**",
			},
		],
	},
};

module.exports = nextConfig;
