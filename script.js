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

  for (let index = namesArray.length - 1; index >= 0; index--) {
    const row = document.createElement("tr");
    row.id = `${index}`;

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editRecord(index));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => deleteRecord(index));

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () =>
      copyRecordToClipboard(namesArray[index])
    );

    const cell1 = document.createElement("td");
    cell1.textContent = namesArray[index];

    const cell2 = document.createElement("td");
    cell2.appendChild(editButton);

    const cell3 = document.createElement("td");
    cell3.appendChild(deleteButton);

    const cell4 = document.createElement("td");
    cell4.appendChild(copyButton);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);

    tableBody.appendChild(row);
  }
}

function editRecord(index) {
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];

  // Prompt the user to enter the updated name
  const updatedName = prompt("Edit the name:", namesArray[index]);

  if (updatedName !== null) {
    // Update the name in the array
    namesArray[index] = updatedName;

    // Update local storage with the modified array
    localStorage.setItem("namesArray", JSON.stringify(namesArray));

    // Update the table with the latest data
    updateTable(namesArray);
  }
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

function copyRecordToClipboard(textToCopy) {
  // Create a temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select and copy the text from the temporary input element
  tempInput.select();
  document.execCommand("copy");

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Notify the user that the text has been copied
  alert("Copied to clipboard: " + textToCopy);
}
