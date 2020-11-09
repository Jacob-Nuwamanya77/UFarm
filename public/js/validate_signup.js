//Function inserts element into the DOM.''
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

//Function validates input elements before submission.
const validate_signup = () => {
	//Access the form element and store it in a variable.
	const form = document.signup;

	//Check first name input field.
	const firstNameInput = form.firstName;
	const nameRegex = /^[a-zA-Z]{5,25}$/;
	if (!nameRegex.test(firstNameInput.value)) {
		insertAfter(
			errorMessage("Only alphabets accepted. Length 5-25 characters."),
			firstNameInput
		);
		alertError(firstNameInput);
		firstNameInput.focus();
		return false;
	}

	//Check last name input field.
	const lastNameInput = form.lastName;
	if (!nameRegex.test(lastNameInput.value)) {
		insertAfter(
			errorMessage("Only alphabets accepted. Length 5-25 characters."),
			lastNameInput
		);
		alertError(lastNameInput);
		lastNameInput.focus();
		return false;
	}
	// Check email address input.
	const emailInput = form.email;
	const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailRegex.test(emailInput.value)) {
		insertAfter(
			errorMessage(
				"Invalid email address.Please check for common email characters @"
			),
			emailInput
		);
		alertError(emailInput);
		emailInput.focus();
		return false;
	}

	//Check phone number input.
	const phoneInput = form.phoneNumber;
	const phoneRegex = /^0[3,4,7][0-9]{8}$/;
	if (!phoneInput.length) {
		if (!phoneRegex.test(phoneInput.value)) {
			insertAfter(
				errorMessage(
					"Acceptable Ugandan codes; 07, 03, 04. Length MUST be 10."
				),
				phoneInput
			);
			alertError(phoneInput);
			phoneInput.focus();
			return false;
		}
	} else {
		for (let i = 0; i < phoneInput.length; i++) {
			if (!phoneRegex.test(phoneInput[i].value) && phoneInput[i].value!="") {
				insertAfter(
					errorMessage(
						"Acceptable Ugandan codes; 07, 03, 04. Length MUST be 10."
					),
					phoneInput[i]
				);
				alertError(phoneInput[i]);
				phoneInput[i].focus();
				return false;
			}
		}
	}

	//Check user name input.
	const userNameInput = form.userName;
	const userNameRegex = /^\w+$/;
	if (!userNameRegex.test(userNameInput.value)) {
		insertAfter(
			errorMessage("Only alphabets and numbers are accepted."),
			userNameInput
		);
		alertError(userNameInput);
		userNameInput.focus();
		return false;
	}

	//Check password input field.
	const passwordInput = form.password;
	if (passwordInput.value == "") {
		insertAfter(errorMessage("Empty field unacceptable."), passwordInput);
		alertError(passwordInput);
		passwordInput.focus();
		return false;
	}
};

//Function adds new phone field into the DOM.
const addPhoneSlot = (event) => {
	event.stopPropagation();
	let phone2 = document.getElementsByClassName("phone2")[0];
	phone2.classList.remove("display-none");
	//Remove the add button. Limit functionality to one extra phone number.
	event.target.classList.add("display-none");
};

//Set handler on the add button.
let addBtn = document.getElementsByClassName("addPhone")[0];
addBtn.addEventListener("click", addPhoneSlot);

//Function removes phone field from the DOM.
const removePhoneSlot = (event) => {
	event.stopPropagation();
	let phone2 = document.getElementsByClassName("phone2")[0];
	phone2.classList.add("display-none");
	//Return the add option when someone removes the second phone field.
	addBtn.classList.remove("display-none");
};

// Set handler on the remove button
let removeBtn = document.getElementsByClassName("removePhone")[0];
removeBtn.addEventListener("click", removePhoneSlot);
