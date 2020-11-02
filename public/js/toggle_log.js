const showSignup = (event) => {
	event.preventDefault();
	event.stopPropagation();
	let signInContainer, signUpContainer;
	signInContainer = document.getElementsByClassName("signin-container")[0];
	signUpContainer = document.getElementsByClassName("signup-container")[0];

	//Change display settings to show the sign up page.
	signInContainer.classList.add("display-none");
	signUpContainer.classList.remove("display-none");
};

const anchorSignup = document.getElementById("showSignup");
anchorSignup.addEventListener("click", showSignup);

const showSignin = (event) => {
	event.preventDefault();
	event.stopPropagation();
	let signInContainer, signUpContainer;
	signInContainer = document.getElementsByClassName("signin-container")[0];
	signUpContainer = document.getElementsByClassName("signup-container")[0];

	//Change display settings to show the sign up page.
	signUpContainer.classList.add("display-none");
	signInContainer.classList.remove("display-none");
};

const anchorSignin = document.getElementById("showSignin");
anchorSignin.addEventListener("click", showSignin);
