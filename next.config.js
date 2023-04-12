/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["via.placeholder.com"],
		remotePatterns: [{ protocol: "https", hostname: "**" }],
	},
}

module.exports = nextConfig
