var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("AllContactList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").disabled = true; 
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.email;
   
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("AllContactList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    
    if (document.getElementById("firstName").value == "") {
        isValid = false;
        document.getElementById("firstNameValidator").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("firstNameValidator").classList.contains("hide"))
            document.getElementById("firstNameValidator").classList.add("hide");
    }
    return isValid;
}