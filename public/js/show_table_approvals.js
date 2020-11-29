// Function takes an object and creates a DOM node.
const createNode = (obj) => {
  // Tag is a MUST otherwise can't create an element.
  if (!obj.tag) throw new Error();
  // Create node, assign values and return.
  let node = document.createElement(obj.tag);
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
      tag: "div",
      children: [
        {
          tag: "div",
          className: "title",
          content: `${tablerow[0].textContent} Details`,
        },
        { tag: "span", className: "close-icon", content: "X" },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Farmer Name", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[0].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Phone", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[1].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Ward", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[2].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Category", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[3].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Quantity", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[4].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Type", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[5].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "UoM", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[6].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Price", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[7].textContent}`,
          className: "coldata",
        },
      ],
    },
    {
      tag: "div",
      className: "row",
      children: [
        { tag: "span", content: "Location", className: "colhead" },
        {
          tag: "span",
          content: `${tablerow[8].textContent}`,
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
  // If form display is active, clear it.
  let formDisplay = document.querySelector("div.formdisplay");
  if (!/display-none/.test(formDisplay.classList.value)) {
    formDisplay.classList.add("display-none");
  }

  // Remove the display none class to show new information.
  display.classList.remove("display-none");
};

// Set click handler on the tbody tag to handle all detail clicks.
let tbody = document.getElementsByTagName("tbody")[0];
if (tbody) {
  tbody.addEventListener("click", function (event) {
    event.stopPropagation();
    let eventSrc = event.target,
      // Test classes on src for class details. Handle only clicks from details.
      regex = /details/;
    if (regex.test(eventSrc.classList.value)) {
      showDetails(event);
    }
  });
}
