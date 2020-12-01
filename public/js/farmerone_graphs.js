(function () {
  // Access the data from the db.
  let dbData = document.getElementsByClassName("graph"),
    graphDataOrders = dbData[1].getElementsByTagName("div"),
    graphDataUploads = dbData[2].getElementsByTagName("div");

  // Extract the data and insert into the DOM.
  dbData[0].textContent = dbData[0].getAttribute("data-number");

  // Sort Orders and store in arrays.
  let unsortedOrders = [].map.call(graphDataOrders, (div) => {
    return div.getAttribute("data-number");
  });

  let wardName = [].map.call(graphDataOrders, (div) => {
    return div.getAttribute("data-ward");
  });
  let orders = [
    { color: "#d91d44" },
    { color: "#3597d9" },
    { color: "#ff4500" },
    { color: "#667192" },
  ];

  // Add order and name to the array for display.
  orders.forEach((obj, i) => {
    obj.order = unsortedOrders[i];
    obj.name = wardName[i];
  });

  // Sort Uploads and store in arrays.
  let uploadsNumbers = [].map.call(graphDataUploads, (div) => {
    return div.getAttribute("data-number");
  });
  let uploadsLoc = [].map.call(graphDataUploads, (div) => {
    return div.getAttribute("data-ward");
  });

  let dataset = { uploadsNumbers, uploadsLoc };

  // Define the functions to manipulate the data.
  function barChartFarmers(dataset, tableID, graph) {
    let table = document.getElementById(tableID),
      tdElements = table.getElementsByTagName("td"),
      thElements = table.querySelectorAll("th.uphead");
    // Set td values.
    let numbers = dataset.uploadsNumbers;
    let wards = dataset.uploadsLoc;
    numbers.forEach((val, i) => {
      tdElements[i].textContent = val;
    });
    wards.forEach((val, i) => {
      thElements[i].textContent = val.substr(0, 5);
    });
    let above;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] > 80) {
        above = true;
        break;
      }
    }
    if (above) {
      d3.select(graph)
        .selectAll("div")
        .data(numbers)
        .style("height", (d) => `${d}px`);
    } else {
      d3.select(graph)
        .selectAll("div")
        .data(numbers)
        .style("height", (d) => `${d * 10}px`);
    }
  }

  // Define function to display order data.
  function doughnutChartOrders(data) {
    let table = document.getElementById("table-orders"),
      tdElements = table.getElementsByTagName("td");

    // Access the th and set data values.
    let thElements = table.querySelectorAll("th.orders");
    // Set td values.
    data.forEach((val, i) => {
      tdElements[i].textContent = val.order;
      thElements[i].textContent = val.name.substr(0, 5);
    });
    // Compute the total number of orders.
    var totalOrder = 0;
    data.forEach((location) => {
      totalOrder += parseInt(location.order);
    });

    // Compute the percentages and assign to the respective data object.
    data.forEach((location) => {
      let inPercentage = (location.order / totalOrder) * 100;
      location.percentage = inPercentage;
    });

    //   Create an arc Generator to describe the shape of the path element.
    var arc = d3.arc().outerRadius(80).innerRadius(100);

    var pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.order;
      });

    var svg = d3
      .select("#orders")
      .append("g")
      .attr("transform", "translate(100,100)");

    var g = svg.selectAll(".arc").data(pie(data)).enter().append("g");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return d.data.color;
      });

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "3em")
      .attr("fill", "rgb(100,100,100)")
      .attr("y", 15)
      .text(totalOrder);

    g.append("text")
      .attr("transform", function (d) {
        var _d = arc.centroid(d);
        return "translate(" + _d + ")";
      })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("fill", "white")
      .text((d, i) => {
        return `${i + 1}`;
      });
  }

  // Call the function at appropriate time.
  doughnutChartOrders(orders);
  barChartFarmers(dataset, "table-uploads", ".graph-uploads");
})();
