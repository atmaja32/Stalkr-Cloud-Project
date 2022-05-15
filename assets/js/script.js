var selectedRow = null;

fetch("serpapi_response.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jobs) {
    let placeholder = document.querySelector("#data_output");
    let out = "";
    for (let job of jobs) {
      out += `
            <tr>
                <td>${job.title}</td>
                <td>${job.company_name}</td>
                <td>${job.location}</td>
                <td><button class="editbtn" onclick="editJob(${job.job_id})">Edit</button></td>
                <td><button class="deletebtn" onclick="deleteJob(${job.job_id})">Delete</button></td>
            </tr>

        `;
    }
    placeholder.innerHTML = out;
  });

//import { CognitoAuth } from "amazon-cognito-auth-js";

//import { CognitoUserPool, } from 'amazon-cognito-identity-js';

// import CognitoUserPool

var authData = {
  UserPoolId: "us-east-1_Zvl1JB1RS",
  ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
var cognitoUser = userPool.getCurrentUser();
console.log(cognitoUser);

// var auth = new CognitoAuth(authData);
// auth.userhandler = {
//   onSuccess: function (result) {
//     console.log(result);
//   },
//   onFailure: function (err) {
//     console.log(err);
//   },
// };

// function getCurrentUser() {
//     const userPool = new CognitoUserPool(authData);
//     return userPool.getCurrentUser();
//   }
  
// var user =   getCurrentUser();
// console.log(user);

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    // if (selectedRow == null)
    //     insertNewRecord(formData);
    // else
    //     updateRecord(formData);
    // resetForm();
    console.log(formData);
    var out = submitSignup(formData);
    console.log(out);
  }
}

function submitSignup(message_body) {
  // params, body, additionalParams
  return sdk.signupPost({}, message_body, {});
}

function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["email"] = document.getElementById("email").value;
  formData["phone"] = document.getElementById("phone").value;
  formData["gender"] = document.getElementById("gender").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.email;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city;
  cell4 = newRow.insertCell(4);
  cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
  document.getElementById("fullName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("salary").value = "";
  document.getElementById("city").value = "";
  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email").value = selectedRow.cells[1].innerHTML;
  document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
  document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
  selectedRow.cells[1].innerHTML = formData.email;
  selectedRow.cells[2].innerHTML = formData.salary;
  selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (document.getElementById("fullName").value == "") {
    isValid = false;
    document.getElementById("fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .getElementById("fullNameValidationError")
        .classList.contains("hide")
    )
      document.getElementById("fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
