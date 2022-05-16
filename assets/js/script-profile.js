var selectedRow = null;

var authData = {
  UserPoolId: "us-east-1_Zvl1JB1RS",
  ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
};

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
// var cognitoUser = userPool.getCurrentUser();
// console.log(cognitoUser);

//json_data = "serpapi_response.json";

function getUploadResume() {
  var apiClient = apigClientFactory.newClient();

  userid = document.getElementById("username").value;

  var params = {
    'username' : userid
  };

  var add_params = {
    headers: {
      'Content-Type': 'application/json',
    }
  };

  console.log(params);
  console.log(add_params);

  // json_data = getJobData(params)
  apiClient.jobGet(params, '', add_params)
  .then(function(res){
    console.log("Response: ",res);
  })
}


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


function uploadResume() {
  var file = document.getElementById('file').files[0];
  var file_data;
  console.log(file);
  var encoded_image = getBase64(file).then((data) => {
      console.log(data);
      var apigClient = apigClientFactory.newClient();

      var file_type = file.type + ';base64';
      //var file_type = file.type;

      console.log(file.type);

      var body = data;
      var params = {
          key: file.name,
          bucket: 'user-resumes-bucket',
          'Content-Type': file.type,
          Accept: 'file/*',
      };
      var additionalParams = {};
      apigClient
      .uploadfileBucketKeyPut(params, body, additionalParams)
      .then(function (res) {
          if (res.status == 200) {
          document.getElementById('uploadText').innerHTML =
              'Resume Uploaded  !!!';
          document.getElementById('uploadText').style.display = 'block';
          }
    });
});
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
