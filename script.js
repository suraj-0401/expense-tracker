let editIndex = -1;

function showResults(event) {
    event.preventDefault();

    let amount = document.getElementById("amount").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (editIndex !== -1) {
        users[editIndex] = { amount, description, category };
        editIndex = -1; 
    } else {
        users.push({ amount, description, category });
    }

    localStorage.setItem("users", JSON.stringify(users));

    renderItem();
    event.target.reset();
}

function renderItem() {
    const addItem = document.getElementById("add-item");
    addItem.innerHTML = "<h2 class='text-lg font-semibold mb-2'>Your Expense Results:</h2>";

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.className = "p-2 bg-white shadow rounded mt-2 flex justify-between items-center";
        li.style.listStyleType = "none";

        li.innerHTML = `
            ${user.amount} - ${user.description} - ${user.category}
        `;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className =
            "ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600";
        editBtn.onclick = () => editItem(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className =
            "ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600";
        deleteBtn.onclick = () => deleteItem(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        addItem.appendChild(li);
    });
}

function deleteItem(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(users));

    renderItem();
}

function editItem(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let item = users[index];

    document.getElementById("amount").value = item.amount;
    document.getElementById("description").value = item.description;
    document.getElementById("category").value = item.category;

    editIndex = index;
}

window.onload = renderItem;
