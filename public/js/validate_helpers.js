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
