/**
 * Environment Variables Validation
 * Type-safe environment configuration
 */

interface EnvConfig {
	NEXT_PUBLIC_API_URL: string;
	NEXT_PUBLIC_APP_VERSION: string;
	NODE_ENV: "development" | "production" | "test";
}

/**
 * Validate and return environment variables
 */
export function getEnv(): EnvConfig {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
	const nodeEnv = process.env.NODE_ENV;

	// Validate required env vars
	if (!apiUrl) {
		throw new Error("NEXT_PUBLIC_API_URL is required");
	}

	// Validate NODE_ENV
	if (
		nodeEnv !== "development" &&
		nodeEnv !== "production" &&
		nodeEnv !== "test"
	) {
		throw new Error(`Invalid NODE_ENV: ${nodeEnv}`);
	}

	return {
		NEXT_PUBLIC_API_URL: apiUrl,
		NEXT_PUBLIC_APP_VERSION: appVersion || "1.0.0",
		NODE_ENV: nodeEnv,
	};
}

/**
 * Type-safe environment access
 */
export const env = getEnv();
