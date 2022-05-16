var selectedRow = null;

var authData = {
  UserPoolId: "us-east-1_Zvl1JB1RS",
  ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
};

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
// var cognitoUser = userPool.getCurrentUser();
// console.log(cognitoUser);

//json_data = "serpapi_response.json";


var apiClient = apigClientFactory.newClient();

  userid = "deeptipretagouthaman";

  var params = {
    'username' : userid
  };

  var add_params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  console.log(params);

  // json_data = getJobData(params)
  apiClient.jobGet(params, '', add_params)
  .then(function(res){
    console.log("Response: ",res);
  })






function dispTableData() {

  var apiClient = apigClientFactory.newClient();

  userid = "deeptipretagouthaman";

  var params = {
    'username' : userid
  };

  console.log(params);

  // json_data = getJobData(params)
  apiClient.jobGet(params, '', {'Content-Type':'application/json'})
  .then(function(res){
    console.log("Response: ",res);
  })

  console.log('reached');
  //console.log("Fetchded Data:", json_data)

  fetch(json_data)
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
}

dispTableData();

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

function onSubmitJob() {
  var formData = readJobFormData();
  // if (selectedRow == null)
  //     insertNewRecord(formData);
  // else
  //     updateRecord(formData);
  // resetForm();
  formData["username"] = "deeptipretagouthaman"
  console.log(formData);
  var out = submitJobData(formData);
  console.log(out);
}


function getJobData(params) {
  // params, body, additionalParams
  return sdk.jobGet(params,'', {});
}


function readFormData() {
  var formData = {};
  formData["fullName"] = document.getElementById("fullName").value;
  formData["email"] = document.getElementById("email").value;
  formData["phone"] = document.getElementById("phone").value;
  formData["gender"] = document.getElementById("gender").value;
  return formData;
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
