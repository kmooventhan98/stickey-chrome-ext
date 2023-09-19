window.onload = function () {
  printRecord();
};

if (localStorage) {
  console.log("Local storage enabled");
} else {
  console.log("local storage not supported");
}

document
  .querySelector("input[type=submit]")
  .addEventListener("click", function (event) {
    event.preventDefault();
    saveRecord();
  });

function saveRecord() {
  var nameInput = document.getElementById("todo");
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];

  if (nameInput.value.trim() !== "") {
    namesArray.push(nameInput.value);
    localStorage.setItem("namesArray", JSON.stringify(namesArray));
    nameInput.value = "";

    // Update the table with the latest data
    updateTable(namesArray);
  } else {
    alert("Please enter a name.");
  }
}

function printRecord() {
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];

  if (namesArray) {
    updateTable(namesArray);
  }
}

function updateTable(namesArray) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear existing table rows

  namesArray.forEach((element, index) => {
    const row = document.createElement("tr");
    row.id = `${index}`;
    row.innerHTML = `
          <td>${element}</td>
          <td><button class="edit-button" onclick="editRecord(${index})">Edit</button></td>
          <td><button class="delete-button" onclick="deleteRecord(${index})">X</button></td>
      `;
    tableBody.appendChild(row);
  });
}

function editRecord(index) {
  // You can implement edit functionality here if needed
  console.log("Editing record with ID: " + index);
}

function deleteRecord(index) {
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];

  // Remove the item from the array
  namesArray.splice(index, 1);

  // Update local storage with the modified array
  localStorage.setItem("namesArray", JSON.stringify(namesArray));

  // Update the table with the latest data
  updateTable(namesArray);
}
