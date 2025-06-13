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
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.phone}</td>
      <td>${emp.gender}</td>
      <td>${emp.dob}</td>
      <td>${emp.country}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Call fetch on page load
fetchData();


