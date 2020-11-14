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

//Function creates a unique farmer ID.
const createID = (form) => {
  // Unique ID is stored in db as the username.
  const inputId = form.username;
  //Check phone number input.
  let phoneInput = form.phonenumber;
  console.log(form);
  let phoneRegex = /^0[3,4,7][0-9]{8}$/;
  if (!phoneInput.length) {
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
      // Read the name on the form. And appropriately allocated the unique ID.
      let ufRegex = /UF/,
        foRegex = /FO/;
      let formName = form.getAttribute("name");
      let newID;
      if (ufRegex.test(formName)) {
        newId = `UF-${phoneInput.value}`;
        inputId.value = newId;
      } else if (foRegex.test(formName)) {
        newId = `FO-${phoneInput.value}`;
        inputId.value = newId;
      }
    }
  } else {
    if (!phoneRegex.test(phoneInput[0].value)) {
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
        phoneInput[0]
      );
      alertError(phoneInput[0]);
      return false;
    } else {
      // Read the name on the form. And appropriately allocated the unique ID.
      let ufRegex = /UF/,
        foRegex = /FO/;
      let formName = form.getAttribute("name");
      let newID;
      if (ufRegex.test(formName)) {
        newId = `UF-${phoneInput[0].value}`;
        inputId.value = newId;
      } else if (foRegex.test(formName)) {
        newId = `FO-${phoneInput[0].value}`;
        inputId.value = newId;
      }
    }
  }
};
//Conditionally set handler because it is a shared file, elements might not be present.
if (document.getElementById("createID")) {
  document
    .getElementById("createID")
    .addEventListener("click", function (event) {
      let form = event.target.parentNode.parentNode.parentNode.parentNode;
      // Call the createID function.
      createID(form);
    });
}

//Function adds new phone field into the DOM.
const addPhoneSlot = (event) => {
  event.stopPropagation();
  let phone2 = document.getElementsByClassName("phone2")[0];
  phone2.classList.remove("display-none");
  //Remove the add button. Limit functionality to one extra phone number.
  event.target.classList.add("display-none");
};

//Conditionally set handler because it is a shared file, elements might not be present.
if (document.getElementsByClassName("addPhone")[0]) {
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
  let removeBtn = document.getElementsByClassName("removePhone")[0];
  removeBtn.addEventListener("click", removePhoneSlot);
}
