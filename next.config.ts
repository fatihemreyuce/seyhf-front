import type { NextConfig } from "next";



const nextConfig: NextConfig = {
	/* config options here */
	images: {
		// Allow unoptimized images in development for localhost
		...(process.env.NODE_ENV === "development" && {
			unoptimized: true,
		}),
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8080",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8080",
				pathname: "/uploads/**",
			},
			{
				protocol: "http",
				hostname: "::1",
				port: "8080",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "panel.seyfyatirim.com",
				port: "",
				pathname: "/uploads/**",
			},
			{
				protocol: "https",
				hostname: "panel.seyfyatirim.com",
				port: "",
				pathname: "//uploads/**",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/v1/:path*",
				destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`,
			},
		];
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value:
							"camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
				],
			},
		];
	},
};


export default nextConfig;
