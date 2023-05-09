/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// crossOrigin: "anonymous",
	images: {
		domains: ["via.placeholder.com", "storage.googleapis.com"],
		remotePatterns: [{ protocol: "https", hostname: "**" }],
		transpilePackages: ["react-hotjar"],
	},
}

module.exports = nextConfig
