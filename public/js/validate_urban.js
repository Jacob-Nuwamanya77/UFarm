//Function inserts element into the DOM.''
const insertAfter = (newElement, targetElement) => {
  var parent = targetElement.parentNode;
  if (parent.lastElementChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextElementSibling);
  }
};

//Function creates an error message to display
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
  const form = document.register_UF;

  //Check name input field.
  const nameInput = form.name;
  const nameRegex = /^[a-zA-Z ]{5,50}$/;
  if (!nameRegex.test(nameInput.value)) {
    insertAfter(
      errorMessage("Only alphabets accepted. Length at least 5 characters"),
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
        errorMessage("Applicants MUST be 10 years and above."),
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
  const phoneInput = form.phonenumber;
  const phoneRegex = /^0[3,4,7][0-9]{8}$/;
  // First phone field is a MUST. The second is optional.
  if (!phoneRegex.test(phoneInput[0].value)) {
    insertAfter(
      errorMessage("Acceptable Ugandan codes; 07,03,04. Length MUST be 10."),
      phoneInput[0]
    );
    alertError(phoneInput[0]);
    phoneInput[0].focus();
    return false;
  } else {
    if (!phoneRegex.test(phoneInput[1].value) && phoneInput[1].value != "") {
      insertAfter(
        errorMessage("Acceptable Ugandan codes; 07,03,04. Length MUST be 10."),
        phoneInput[0]
      );
      alertError(phoneInput[0]);
      phoneInput[1].focus();
      return false;
    }
  }

  //Check the NIN input
  const ninInput = form.nin;
  const ninRegex = /^\w{13}$/;
  if (!ninRegex.test(ninInput.value)) {
    insertAfter(errorMessage("NIN should be 13 characters long."), ninInput);
    alertError(ninInput);
    ninInput.focus();
    return false;
  }

  //Check ward input
  const wardInput = form.ward;
  // A space is acceptable. To eliminate possible empty string, include in next set.
  const wardRegex = /^[0-9a-zA-Z]+[0-9a-zA-Z ]+$/;
  if (!wardRegex.test(wardInput.value)) {
    insertAfter(errorMessage("Please provide ward value."), wardInput);
    alertError(wardInput);
    wardInput.focus();
    return false;
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

  //Check unique id input.
  const usernameInput = form.username;
  const usernameRegex = /^UF-[0-9]{10}$/;
  if (!usernameRegex.test(usernameInput.value)) {
    insertAfter(
      errorMessage("Click create button to create a unique ID"),
      usernameInput
    );
    alertError(usernameInput);
    return false;
  }

  // Check password to input.
  const passwordInput = form.password;
  if (passwordInput.value == "") {
    insertAfter(errorMessage("Please choose password."), passwordInput);
    alertError(passwordInput);
    return false;
  }
};

//Function creates a unique farmer ID.
const createID = () => {
  const form = document.register_UF;
  const inputId = form.username;
  //Check phone number input.
  let phoneInput = form.phonenumber;
  let phoneRegex = /^0[3,4,7][0-9]{8}$/;
  if (!phoneRegex.test(phoneInput[0].value)) {
    insertAfter(
      errorMessage("Phone required for unique ID. Scroll up to fill."),
      inputId
    );
    alertError(inputId);
    inputId.focus();
    insertAfter(
      errorMessage("Acceptable Ugandan codes; 07, 03, 04. Length MUST be 10."),
      phoneInput[0]
    );
    alertError(phoneInput[0]);
    return false;
  } else {
    let newId = `UF-${phoneInput[0].value}`;
    inputId.value = newId;
  }
};
//Set handler on the create button to generate unique ID.
document.getElementById("createID").addEventListener("click", createID);

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
