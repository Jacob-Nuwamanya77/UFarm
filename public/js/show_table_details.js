// Function takes an object and creates a DOM node.
const createNode = (obj) => {
  // Passed object structure {type,class,content}.
  // Type is a MUST otherwise can't create an element.
  if (!obj.type) throw new Error();
  // Create node, assign values and return.
  let node = document.createElement(obj.type);
  if (obj.content) {
    node.appendChild(document.createTextNode(obj.content));
  }
  if (obj.class) {
    node.className = obj.class;
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

// Function handles click on the phone icon.
const show = (event) => {
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
          class: "title",
          content: `${tablerow[0].textContent} Details`,
        },
        { type: "span", class: "close-icon", content: "X" },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "User ID", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[1].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Ward", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[2].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Phone", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[3].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Registration", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[4].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Activities", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[5].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Date of birth", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[6].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Gender", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[7].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "NIN", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[8].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Residence Type", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[9].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Resident since", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[10].textContent}`,
          class: "coldata",
        },
      ],
    },
    {
      type: "div",
      class: "row",
      children: [
        { type: "span", content: "Directions", class: "colhead" },
        {
          type: "span",
          content: `${tablerow[11].textContent}`,
          class: "coldata",
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
    show(event);
  }
});
