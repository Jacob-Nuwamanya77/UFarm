// V
const validateProduct = () => {
  const form = document.upload;
  // Check if a category has been selected.
  const categoryInput = form.category;
  if (categoryInput.value == "default") {
    insertAfter(
      errorMessage("Please select categories involved in."),
      categoryInput
    );
    alertError(categoryInput);
    categoryInput.focus();
    return false;
  }
  //   Check qunatity.
  const qtyInput = form.quantity;
  let qtyRegex = /^[0-9]+$/;
  if (!qtyRegex.test(qtyInput.value)) {
    insertAfter(errorMessage("Please set the quantity in numbers"), qtyInput);
    alertError(qtyInput);
    qtyInput.focus();
    return false;
  }
  //   Check price.
  const priceInput = form.price;
  let priceRegex = /^[0-9]+$/;
  if (!priceRegex.test(priceInput.value)) {
    insertAfter(errorMessage("Numbers"), priceInput);
    alertError(priceInput);
    priceInput.focus();
    return false;
  }
  //   Check UOM.
  const uomInput = form.uom;
  let uomRegex = /^[a-zA-Z]+$/;
  if (!uomRegex.test(uomInput.value)) {
    insertAfter(errorMessage("Alphabets"), uomInput);
    alertError(uomInput);
    uomInput.focus();
    return false;
  }
  // Check produce type.
  const typeContainer = document.getElementsByClassName("type")[0];
  const typeInput = typeContainer.querySelectorAll("input[type='radio']");

  for (let i = 0; i < typeInput.length; i++) {
    if (typeInput[i].checked) {
      break;
    } else if (i + 1 == typeInput.length) {
      insertAfter(
        errorMessage("Please select type of produce."),
        typeContainer
      );
      alertError(typeContainer);
      typeContainer[0].focus();
      return false;
    }
  }
  //   Check payment options.
  const paymentContainer = document.getElementsByClassName("payment")[0];
  const paymentInput = paymentContainer.querySelectorAll(
    "input[type='checkbox']"
  );

  for (let i = 0; i < paymentInput.length; i++) {
    if (paymentInput[i].checked) {
      break;
    } else if (i + 1 == paymentInput.length) {
      insertAfter(
        errorMessage("Please select preferred payment."),
        paymentContainer
      );
      alertError(paymentContainer);
      paymentContainer[0].focus();
      return false;
    }
  }
  //   Check delivery options.
  const deliveryContainer = document.getElementsByClassName("delivery")[0];
  const deliveryInput = deliveryContainer.querySelectorAll(
    "input[type='checkbox']"
  );

  for (let i = 0; i < deliveryInput.length; i++) {
    if (deliveryInput[i].checked) {
      break;
    } else if (i + 1 == deliveryInput.length) {
      insertAfter(
        errorMessage("Please select preferred delivery."),
        deliveryContainer
      );
      alertError(deliveryContainer);
      deliveryContainer[0].focus();
      return false;
    }
  }
  // Check location field, should not be empty.
  const locationInput = form.location;
  let locationRegex = /^[a-zA-Z]+$/;
  if (!locationRegex.test(locationInput.value)) {
    insertAfter(errorMessage("Alphabets"), locationInput);
    alertError(locationInput);
    locationInput.focus();
    return false;
  }
  // Check to ensure file is uploaded.
  let fileField = form.image;
  if (!fileField.value) {
    insertAfter(errorMessage("Upload file please"), fileField);
    alertError(fileField);
    fileField.focus();
    return false;
  }
  // Disable button to stop double submission.
  let submitBtn = document.getElementsByClassName("submit")[0];
  submitBtn.disabled = true;
  submitBtn.value = "Please wait ....";
  // Submit form.
  form.requestSubmit();
};

let submitBtn = document.getElementsByClassName("submit")[0];
submitBtn.addEventListener("click", validateProduct);

// Set click on close icon.
let formdisplay = document.getElementsByClassName("formdisplay")[0];
let closeIcon = formdisplay.getElementsByClassName("close-icon")[0];
closeIcon.addEventListener("click", function () {
  formdisplay.classList.add("display-none");
});

// Set click on the add product to display menu.
let addProduct = document.getElementsByClassName("addProduct")[0];
addProduct.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  formdisplay.classList.remove("display-none");
});
