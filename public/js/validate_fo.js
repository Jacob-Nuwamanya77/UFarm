//Function inserts element into the DOM.
const insertAfter = (newElement, targetElement) => {
	var parent = targetElement.parentNode;
	if (parent.lastElementChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextElementSibling);
	}
};

//Function creates an error message to display.
const errorMessage = (msg) => {
	//Create a small tag, add message.
	let small = document.createElement("small");
	small.className = "error";
	small.innerHTML = msg;
	return small;
};

//Function creates a success message to display.
const successMessage = (msg) => {
	//Create a small tag, add message.
	let small = document.createElement("small");
	small.className = "success";
	small.innerHTML = msg;
	return small;
};

//Function adds outline on input element that fails validation.
const alertError = (element) => {
	element.style.outline = "1px solid red";
};

//Autocomplete the registration date input field.
let today = new Date().toISOString().substr(0, 10);
const regDateInput = document.querySelector("#regDate");
regDateInput.value = today;
insertAfter(
	successMessage("Registration date is auto-completed."),
	regDateInput
);

//Function validates input elements before submission.
const validate = () => {
	//Access the form element and store it in a variable.
	const form = document.register_FO;

	//Check name input field.
	const nameInput = form.name;
	const nameRegex = /^[a-zA-Z ]{5,50}$/;
	if (!nameRegex.test(nameInput.value)) {
		insertAfter(
			errorMessage(
				"Only alphabets accepted.Length at least 5 characters"
			),
			nameInput
		);
		alertError(nameInput);
		nameInput.focus();
		return false;
	}

	//Check date of birth input.
	const dobInput = form.dob;
	if (dobInput.value == "") {
		insertAfter(errorMessage("Please select a date of birth."), dobInput);
		alertError(dobInput);
		dobInput.focus();
		return false;
	} else {
		let dobYear = new Date(dobInput.value).getFullYear(),
			currentYear = new Date().getFullYear();
		if (currentYear - dobYear < 10) {
			insertAfter(
				errorMessage("Applicants must be 10 years and above."),
				dobInput
			);
			alertError(dobInput);
			dobInput.focus();
			return false;
		}
	}

	//Check the gender input.
	const genderInput = form.gender;
	if (genderInput.value == "default") {
		insertAfter(errorMessage("Please select a gender."), genderInput);
		alertError(genderInput);
		genderInput.focus();
		return false;
	}

	//Check phone number input.
	const phoneInput = form.phoneNumber;
	const phoneRegex = /^0[3,4,7][0-9]{8}$/;
	if (!phoneRegex.test(phoneInput.value)) {
		insertAfter(
			errorMessage(
				"Acceptable Ugandan codes; 07, 03, 04. Length MUST be 10"
			),
			phoneInput
		);
		alertError(phoneInput);
		phoneInput.focus();
		return false;
	}

	//Check the NIN input
	const ninInput = form.nin;
	const ninRegex = /^\w{13}$/;
	if (!ninRegex.test(ninInput.value)) {
		insertAfter(
			errorMessage("NIN should be 13 characters long."),
			ninInput
		);
		alertError(ninInput);
		ninInput.focus();
		return false;
	}

	//Check ward input
	const wardInput = form.ward;
	for (let i = 0; i < wardInput.length; i++) {
		if (wardInput[i].checked) {
			break;
		} else if (i + 1 == wardInput.length) {
			insertAfter(
				errorMessage("Please select a ward to represent."),
				form.divisions
			);
			alertError(form.divisions);
			wardInput[0].focus();
			return false;
		}
	}

	//Check categories input.
	const categoryContainer = document.getElementById("categories");
	const categoryInput = categoryContainer.querySelectorAll(
		"input[type='checkbox']"
	);
	for (let i = 0; i < categoryInput.length; i++) {
		if (categoryInput[i].checked) {
			break;
		} else if (i + 1 == categoryInput.length) {
			insertAfter(
				errorMessage("Please select categories involved in."),
				form.categories
			);
			alertError(form.categories);
			categoryInput[0].focus();
			return false;
		}
	}

	//Check the residence input.
	const residenceInput = form.residence;
	if (residenceInput.value == "default") {
		insertAfter(
			errorMessage("Please select a residence type."),
			residenceInput
		);
		alertError(residenceInput);
		return false;
	}

	//Check period of stay in location.
	const periodInput = form.since;
	if (periodInput.value == "") {
		insertAfter(
			errorMessage("Please set date when you became a resident of area."),
			periodInput
		);
		alertError(periodInput);
		return false;
	} else {
		let date = new Date(periodInput.value),
			residenceYear = date.getFullYear(),
			currentYear = new Date().getFullYear();
		if (currentYear - residenceYear < 10) {
			insertAfter(
				errorMessage("Must be a resident for more than 10 years"),
				periodInput
			);
			alertError(periodInput);
			return false;
		}
	}

	//Check unique id input.
	const uniqueIdInput = form.ID;
	const uniqueRegex = /^FO-[0-9]{10}$/;
	if (!uniqueRegex.test(uniqueIdInput.value)) {
		insertAfter(
			errorMessage("Click create button to create a unique ID"),
			uniqueIdInput
		);
		alertError(uniqueIdInput);
		return false;
	}

	//Check direction input.
	const directionInput = form.directions;
	if (directionInput.value == "") {
		insertAfter(
			errorMessage("Please provide directions to home location."),
			directionInput
		);
		alertError(directionInput);
		return false;
	}
};

//Function creates a unique farmer ID.
const createID = () => {
	const form = document.register_FO;
	const inputId = form.ID;
	//Check phone number input.
	let phoneInput = form.phoneNumber;
	let phoneRegex = /^0[3,4,7][0-9]{8}$/;
	if (!phoneRegex.test(phoneInput.value)) {
		insertAfter(
			errorMessage("Phone required for unique ID. Scroll up to fill."),
			inputId
		);
		alertError(inputId);
		inputId.focus();
		insertAfter(
			errorMessage(
				"Acceptable Ugandan codes; 07, 03, 04. Length MUST be 10."
			),
			phoneInput
		);
		alertError(phoneInput);
		return false;
	} else {
		let newId = `FO-${phoneInput.value}`;
		inputId.value = newId;
	}
};

//Set handler on the create button to generate unique ID.
document.getElementById("createID").addEventListener("click", createID);
