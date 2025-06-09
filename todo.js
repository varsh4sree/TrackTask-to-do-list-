// Load saved tasks or start with an empty list
let storedList = JSON.parse(localStorage.getItem("taskData")) || [];

// Save tasks to localStorage
function keepData() {
  localStorage.setItem("taskData", JSON.stringify(storedList));
}

// Render tasks to the page
function displayList() {
  const listSpot = document.getElementById("myTasks");
  listSpot.innerHTML = ""; // Clear existing list

  storedList.forEach((item, idx) => {
    const listItem = document.createElement("li");
    listItem.className = "entry" + (item.finished ? " done" : "");

    const label = document.createElement("span");
    label.className = "label";
    label.textContent = item.description;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.finished;
    checkbox.onchange = () => toggleComplete(idx); // Toggle task status

    const tools = document.createElement("div");
    tools.className = "entry-controls";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.title = "Edit Task";
    editBtn.onclick = () => updateTask(idx); // Edit task

    const eraseBtn = document.createElement("button");
    eraseBtn.innerHTML = "Delete";
    eraseBtn.title = "Delete Task";
    eraseBtn.onclick = () => eraseTask(idx); // Delete task

    tools.appendChild(editBtn);
    tools.appendChild(eraseBtn);

    const topBar = document.createElement("div");
    topBar.className = "entry-top";
    topBar.appendChild(checkbox);
    topBar.appendChild(tools);

    listItem.appendChild(topBar);
    listItem.appendChild(label);
    listSpot.appendChild(listItem);
  });
}

// Add new task
function recordTask() {
  const inputBox = document.getElementById("taskField");
  const note = inputBox.value.trim();

  if (note === "") {
    alert("You did not type the task!");
    return;
  }

  storedList.push({ description: note, finished: false });
  inputBox.value = "";
  keepData();
  displayList();
}

// Delete task
function eraseTask(i) {
  if (confirm("Want to remove this task?")) {
    storedList.splice(i, 1);
    keepData();
    displayList();
  }
}

// Toggle task completion
function toggleComplete(i) {
  storedList[i].finished = !storedList[i].finished;
  keepData();
  displayList();
}

// Edit task
function updateTask(i) {
  const change = prompt("Edit your task:", storedList[i].description);
  if (change !== null && change.trim() !== "") {
    storedList[i].description = change.trim();
    keepData();
    displayList();
  }
}

// Clear all tasks
function clearAll() {
  if (storedList.length === 0) {
    alert("There’s nothing to clear!");
    return;
  }

  const confirmClear = confirm("Are you sure you want to delete all tasks?");
  if (confirmClear) {
    storedList = [];
    keepData();
    displayList();
  }
}

// Show saved tasks on page load
displayList();
