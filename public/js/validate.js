// Some functions called in here are defined in validate_helpers.

//Autocomplete the registration date input field.
if (document.querySelector("#regDate")) {
  let today = new Date().toISOString().substr(0, 10);
  const regDateInput = document.querySelector("#regDate");
  regDateInput.value = today;
  insertAfter(
    successMessage("Registration date is auto-completed."),
    regDateInput
  );
}

//Function validates input elements before submission.
const validate = (form) => {
  //Check first name input field.
  if (form.firstname) {
    const firstNameInput = form.firstname;
    var nameRegex = /^[a-zA-Z]{2,25}$/;
    if (!nameRegex.test(firstNameInput.value)) {
      insertAfter(
        errorMessage("Only alphabets accepted. Length 2-25 characters."),
        firstNameInput
      );
      alertError(firstNameInput);
      firstNameInput.focus();
      return false;
    }
  }

  //Check last name input field.
  if (form.lastname) {
    const lastNameInput = form.lastname;
    if (!nameRegex.test(lastNameInput.value)) {
      insertAfter(
        errorMessage("Only alphabets accepted. Length 2-25 characters."),
        lastNameInput
      );
      alertError(lastNameInput);
      lastNameInput.focus();
      return false;
    }
  }
  // Check email input field.
  if (form.email) {
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
  }
  //Check name input field.
  if (form.name) {
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
  }

  //Check date of birth input.
  if (form.dob) {
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
  }

  //Check the gender input.
  if (form.gender) {
    const genderInput = form.gender;
    if (genderInput.value == "default") {
      insertAfter(errorMessage("Please select a gender."), genderInput);
      alertError(genderInput);
      genderInput.focus();
      return false;
    }
  }

  //Check phone number input.
  if (form.phonenumber) {
    const phoneInput = form.phonenumber;
    const phoneRegex = /^0[3,4,7][0-9]{8}$/;
    // First phone field is a MUST. The second is optional.
    if (!phoneInput.length) {
      if (!phoneRegex.test(phoneInput.value)) {
        insertAfter(
          errorMessage(
            "Acceptable Ugandan codes; 07,03,04. Length MUST be 10."
          ),
          phoneInput
        );
        alertError(phoneInput);
        phoneInput.focus();
        return false;
      }
    } else {
      if (!phoneRegex.test(phoneInput[0].value)) {
        insertAfter(
          errorMessage(
            "Acceptable Ugandan codes; 07,03,04. Length MUST be 10."
          ),
          phoneInput[0]
        );
        alertError(phoneInput[0]);
        phoneInput[0].focus();
        return false;
      } else {
        if (
          !phoneRegex.test(phoneInput[1].value) &&
          phoneInput[1].value != ""
        ) {
          insertAfter(
            errorMessage(
              "Acceptable Ugandan codes; 07,03,04. Length MUST be 10."
            ),
            phoneInput[1]
          );
          alertError(phoneInput[1]);
          phoneInput[1].focus();
          return false;
        }
      }
    }
  }

  //Check the NIN input
  if (form.nin) {
    const ninInput = form.nin;
    const ninRegex = /^\w{13}$/;
    if (!ninRegex.test(ninInput.value)) {
      insertAfter(errorMessage("NIN should be 13 characters long."), ninInput);
      alertError(ninInput);
      ninInput.focus();
      return false;
    }
  }

  //Check ward input
  if (form.ward) {
    const wardInput = form.ward;
    // A space is acceptable. To eliminate possible empty string, include in next set.
    // Ward in some forms is a checklist & in others a single field. Test and apply.
    if (!wardInput.length) {
      var wardRegex = /^[0-9a-zA-Z]+[0-9a-zA-Z ]+$/;
      if (!wardRegex.test(wardInput.value)) {
        insertAfter(errorMessage("Please provide ward value."), wardInput);
        alertError(wardInput);
        wardInput.focus();
        return false;
      }
    } else {
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
    }
  }

  //Check categories input.
  if (document.getElementById("categories")) {
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
  }

  //Check unique id input.
  if (form.username) {
    // Read the name on the form. And appropriately allocated the unique ID.
    const usernameInput = form.username;
    let formName = form.getAttribute("name");
    let signupRegex = /signup/,
      signinRegex = /signin/;
    let usernameRegex;

    // Apply different checks based on the form.
    if (signinRegex.test(formName) || signupRegex.test(formName)) {
      usernameRegex = /^\w+$/;
      if (!usernameRegex.test(usernameInput.value)) {
        insertAfter(
          errorMessage("Only alphabets and numbers are accepted. No spaces."),
          usernameInput
        );
        alertError(usernameInput);
        usernameInput.focus();
        return false;
      }
    } else {
      let ufRegex = /UF/,
        foRegex = /FO/;
      if (ufRegex.test(formName)) {
        usernameRegex = /^UF-[0-9]{10}$/;
      } else if (foRegex.test(formName)) {
        usernameRegex = /^FO-[0-9]{10}$/;
      }
      if (!usernameRegex.test(usernameInput.value)) {
        insertAfter(
          errorMessage("Click create button to create a unique ID"),
          usernameInput
        );
        alertError(usernameInput);
        return false;
      }
    }
  }

  // Check password to input.
  if (form.password) {
    const passwordInput = form.password;
    if (passwordInput.value == "") {
      insertAfter(errorMessage("Please choose password."), passwordInput);
      alertError(passwordInput);
      return false;
    }
  }

  // Check residence input.
  if (form.residence) {
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
  }

  // Check period of stay in location.
  if (form.since) {
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
  }

  // Check directions to residence.
  if (form.directions) {
    const directionInput = form.directions;
    if (directionInput.value == "") {
      insertAfter(
        errorMessage("Please provide directions to home location."),
        directionInput
      );
      alertError(directionInput);
      return false;
    }
  }
  // If all is clear trigger submit event on the form.
  form.requestSubmit();
};

// Bind on all buttons with class submit.
let submitBtns = document.getElementsByClassName("submit");
[].forEach.call(submitBtns, (btn) => {
  btn.addEventListener("click", function (event) {
    // Access the associated form element.
    let form = event.target.parentNode.parentNode.parentNode;

    // Call the validation function passing in the form element.
    validate(form);
  });
});
