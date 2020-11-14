// Function provides necessary scope to yet to be determined values.
function elements(tablerow) {
  // From this will build a template to display when update is clicked.
  // Store the objects representing the elements to create in an array and iterate.
  const heading = [
    {
      type: "div",
      children: [
        {
          type: "div",
          className: "title",
          content: `${tablerow[0].textContent} Details`,
        },
        { type: "span", className: "close-icon", content: "X" },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", className: "zmdi zmdi-alert-triangle" },
        {
          type: "span",
          content: `Warning: You can only edit fields below on this profile`,
        },
      ],
    },
  ];
  const phones = [
    { type: "div", className: "input-group phoneContacts" },
    { type: "div", className: "flex-row" },
    {
      type: "div",
      className: "input-group row-left",
      children: [{ type: "input" }],
    },
    {
      type: "div",
      className: "input-group row-right",
      children: [{ type: "input" }],
    },
    { type: "div", className: "flew-row phone2 display-none" },
    {
      type: "div",
      className: "input-group row-left",
      children: [{ type: "input" }],
    },
    {
      type: "div",
      className: "input-group row-right",
      children: [{ type: "input" }],
    },
  ];
  const activities = [
    {
      type: "div",
      className: "input-group",
      children: [{ type: "fieldset", className: "text-muted" }],
    },
    {
      type: "legend",
      content: "Select categories farmer is involved in.",
    },
    { type: "span", children: [{ type: "input" }] },
    { type: "span", children: [{ type: "input" }] },
    { type: "span", children: [{ type: "input" }] },
  ];
  return { heading, phones, activities };
}

// Function handles click on the phone icon.
const showUpdate = (event) => {
  event.stopPropagation();
  event.preventDefault();

  // Access the display element and remove elements if any for clean start.
  let display = document.getElementsByClassName("display")[0];
  if (display.children.length > 0) {
    display.removeChild(display.children[0]);
  }

  // Access the children of each table row.
  let tablerow = event.target.parentNode.parentNode.children;

  // Access the fragments and put them together.
  let phoneFrags, headingFrags, activityFrags;
  phoneFrags = elements(tablerow).phones;
  headingFrags = elements(tablerow).heading;
  activityFrags = elements(tablerow).activities;

  //Putting the phone section together.
  console.log(phoneFrags);
  // // Created DOM nodes stored in an array.
  // let collection = elements.map((obj) => {
  //   return rowData(obj);
  // });
  // // Create parent for all rows.
  // let divParent = document.createElement("div");
  // // Append all into the single element.
  // collection.map((element) => {
  //   divParent.appendChild(element);
  // });
  // // Add styling to the divParent.
  // divParent.classList.add("farmer-details");

  // // Set click on close icon.
  // let closeIcon = divParent.getElementsByClassName("close-icon")[0];
  // closeIcon.addEventListener("click", close);

  // // Append information on the display element.
  // display.appendChild(divParent);

  // // Remove the display none class to show new information.
  // display.classList.remove("display-none");
};

// Set click handler on the tbody tag to handle all update clicks.
tbody.addEventListener("click", function (event) {
  event.stopPropagation();
  let eventSrc = event.target,
    // Test classes on src for class update. Handle only clicks from update.
    regex = /update/;
  if (regex.test(eventSrc.classList.value)) {
    showUpdate(event);
  }
});
