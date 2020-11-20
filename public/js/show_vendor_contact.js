(function () {
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

  // Function appends a collection of child elements to parent
  const appendChildren = (parent, children) => {
    // Children is an object of nodes to append to parent.
    for (let prop in children) {
      parent.appendChild(children[prop]);
    }
    // Return parent with child elements.
    return parent;
  };
  // Function closes the vendor display area.
  const closeVendor = (event) => {
    event.stopPropagation();
    let display = document.getElementsByClassName("phone-details")[0];
    // Remove element from the DOM.
    display.remove();
  };

  // Function handles click on the phone icon.
  const showVendor = (event) => {
    // Not to trigger clicks on any element in ancenstry.
    event.stopPropagation();
    event.preventDefault();

    // Remove any contacts being displayed before displaying new contact.
    let currentDisplay = document.getElementsByClassName("phone-details")[0];
    if (currentDisplay) {
      currentDisplay.remove();
    }

    // Access the parent node to extract data
    let parent = event.target.parentNode,
      phone = parent.getAttribute("data-phone"),
      vendor = parent.getAttribute("data-vendor");

    // Access the order container to append to later.
    let orderContainer = event.target.parentNode.parentNode;
    // Store the objects representing the elements to create in an array and iterate.
    const elements = [
      { type: "div", class: "phone-details" },
      { type: "div", class: "title", content: "Contact Information" },
      { type: "span", class: "close-icon", content: "X" },
      { type: "div", class: "vendor-details border-top" },
      { type: "span", class: "zmdi zmdi-account vendor-icons" },
      { type: "span", class: "vendor-name", content: `${vendor}` },
      { type: "div", class: "vendor-details" },
      { type: "span", class: "zmdi zmdi-local-phone vendor-icons" },
      { type: "span", class: "vendor-phone", content: `${phone}` },
    ];
    // Created DOM nodes stored in an array.
    let collection = elements.map((obj) => {
      return createNode(obj);
    });

    // Add click handler on the close button.
    collection[2].addEventListener("click", closeVendor);

    // Elements in position 4 & 5 are children of 3.
    let div1 = appendChildren(collection[3], {
      val1: collection[4],
      val2: collection[5],
    });

    // Elements in position 7 & 8 are children of 6.
    let div2 = appendChildren(collection[6], {
      val1: collection[7],
      val2: collection[8],
    });

    // The 2 divs & elements at 1 & 2 are children of element at position 0.
    let divParent = appendChildren(collection[0], {
      val1: collection[1],
      val2: collection[2],
      div1,
      div2,
    });

    // Append this divParent into the DOM.
    orderContainer.appendChild(divParent);
  };

  // Access all elements of the phone icon.
  let vendorPhones = document.getElementsByClassName("phone");

  // Temporarily bind context.
  [].forEach.call(vendorPhones, (phone) => {
    phone.addEventListener("click", showVendor);
  });
})();
