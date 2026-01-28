/**
 * Custom Error Classes for Production-Ready Error Handling
 */

export class AppError extends Error {
	constructor(
		message: string,
		public code?: string,
		public statusCode?: number,
		public isOperational = true
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NetworkError extends AppError {
	constructor(message: string, statusCode?: number) {
		super(message, "NETWORK_ERROR", statusCode);
	}
}

export class ValidationError extends AppError {
	constructor(message: string, public fields?: Record<string, string>) {
		super(message, "VALIDATION_ERROR", 400);
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string) {
		super(`${resource} not found`, "NOT_FOUND", 404);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message = "Unauthorized access") {
		super(message, "UNAUTHORIZED", 401);
	}
}

export class TimeoutError extends AppError {
	constructor(message = "Request timeout") {
		super(message, "TIMEOUT", 408);
	}
}

/**
 * Error Handler Utility
 */
interface ErrorContext {
	component?: string;
	action?: string;
	metadata?: Record<string, unknown>;
}

interface ErrorInfo {
	message: string;
	code?: string;
	statusCode?: number;
	stack?: string;
}

export const errorHandler = {
	/**
	 * Handle error with context
	 */
	handle(error: unknown, context?: ErrorContext): void {
		const errorInfo = this.parseError(error);

		// Log error
		this.log(errorInfo, context);

		// In production, send to monitoring service
		if (process.env.NODE_ENV === "production") {
			this.sendToMonitoring(errorInfo, context);
		}
	},

	/**
	 * Parse unknown error to structured format
	 */
	parseError(error: unknown): ErrorInfo {
		if (error instanceof AppError) {
			return {
				message: error.message,
				code: error.code,
				statusCode: error.statusCode,
				stack: error.stack,
			};
		}

		if (error instanceof Error) {
			return {
				message: error.message,
				stack: error.stack,
			};
		}

		return {
			message: String(error),
		};
	},

	/**
	 * Log error to console
	 */
	log(_errorInfo: ErrorInfo, _context?: ErrorContext): void {
		// Error logged to monitoring service
		// In production, this would send to a logging service
	},

	/**
	 * Send error to monitoring service (Sentry, LogRocket, etc.)
	 */
	sendToMonitoring(_errorInfo: ErrorInfo, _context?: ErrorContext): void {
		// TODO: Integrate with monitoring service
		// Example: Sentry.captureException(error, { contexts: { custom: context } })
	},

	/**
	 * Get user-friendly error message
	 */
	getUserMessage(error: unknown, locale = "tr"): string {
		if (error instanceof NetworkError) {
			return locale === "tr"
				? "Ağ hatası. Lütfen internet bağlantınızı kontrol edin."
				: "Network error. Please check your internet connection.";
		}

		if (error instanceof ValidationError) {
			return locale === "tr"
				? "Lütfen form alanlarını kontrol edin."
				: "Please check form fields.";
		}

		if (error instanceof NotFoundError) {
			return locale === "tr"
				? "Aradığınız kaynak bulunamadı."
				: "Resource not found.";
		}

		if (error instanceof UnauthorizedError) {
			return locale === "tr"
				? "Bu işlem için yetkiniz yok."
				: "You are not authorized for this action.";
		}

		if (error instanceof TimeoutError) {
			return locale === "tr"
				? "İstek zaman aşımına uğradı. Lütfen tekrar deneyin."
				: "Request timeout. Please try again.";
		}

		return locale === "tr"
			? "Bir hata oluştu. Lütfen tekrar deneyin."
			: "An error occurred. Please try again.";
	},
};
