(function () {
  // Function closes the display area.
  const close = (event) => {
    event.stopPropagation();
    let display = document.querySelector(".display-product");
    display.classList.add("display-none");
    // Remove element from the DOM.
    display.removeChild(display.children[0]);
    console.log("The end");
  };

  // Function displays the product uploaded.
  const showProduct = (event) => {
    event.preventDefault();
    const srcRow = event.target.parentNode.parentNode;
    const dataLocation = srcRow.querySelector(".show-product");
    const product = dataLocation.querySelector(".product");
    const clone = product.cloneNode(true);

    // Access the area to append the document fragment.
    const displayArea = document.querySelector(".display-product");

    // Remove any child elements before adding new data and change the display styles.
    if (displayArea.children.length != 0) {
      displayArea.removeChild(displayArea.children[0]);
    }
    displayArea.appendChild(clone);
    displayArea.classList.remove("display-none");
  };
  // Set click handler on close icon.
  let closeBtn = document.querySelector(".close-icon");
  closeBtn.addEventListener("click", close);

  // Set click handler on the tbody tag to handle all detail clicks.
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.addEventListener("click", function (event) {
    event.stopPropagation();
    let eventSrc = event.target,
      // Test classes on src for class details. Handle only clicks from details.
      regex = /details/;
    if (regex.test(eventSrc.classList.value)) {
      showProduct(event);
    }
  });
})();
