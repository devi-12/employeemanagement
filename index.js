const tableBody = document.getElementById("employee-table");

let employees = [];

// Fetch employees from server
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/employees");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();

    // Format and store employees
    employees = data.map(emp => ({
      id: emp.id,
      name: `${emp.salutation} ${emp.firstName} ${emp.lastName}`,
      email: emp.email,
      phone: emp.phone,
      gender: emp.gender,
      dob: emp.dob,
      country: emp.country
    }));

    renderTable(); // display in table
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// Render employees to table
function renderTable() {
  tableBody.innerHTML = ""; // clear old data

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
         <div style="display: flex; align-items: center; gap: 10px;">
        <img src="http://localhost:3000/employees/${emp.id}/avatar"
             alt="avatar"
             style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
             onerror="this.onerror=null;this.src='http://localhost:3000/employees/default-avatar.jpg';">
        <span>${emp.name}</span>
          </div>
      </td>
      <td>${emp.email}</td>
      <td>${emp.phone}</td>
      <td>${emp.gender}</td>
      <td>${emp.dob}</td>
      <td>${emp.country}</td>
      <td>
        <div class="dropdown">
          <button class="dots-btn" onclick="toggleDropdown(this)">...</button>
          <div class="dropdown-menu">
            <button onclick="viewDetails(${index})">View Details</button>
            <button onclick="editEmployee(${index})">Edit</button>
            <button onclick="deleteEmployee(${index})">Delete</button>
          </div>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
function toggleDropdown(button) {
  document.querySelectorAll(".show-on-click").forEach(menu => {
    if (menu !== button.nextElementSibling) {
      menu.style.display = "none";
    }
  });

  const menu = button.nextElementSibling;
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Hide dropdowns if clicked outside
window.addEventListener("click", function (e) {
  if (!e.target.closest(".dropdown")) {
    document.querySelectorAll(".show-on-click").forEach(menu => {
      menu.style.display = "none";
    });
  }
});

// Placeholder Actions
function viewDetails(index) {
  alert(`Viewing details of ${employees[index].name}`);
}

function editEmployee(index) {
  alert(`Editing ${employees[index].name}`);
}

function deleteEmployee(index) {
  if (confirm(`Delete ${employees[index].name}?`)) {
    employees.splice(index, 1);
    renderTable();
  }
}

// Call fetch on page load
fetchData();


