/**
 * Converts a string to a URL-friendly slug
 * @param value - The string to convert to a slug
 * @returns A URL-friendly slug string or undefined if value is null/undefined
 */
export const slugify = (value?: string | null): string | undefined => {
	if (!value) return undefined;

	return value
		.toString()
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
};

