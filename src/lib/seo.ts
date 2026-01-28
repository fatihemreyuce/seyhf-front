/**
 * SEO Utility Functions
 * Comprehensive SEO helpers for metadata, Open Graph, Twitter Cards, and structured data
 */

import { Metadata } from "next";


export interface SEOConfig {
	title: string;
	description: string;
	keywords?: string;
	image?: string;
	url?: string;
	type?: "website" | "article";
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	locale?: string;
	noindex?: boolean;
	nofollow?: boolean;
}

/**
 * Get base URL from environment or default
 */
export function getBaseUrl(): string {
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return process.env.NEXT_PUBLIC_SITE_URL || "https://synapsys.com";
}

/**
 * Build canonical URL
 */


/**
 * Build Open Graph image URL
 */
export function buildOgImageUrl(image?: string): string {
	if (image) {
		// If image is a full URL, return as is
		if (image.startsWith("http://") || image.startsWith("https://")) {
			return image;
		}
		// If image is a relative path, make it absolute
		const baseUrl = getBaseUrl();
		return image.startsWith("/") ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
	}
	// Default OG image
	return `${getBaseUrl()}/og-image.jpg`;
}

/**
 * Generate comprehensive metadata
 */
export function generateSEOMetadata(
	config: SEOConfig,
	locale: string = "en"
): Metadata {
	const {
		title,
		description,
		keywords,
		image,
		url,
		type = "website",
		publishedTime,
		modifiedTime,
		author,
		noindex = false,
		nofollow = false,
	} = config;

	

	const robots = [
		noindex ? "noindex" : "index",
		nofollow ? "nofollow" : "follow",
		"max-image-preview:large",
		"max-snippet:-1",
		"max-video-preview:-1",
	].join(", ");

	const metadata: Metadata = {
		title,
		description,
		keywords: keywords ? keywords.split(",").map((k) => k.trim()) : undefined,
		alternates: {
			canonical: getBaseUrl(),
		},
		openGraph: {
			title,
			description,
			url: getBaseUrl(),
			siteName: "Synapsys",
			images: [
				{
					url: buildOgImageUrl(image),
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			locale: locale,
			type: type,
			...(publishedTime && { publishedTime }),
			...(modifiedTime && { modifiedTime }),
			...(author && { authors: [author] }),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [buildOgImageUrl(image)],
		},
		robots: {
			index: !noindex,
			follow: !nofollow,
			googleBot: {
				index: !noindex,
				follow: !nofollow,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		},
		verification: {
			// Add verification codes here if needed
		},
	};

	return metadata;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(settings?: {
	name?: string;
	url?: string;
	logo?: string;
	socialLinks?: {
		twitter?: string;
		linkedin?: string;
		instagram?: string;
		youtube?: string;
	};
}) {
	const baseUrl = getBaseUrl();
	const name = settings?.name || "Synapsys";
	const url = settings?.url || baseUrl;
	const logo = settings?.logo || `${baseUrl}/logo.png`;

	const schema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url,
		logo: {
			"@type": "ImageObject",
			url: logo,
		},
		...(settings?.socialLinks && {
			sameAs: [
				settings.socialLinks.twitter,
				settings.socialLinks.linkedin,
				settings.socialLinks.instagram,
				settings.socialLinks.youtube,
			].filter(Boolean),
		}),
	};

	return schema;
}

/**
 * Generate WebSite structured data
 */
export function generateWebSiteSchema(settings?: {
	name?: string;
	url?: string;
	description?: string;
	potentialAction?: {
		"@type": string;
		target: string;
		"query-input": string;
	};
}) {
	const baseUrl = getBaseUrl();
	const name = settings?.name || "Synapsys";
	const url = settings?.url || baseUrl;

	const schema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		url,
		...(settings?.description && { description: settings.description }),
		...(settings?.potentialAction && { potentialAction: settings.potentialAction }),
	};

	return schema;
}

/**
 * Generate Article structured data
 */
export function generateArticleSchema(config: {
	title: string;
	description: string;
	url: string;
	image?: string;
	publishedTime?: string;
	modifiedTime?: string;
	author?: {
		name: string;
		url?: string;
	};
}) {
	const baseUrl = getBaseUrl();
	const {
		title,
		description,
		url,
		image,
		publishedTime,
		modifiedTime,
		author,
	} = config;

	const schema = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: title,
		description,
		url,
		...(image && {
			image: {
				"@type": "ImageObject",
				url: image.startsWith("http") ? image : `${baseUrl}${image}`,
			},
		}),
		...(publishedTime && { datePublished: publishedTime }),
		...(modifiedTime && { dateModified: modifiedTime }),
		...(author && {
			author: {
				"@type": "Person",
				name: author.name,
				...(author.url && { url: author.url }),
			},
		}),
		publisher: {
			"@type": "Organization",
			name: "Synapsys",
			logo: {
				"@type": "ImageObject",
				url: `${baseUrl}/logo.png`,
			},
		},
	};

	return schema;
}

/**
 * Generate ContactPage structured data
 */
export function generateContactPageSchema(config: {
	name?: string;
	url: string;
	description?: string;
}) {
	const baseUrl = getBaseUrl();
	const { name = "Synapsys", url, description } = config;

	const schema = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name,
		url,
		...(description && { description }),
		mainEntity: {
			"@type": "Organization",
			name,
			url: baseUrl,
		},
	};

	return schema;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
	const baseUrl = getBaseUrl();

	const schema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
		})),
	};

	return schema;
}

/**
 * Clean HTML content for meta description
 */
export function cleanHtmlForMeta(html: string, maxLength: number = 160): string {
	// Remove HTML tags
	const text = html.replace(/<[^>]*>/g, "");
	// Remove extra whitespace
	const cleaned = text.replace(/\s+/g, " ").trim();
	// Truncate to max length
	if (cleaned.length <= maxLength) {
		return cleaned;
	}
	return cleaned.substring(0, maxLength - 3) + "...";
}

