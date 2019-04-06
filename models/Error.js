
class Error {
	
	constructor() {
		this.errorCode = '';
		this.errorStatus = '';
		this.errorMessage = '';
		this.errorObj = {};
	}

	setErrorCode(code) {
		this.errorCode = code;
		return this;
	}

	setErrorStatus(status) {
		this.errorStatus = status;
		return this;
	}

	setErrorMessage(message) {
		this.errorMessage = message;
		return this;
	}

	setErrorObj(obj) {
		this.errorObj = obj;
		return this;
	}
}