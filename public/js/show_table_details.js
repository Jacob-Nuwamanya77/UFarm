//Function inserts element into the DOM after specified target.
const insertAfter = (newElement, targetElement) => {
  let parent = targetElement.parentNode;
  if (parent.lastElementChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextElementSibling);
  }
};

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
  let display = document.getElementsByClassName("phone-details")[0];
  // Remove element from the DOM.
  display.remove();
};

// Function handles click on the phone icon.
const show = (event) => {
  // Not to trigger clicks on any element in ancenstry.
  event.stopPropagation();
  // Prevent default anchor behaviour.
  event.preventDefault();

  // Access the children of each table row.
  let tablerow = event.target.parentNode.parentNode.children;

  // Store the objects representing the elements to create in an array and iterate.
  const elements = [
    {
      type: "div",
      class: "heading",
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
      children: [
        { type: "span", content: "User ID" },
        { type: "span", content: `${tablerow[1].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Ward" },
        { type: "span", content: `${tablerow[2].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Phone" },
        { type: "span", content: `${tablerow[3].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Registration" },
        { type: "span", content: `${tablerow[4].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Activities" },
        { type: "span", content: `${tablerow[5].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Date of birth" },
        { type: "span", content: `${tablerow[6].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Gender" },
        { type: "span", content: `${tablerow[7].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "NIN" },
        { type: "span", content: `${tablerow[8].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Residence Type" },
        { type: "span", content: `${tablerow[9].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Resident since" },
        { type: "span", content: `${tablerow[10].textContent}` },
      ],
    },
    {
      type: "div",
      children: [
        { type: "span", content: "Directions" },
        { type: "span", content: `${tablerow[11].textContent}` },
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

  // Access DOM element to attach new information onto.
  let display = document.getElementsByClassName("display")[0];
  display.appendChild(divParent);

  // Remove the display none class.
  display.classList.remove("display-none");
};

// Access all elements of the phone icon.
let detailsLink = document.getElementsByClassName("details");

// Temporarily bind context.
[].forEach.call(detailsLink, (link) => {
  link.addEventListener("click", show);
});
