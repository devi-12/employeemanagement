<script>
document.getElementById('employeeForm').addEventListener('submit', function (e) {
e.preventDefault();
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const tableBody = document.getElementById('employee-table');
  const rowCount = tableBody.rows.length + 1;
  const newRow = `
    <tr>
      <td>#${rowCount}</td>
      <td>${firstName} ${lastName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${gender}</td>
      <td>${dob}</td>
      <td>India</td>
      <td>
        <button class="btn btn-sm btn-secondary">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
      </td>
    </tr>
  `;
  tableBody.insertAdjacentHTML("beforeend", newRow);
  const modal = bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal'));
  modal.hide();
  this.reset();
});
</script>
