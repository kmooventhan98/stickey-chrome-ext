console.log("this is a pop");

window.onload = function () {
  printRecord();
};

if (localStorage) {
  console.log("Local storage enabled");
} else {
  console.log("local storage not supported");
}

console.log("hhh");
console.log(name);
document
  .querySelector("input[type=button]")
  .addEventListener("click", saveRecord);

// function saveRecord() {
//   console.log("method callled---:(");
//   var name = document.getElementById("name");
//   console.log("hehe name is", name);
//   var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];
//   namesArray.push(name.value);
//   localStorage.setItem("namesArray", JSON.stringify(namesArray));
//   name.value = "";
//   console.log("Updated namesArray:", namesArray);
//   // printRecord();
// }

function saveRecord() {
  var nameInput = document.getElementById("name");
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];

  if (nameInput.value.trim() !== "") {
    namesArray.push(nameInput.value);
    localStorage.setItem("namesArray", JSON.stringify(namesArray));
    nameInput.value = "";

    // Create a new paragraph element for the latest name
    var latestName = namesArray[namesArray.length - 1];
    var paragraph = document.createElement("p");
    paragraph.textContent = latestName;

    // Append the new paragraph to the container
    var container = document.getElementById("container");
    container.appendChild(paragraph);
  } else {
    alert("Please enter a name.");
  }
}

function printRecord() {
  var namesArray = JSON.parse(localStorage.getItem("namesArray")) || [];
  const container = document.getElementById("container");
  debugger;
  if (namesArray) {
    namesArray.forEach((element, index) => {
      const paragraph = document.createElement("p");
      paragraph.id = index.toString();
      paragraph.textContent = element;
      container.appendChild(paragraph);
    });
  }
}
