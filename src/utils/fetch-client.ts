"use client";

import {
	NetworkError,
	TimeoutError,
	UnauthorizedError,
	errorHandler,
} from "@/lib/errors";
import { env } from "@/lib/env";

interface FetchOptions<TRequest> extends Omit<RequestInit, "body"> {
	body?: TRequest;
	retries?: number;
	timeout?: number;
}

/**
 * Type-safe fetch client with error handling and retries
 */
export async function fetchClient<TRequest, TResponse>(
	url: string,
	options: FetchOptions<TRequest> = {}
): Promise<TResponse> {
	const { retries = 3, timeout = 30000, body, ...restOptions } = options;

	for (let attempt = 0; attempt < retries; attempt++) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			const headers = new Headers(restOptions.headers);
			const requestOptions: RequestInit = { ...restOptions };

			// Set default headers
			headers.set("Accept", "application/json");
			headers.set("X-Client-Type", "web");
			headers.set("X-Client-Version", env.NEXT_PUBLIC_APP_VERSION);

			// Detect locale from URL
			try {
				const localeFromPath =
					typeof window !== "undefined"
						? window.location.pathname.split("/")[1]
						: undefined;
				if (localeFromPath) {
					headers.set("X-Locale", localeFromPath);
				}
			} catch {
				// Ignore locale detection errors
			}

			if (!headers.get("Content-Type")) {
				headers.set("Content-Type", "application/json");
			}

			// Default to GET if method not provided
			if (!requestOptions.method) {
				requestOptions.method = "GET";
			}

			// Handle request body
			if (body !== undefined) {
				if (headers.get("Content-Type") === "multipart/form-data") {
					headers.delete("Content-Type");
					requestOptions.body = body as unknown as BodyInit;
				} else if (requestOptions.method?.toUpperCase() === "GET") {
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

					existingParams.forEach((value, key) => newParams.set(key, value));
					url = `${baseUrl}?${newParams.toString()}`;
				} else {
					requestOptions.body = JSON.stringify(body);
				}
			}

			requestOptions.headers = headers;
			requestOptions.signal = controller.signal;

			// Build request URL
			const apiUrl = url.startsWith("/api/v1") ? url : `/api/v1${url}`;

			// Make request
			const res = await fetch(apiUrl, requestOptions);

			clearTimeout(timeoutId);

			// Handle response
			if (!res.ok) {
				const errorText = await res.text().catch(() => "");
				let errorMessage =
					errorText || `Request failed with status ${res.status}`;

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
				if (res.status === 401) {
					throw new UnauthorizedError(errorMessage);
				}

				throw new NetworkError(errorMessage, res.status);
			}

			// Parse response
			const contentType = res.headers.get("content-type");
			if (contentType?.includes("application/json")) {
				return (await res.json()) as TResponse;
			}

			return (await res.text()) as unknown as TResponse;
		} catch (error) {
			// Handle timeout
			if (error instanceof DOMException && error.name === "AbortError") {
				const timeoutError = new TimeoutError();
				if (attempt === retries - 1) {
					errorHandler.handle(timeoutError, {
						component: "fetchClient",
						action: url,
						metadata: { attempt: attempt + 1, retries },
					});
					throw timeoutError;
				}
				// Retry with exponential backoff
				await new Promise((resolve) =>
					setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 10000))
				);
				continue;
			}

			// Last attempt - throw error
			if (attempt === retries - 1) {
				errorHandler.handle(error, {
					component: "fetchClient",
					action: url,
					metadata: { attempt: attempt + 1, retries },
				});
				throw error;
			}

			// Retry with exponential backoff
			await new Promise((resolve) =>
				setTimeout(resolve, Math.min(1000 * Math.pow(2, attempt), 10000))
			);
		}
	}

	throw new NetworkError("Max retries exceeded");
}
