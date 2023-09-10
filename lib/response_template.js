class Response {
	constructor(data) {
		this.data = data;
	}

	success() {
		return {
			status: "success",
			data: this.data,
		};
	}

	fail() {
		return {
			status: "fail",
			data: this.data.message,
		};
	}
}

export default Response;
