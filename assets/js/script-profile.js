var selectedRow = null;

var authData = {
  UserPoolId: "us-east-1_hd7ah4rYe",
  ClientId: "3qd3h6u6o5h4e39q1amnqc4bae",
};

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
// var cognitoUser = userPool.getCurrentUser();
// console.log(cognitoUser);

//json_data = "serpapi_response.json";

function getUploadResume() {
  var apiClient = apigClientFactory.newClient();

  userid = document.getElementById("username").value;

  var params = {
    username: userid,
  };

  var add_params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(params);
  console.log(add_params);

  // json_data = getJobData(params)
  apiClient.jobGet(params, "", add_params).then(function (res) {
    console.log("Response: ", res);
  });
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
  var file = document.getElementById("file").files[0];
  console.log(file);
  var apigClient = apigClientFactory.newClient();

  var params = {
    key: file.name,
    bucket: "user-resumes-bucket",
    "Content-Type": file.type,
    Accept: "file/*",
  };
  var additionalParams = {};
  apigClient
    .uploadfileBucketKeyPut(params, body, additionalParams)
    .then(function (res) {
      if (res.status == 200) {
        document.getElementById("uploadText").innerHTML =
          "Resume Uploaded  !!!";
        document.getElementById("uploadText").style.display = "block";
      }
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

// ------ FILE UPLOAD ------ //
//Bucket Configurations
var bucketName = "user-resumes-bucket";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3876d161-789b-4f34-9dc2-03cf80d34457";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName },
});

function s3upload() {
  var files = document.getElementById("fileUpload").files;
  if (files) {
    var file = files[0];
    var fileName = file.name;
    var filePath  = window.localStorage.getItem("username") + ".docx";
    s3.upload(
      {
        Key: filePath,
        Body: file,
        ACL: "public-read",
      },
      function (err, data) {
        if (err) {
          reject("error");
        }
        alert("Successfully Uploaded!");
      }
    );
  }
}
