(function () {
  const form = document.orderform;
  const validateProduct = () => {
    // Check name.
    const nameInput = form.name;
    var nameRegex = /^[a-zA-Z ]{5,50}$/;
    if (!nameRegex.test(nameInput.value)) {
      insertAfter(
        errorMessage("Only alphabets accepted. Length 5-50 characters."),
        nameInput
      );
      alertError(nameInput);
      nameInput.focus();
      return false;
    }

    // Check phonenumber.
    const phoneInput = form.phonenumber;
    const phoneRegex = /^0[3,4,7][0-9]{8}$/;
    if (!phoneRegex.test(phoneInput.value)) {
      insertAfter(
        errorMessage("Acceptable Ugandan codes; 07,03,04. Length MUST be 10."),
        phoneInput
      );
      alertError(phoneInput);
      phoneInput.focus();
      return false;
    }

    // Check quantity field.
    const qtyInput = form.quantity;
    const qtyRegex = /^[0-9]+$/;

    //Quantity can't exceed available stock either.
    const qtyParent = qtyInput.parentNode;
    const qtyStock = qtyParent.getAttribute("data-quantity");

    if (
      !qtyRegex.test(qtyInput.value) ||
      parseInt(qtyInput.value) > parseInt(qtyStock)
    ) {
      insertAfter(
        errorMessage("Only numbers & value should not be more than available"),
        qtyInput
      );
      alertError(qtyInput);
      qtyInput.focus();
      return false;
    }

    // Check payment options.
    const payInput = form.payment;
    // Single options are auto checked, only need to check when mult-options.
    if (payInput.length) {
      for (let i = 0; i < payInput.length; i++) {
        if (payInput[i].checked) {
          break;
        } else if (i + 1 == payInput.length) {
          insertAfter(
            errorMessage("Select from options."),
            payInput[0].parentNode.parentNode
          );
          alertError(payInput[0].parentNode.parentNode);
          payInput[0].focus();
          return false;
        }
      }
    }

    // Check delivery options.
    const deliveryInput = form.delivery;
    // Single options are auto checked, only need to check when mult-options.
    if (deliveryInput.length) {
      for (let i = 0; i < deliveryInput.length; i++) {
        if (deliveryInput[i].checked) {
          break;
        } else if (i + 1 == deliveryInput.length) {
          insertAfter(
            errorMessage("Select from options."),
            deliveryInput[0].parentNode.parentNode
          );
          alertError(deliveryInput[0].parentNode.parentNode);
          deliveryInput[0].focus();
          return false;
        }
      }
    }

    // Check delivery date.
    const dateInput = form.date;
    if (dateInput.value == "") {
      insertAfter(errorMessage("Please select a delivery date."), dateInput);
      alertError(dateInput);
      dateInput.focus();
      return false;
    }
    // Disable button when all is clear to avoid double submission.
    let submitBtn = form.getElementsByClassName("submit")[0];
    submitBtn.disabled = true;
    submitBtn.value = "Please wait .....";

    // If all is clear trigger submit event on the form.
    form.requestSubmit();
  };
  let submitBtn = document.getElementsByClassName("submit")[0];
  submitBtn.addEventListener("click", validateProduct);

  // Calculate the total cost.
  let qtyField = form.quantity;
  let totalField = form.total;
  let price = totalField.parentNode.getAttribute("data-price");
  qtyField.addEventListener("change", function () {
    totalField.value = qtyField.value * price;
  });
})();
