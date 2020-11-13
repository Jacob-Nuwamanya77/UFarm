// Function handles click on the phone icon.
const showUpdate = (event) => {
  // Not to trigger clicks on any element in ancenstry.
  event.stopPropagation();
  // Prevent default anchor behaviour.
  event.preventDefault();

  // Access the display element and remove elements if any for clean start.
  let display = document.getElementsByClassName("display")[0];
  if (display.children.length > 0) {
    display.removeChild(display.children[0]);
  }

  // Access the children of each table row.
  let tablerow = event.target.parentNode.parentNode.children;

  // Store the objects representing the elements to create in an array and iterate.
  const elements = [
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
        { type: "span", content: "User ID", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[1].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Ward", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[2].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Phone", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[3].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Registration", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[4].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Activities", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[5].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Date of birth", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[6].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Gender", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[7].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "NIN", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[8].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Residence Type", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[9].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Resident since", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[10].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      type: "div",
      className: "row",
      children: [
        { type: "span", content: "Directions", className: "colhead" },
        {
          type: "span",
          content: `${tablerow[11].textContent}`,
          className: "coldata",
        },
      ],
    },
  ];
  // Created DOM nodes stored in an array.
  let collection = elements.map((obj) => {
    return rowData(obj);
  });
  // Create parent for all rows.
  let divParent = document.createElement("div");
  // Append all into the single element.
  collection.map((element) => {
    divParent.appendChild(element);
  });
  // Add styling to the divParent.
  divParent.classList.add("farmer-details");

  // Set click on close icon.
  let closeIcon = divParent.getElementsByClassName("close-icon")[0];
  closeIcon.addEventListener("click", close);

  // Append information on the display element.
  display.appendChild(divParent);

  // Remove the display none class to show new information.
  display.classList.remove("display-none");
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
