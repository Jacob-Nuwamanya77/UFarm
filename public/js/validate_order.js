//Focus on quantity field on load
const form = document.orderform;
const quantityInput = form.quantity;
quantityInput.focus();

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
	//Create a div tag, add message.
	let div = document.createElement("div");
	div.className = "error";
	div.style.marginTop = "10px";
	div.innerHTML = msg;
	return div;
};

//Function adds outline on input element that fails validation.
const alertError = (element) => {
	element.style.outline = "1px solid red";
};

//Function validates input elements before submission.
const validate_order = () => {
	//Access the form element and store it in a variable.
	const form = document.orderform;
	//Access the date and quantity inputs.
	const dateInput = form.deliveryDate;
	const quantityInput = form.quantity;

	//Check qunatity input field.
	const quantityRegex = /^[0-9]+$/;
	if (!quantityRegex.test(quantityInput.value)) {
		let error = errorMessage("Only numbers acceptable for quantity field.");
		dateInput.parentNode.insertBefore(error, dateInput);
		alertError(quantityInput);
		quantityInput.focus();
		return false;
	}

	// Test the value assigned to the delivery date input.
	if (dateInput.value == "") {
		insertAfter(errorMessage("Please select a delivery date."), dateInput);
		alertError(dateInput);
		dateInput.focus();
		return false;
	}
};
