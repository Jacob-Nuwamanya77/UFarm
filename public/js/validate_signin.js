// The concept of global namespace.
// insertAfter, errorMessage, alertError are functions defined in another file.

//Function validates input elements before submission.
const validate_signin = () => {
  //Access the form element and store it in a variable.
  const form = document.signin;

  //Check user name input.
  const userNameInput = form.username;
  const userNameRegex = /^\w+$/;
  if (!userNameRegex.test(userNameInput.value)) {
    insertAfter(
      errorMessage("Only alphabets and numbers are accepted. No spaces."),
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
