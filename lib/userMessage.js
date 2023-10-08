const genericError = "Encounter temporary error. Please try again later.";

const loginError = {
	notExist: "The username provided does not exist, please register.",
	wrongCredential: "Wrong username or password.",
	emptyFields: "Empty Username or Password",
};

const uploadSuccess = {
	title: "Uploaded !",
	desc: "You are ready to go !",
	status: "success",
};

const saveDraftSuccess = {
	title: "Success !",
	desc: "Find your drafts in your profile > items .",
	status: "success",
};

const submitEmptyDraft = {
	title: "Warning !",
	desc: "Saving empty draft is not allowed .",
	status: "fail",
};

export { genericError, loginError, uploadSuccess, saveDraftSuccess, submitEmptyDraft };
