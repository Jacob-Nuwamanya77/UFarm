// Function takes an object and creates a DOM node.
const createNode = (obj) => {
  // Type is a MUST otherwise can't create an element.
  if (!obj.type) throw new Error();
  // Create node, assign values and return.
  let node = document.createElement(obj.type);
  for (let prop in obj) {
    if (prop != "content") {
      node[prop] = obj[prop];
    } else {
      node.appendChild(document.createTextNode(obj.content));
    }
  }
  return node;
};

// Construct table row.
const rowData = (obj) => {
  if (!obj.children) {
    return createNode(obj);
  } else {
    let parent = createNode(obj);
    obj.children.forEach((child) => {
      let childElement = createNode(child);
      parent.appendChild(childElement);
    });
    return parent;
  }
};

// Function closes the vendor display area.
const close = (event) => {
  event.stopPropagation();
  let display = document.getElementsByClassName("display")[0];
  display.classList.add("display-none");
  // Remove element from the DOM.
  display.removeChild(display.children[0]);
};

// Function handles click on details.
const showDetails = (event) => {
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

// Set click handler on the tbody tag to handle all detail clicks.
let tbody = document.getElementsByTagName("tbody")[0];
tbody.addEventListener("click", function (event) {
  event.stopPropagation();
  let eventSrc = event.target,
    // Test classes on src for class details. Handle only clicks from details.
    regex = /details/;
  if (regex.test(eventSrc.classList.value)) {
    showDetails(event);
  }
});
