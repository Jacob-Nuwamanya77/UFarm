// Use an IFFY to provide protected scope for similar variable names.
(function () {
  // Function resets fields before display data or at close.
  const resetUpdateData = (container) => {
    // Container is the formdisplay div that holds all form & additional info.
    container.getElementsByClassName("farmername")[0].textContent = "";
    let form = container.getElementsByTagName("form")[0];
    form.removeAttribute("action");
    form.phonenumber[0] = "";
    form.phonenumber[1] = "";
    form.activities[0].checked = false;
    form.activities[1].checked = false;
    form.activities[2].checked = false;
  };

  // Function reads data and prefills the form with current details.
  const showUpdate = (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Access the tablerow to access current information.
    let tablerow = event.target.parentNode.parentNode,
      tablerowChildren = tablerow.children;

    // Access the data to pass into the form.
    let user_id, farmername, ph1, ph2, poultry, diary, horticulture;
    user_id = tablerow.getAttribute("data-id");
    farmername = tablerowChildren[0].textContent;
    // Phone numbers.
    ph1 = tablerowChildren[3].textContent.substr(0, 10);
    ph2 = tablerowChildren[3].textContent.substr(10, 10);
    // Activities.
    let activities = tablerowChildren[5].textContent.toLowerCase();
    if (/diary/.test(activities)) {
      diary = true;
    }
    if (/horticulture/.test(activities)) {
      horticulture = true;
    }
    if (/poultry/.test(activities)) {
      poultry = true;
    }
    // Reset data if any before you can display new data.
    let formDisplay = document.getElementsByClassName("formdisplay")[0];
    resetUpdateData(formDisplay);
    // Set the title of the display.
    let namediv = document.getElementsByClassName("farmername")[0];
    namediv.textContent = `${farmername} Details`;
    // Access the form fields and set the values.
    let form = document.update;
    // Set the action on the form
    form.setAttribute("action", `ao/farmerones/update/${user_id}`);
    // Add current phone details to form.
    if (ph1 && ph2) {
      form.phonenumber[0].value = ph1;
      form.phonenumber[1].value = ph2;
    } else {
      form.phonenumber[0].value = ph1;
    }
    // Check current activities.
    let activityInputs = form.activities;
    if (horticulture) {
      activityInputs[0].checked = true;
    }
    if (poultry) {
      activityInputs[1].checked = true;
    }
    if (diary) {
      activityInputs[2].checked = true;
    }
    // If display is active, clear it.
    let display = document.querySelector("div.display");
    if (!/display-none/.test(display.classList.value)) {
      display.classList.add("display-none");
      display.removeChild(display.children[0]);
    }
    // Now display the new form with content.

    if (/display-none/.test(formDisplay.classList.value)) {
      formDisplay.classList.remove("display-none");
    }
    // Set click on close icon.
    let closeIcon = formDisplay.getElementsByClassName("close-icon")[0];
    closeIcon.addEventListener("click", function () {
      formDisplay.classList.add("display-none");
      // Reset all data.
      resetUpdateData(formDisplay);
    });
  };

  // Set click handler on the tbody tag to handle all detail clicks.
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.addEventListener("click", function (event) {
    event.stopPropagation();
    let eventSrc = event.target,
      // Test classes on src for class details. Handle only clicks from details.
      regex = /update/;
    if (regex.test(eventSrc.classList.value)) {
      showUpdate(event);
    }
  });
})();
