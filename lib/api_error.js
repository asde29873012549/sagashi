class AppError extends Error {
	constructor(message, status) {
		super(message);

		this.status = status;
		this.message = message;
	}
}

//	Occurs when the request from the client is invalid or lacks required data.
class BadRequestError extends AppError {
	constructor(message = "Bad Request") {
		super(message, 400);
	}
}

//	Occurs when a requested resource is not found in the database.
class UnauthorizedError extends AppError {
	constructor(message = "User access unauthenticated") {
		super(message, 401);
	}
}

//	Occurs when a user is authenticated but doesn't have the necessary permissions to access a resource
class ForbiddenError extends AppError {
	constructor(message = "User access unauthorized") {
		super(message, 403);
	}
}

//	Occurs when a requested resource is not found in the database.
class NotFoundError extends AppError {
	constructor(message = "Resource Not Found") {
		super(message, 404);
	}
}

//	Occurs when there's a conflict, such as trying to create a resource that already exists
class ConflictError extends AppError {
	constructor(message = "Resource Already Exist") {
		super(message, 404);
	}
}

//	Occurs when there's a conflict, such as trying to create a resource that already exists
class ValidationError extends AppError {
	constructor(message = "Wrong Input Data / Params") {
		super(message, 422);
	}
}

//	Occurs when there's an issue with database operations, like a failed SQL query
class DatabaseError extends AppError {
	constructor(message = "Database operation failed") {
		super(message, 500);
	}
}

//	Occurs when a user's session has expired
class SessionExpiredError extends AppError {
	constructor(message = "User Session Expired") {
		super(message, 401);
	}
}

//	Occurs when there's an issue with payment processing, like a declined credit card
class PaymentError extends AppError {
	constructor(message = "Payment Declined") {
		super(message, 500);
	}
}

//	Occurs when there's an issue with payment processing, like a declined credit card
class StockUnavailableError extends AppError {
	constructor(message = "Stock is currently unavailable") {
		super(message, 409);
	}
}

//	Occurs when a required service (e.g., Redis) is temporarily unavailable.
class ServiceUnavailableError extends AppError {
	constructor(message = "Service is currently unavailable") {
		super(message, 503);
	}
}

//	Occurs when a user exceeds their rate limit for API requests.
class RateLimitExceededError extends AppError {
	constructor(message = "Request has exceed the limit. Please try again later") {
		super(message, 429);
	}
}

//	Occurs when there's problem with Redis.
class RedisError extends AppError {
	constructor(message = "Redis unavailable") {
		super(message, 500);
	}
}

class StorageError extends AppError {
	constructor(message = "Cloud Storage upload failed") {
		super(message, 500);
	}
}

export {
	AppError,
	BadRequestError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	ValidationError,
	DatabaseError,
	SessionExpiredError,
	PaymentError,
	StockUnavailableError,
	ServiceUnavailableError,
	RateLimitExceededError,
	RedisError,
	StorageError,
};
