"use server";

import { objectToFormData } from "@/utils/object-to-form-data";
import { NetworkError, UnauthorizedError, errorHandler } from "@/lib/errors";
import { env } from "@/lib/env";

interface FetchServerOptions<T> extends Omit<RequestInit, "body"> {
	body?: T;
	locale?: string;
}

/**
 * Type-safe server-side fetch with error handling
 */
export const fetchServer = async <T, U>(
	url: string,
	options: FetchServerOptions<T> = {}
): Promise<U> => {
	try {
		const headers = new Headers(options.headers);
		const { body, ...rest } = options;
		const requestOptions: RequestInit = rest;

		// Set default headers
		headers.set("Accept", "application/json");
		headers.set("X-Client-Type", "web");
		headers.set("X-Client-Version", env.NEXT_PUBLIC_APP_VERSION);
		headers.set("bypass-tunnel-reminder", "true");

		// Attach locale from options when provided
		const locale = options.locale;
		if (locale) {
			headers.set("X-Locale", locale);
		}

		// Default to GET if method not provided
		if (!options.method) {
			requestOptions.method = "GET";
		}

		// Handle request body
		if (headers.get("Content-Type") === "multipart/form-data") {
			headers.delete("Content-Type");
			requestOptions.body = objectToFormData({ ...body });
		} else if (!headers.get("Content-Type")) {
			headers.set("Content-Type", "application/json");

			if (body) {
				if (requestOptions.method?.toUpperCase() === "GET") {
					// Merge body into query string for GET requests
					const [baseUrl, queryString] = url.split("?");
					const existingParams = new URLSearchParams(queryString);
					const newParams = new URLSearchParams();

					Object.entries(body as Record<string, unknown>).forEach(
						([key, value]) => {
							if (value !== undefined && value !== null) {
								if (Array.isArray(value)) {
									newParams.set(key, value.join(","));
								} else {
									newParams.set(key, String(value));
								}
							}
						}
					);

					existingParams.forEach((value, key) => {
						newParams.set(key, value);
					});

					url = `${baseUrl}?${newParams.toString()}`;
				} else {
					requestOptions.body = JSON.stringify(body);
				}
			}
		}

		requestOptions.headers = headers;

		// Build request URL
		const apiUrl = url.startsWith("/api/v1") ? url : `/api/v1${url}`;
		const requestUrl = `${env.NEXT_PUBLIC_API_URL}${apiUrl}`;

		// Make request
		const response = await fetch(requestUrl, requestOptions);

		// Handle error responses
		if (response.status < 200 || response.status >= 400) {
			const errorText = await response.text().catch(() => "");
			let errorMessage =
				errorText || `Request failed with status ${response.status}`;

			// Try to parse error as JSON
			try {
				const errorData = JSON.parse(errorText) as {
					message?: string;
					error?: string;
				};
				errorMessage = errorData.message || errorData.error || errorMessage;
			} catch {
				// Use text as is
			}

			// Throw appropriate error type
			if (response.status === 401) {
				throw new UnauthorizedError(errorMessage);
			}

			throw new NetworkError(errorMessage, response.status);
		}

		// Parse response
		const contentType = response.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			return (await response.json()) as U;
		}

		return response as unknown as U;
	} catch (error) {
		errorHandler.handle(error, {
			component: "fetchServer",
			action: url,
		});
		throw error;
	}
};
