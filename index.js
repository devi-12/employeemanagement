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
      country: emp.country,
      qualification: emp.qualifications || "",
      address: emp.address || "",
      username: emp.username || emp.email?.split("@")[0] || "",
      city: emp.city || "",
      state: emp.state || "",
      zip: emp.zip || "",
      country: emp.country || ""
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
      <td>${emp.country}</td>0
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
let currentViewIndex = null;

function viewDetails(index) {
  const emp = employees[index];
  currentViewIndex = index;

  // Set details
  document.getElementById("detail-avatar").src = `http://localhost:3000/employees/${emp.id}/avatar`;
  document.getElementById("detail-name").innerText = emp.name;
  document.getElementById("detail-email").innerText = emp.email;
  document.getElementById("detail-gender").innerText = emp.gender;
  document.getElementById("detail-dob").innerText = emp.dob;
  document.getElementById("detail-phone").innerText = emp.phone;
  document.getElementById("detail-qualification").innerText = emp.qualification || "N/A";
  document.getElementById("detail-username").innerText = emp.username || emp.email.split("@")[0];
  document.getElementById("detail-address").innerText = emp.address || "N/A";
 
   
  // Hide table and pagination

// Utility function to hide the employee details section
function hideEmployeeDetails() {
  document.getElementById("employee-details").style.display = "none";
  document.getElementById("employee-table-wrapper").style.display = "block";
  document.getElementById("pagination-wrapper").style.display = "block";
}
  document.getElementById("employee-table-wrapper").style.display = "none";
  document.getElementById("pagination-wrapper").style.display = "none";

  // Show details section
  document.getElementById("employee-details").style.display = "none";

  
}


function editEmployee(index) {
  const emp = employees[index];
  currentViewIndex = index;

  // ✅ Parse full name into salutation, first name, last name
  const nameParts = emp.name.trim().split(" ");
  const salutation = nameParts[0];              // Mr.
  const firstName = nameParts[1] || "";         // Michael
  const lastName = nameParts.slice(2).join(" "); // Johnson (handle middle names too)

  // Prefill fields
  document.getElementById("editSalutation").value = salutation;
  document.getElementById("editFirstName").value = firstName;
  document.getElementById("editLastName").value = lastName;
  document.getElementById("editEmail").value = emp.email;
  document.getElementById("editPhone").value = emp.phone;
  document.getElementById("editDob").value = emp.dob;
  document.getElementById("editQualification").value = emp.qualification || "N/A";
  document.getElementById("editAddress").value = emp.address || "N/A";
  document.getElementById("editCountry").value = emp.country || "";
  document.getElementById("editCity").value = emp.city || "";
  document.getElementById("editZip").value = emp.zip || "";

  // Gender
  if (emp.gender === "Male") document.getElementById("editGenderMale").checked = true;
  else if (emp.gender === "Female") document.getElementById("editGenderFemale").checked = true;

  // Avatar
  document.getElementById("editProfilePreview").src = `http://localhost:3000/employees/${emp.id}/avatar`;

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById("editEmployeeModal"));
  modal.show();
  
}

let deleteIndex = null;

function deleteEmployee(index) {
  deleteIndex = index;
  const modal = new bootstrap.Modal(document.getElementById('deleteEmployeeModal'));
  modal.show();
}

function confirmDelete() {
  if (deleteIndex !== null) {
    employees.splice(deleteIndex, 1);
    renderTable();
    deleteIndex = null;
  }
}
async function confirmDelete() {
  if (deleteIndex !== null) {
    const emp = employees[deleteIndex];

    try {
      const response = await fetch(`http://localhost:3000/employees/${emp.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete');

      // Remove locally
      employees.splice(deleteIndex, 1);
      renderTable();
      deleteIndex = null;

      // Hide modals/sections if necessary
      document.getElementById("employee-details").style.display = "none";
      document.getElementById("employee-table-wrapper").style.display = "block";
      document.getElementById("pagination-wrapper").style.display = "block";
    document.getElementById("employee-details").style.display = "none";

      const modal = bootstrap.Modal.getInstance(document.getElementById('deleteEmployeeModal'));
      if (modal) modal.hide();

    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete employee.");
    }
  }
}


// Call fetch on page load
fetchData();

