var selectedRow = null;

var authData = {
  UserPoolId: "us-east-1_Zvl1JB1RS",
  ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
var cognitoUser = userPool.getCurrentUser();
console.log(cognitoUser);



function onSubmitJob() {
  var formData = readJobFormData();
  formData["username"] = "deeptipretagouthaman"
  console.log(formData);
  var out = submitJobData(formData);
  console.log(out);
}


function submitJobData(message_body) {
    // params, body, additionalParams
    return sdk.jobPost({}, message_body, {});
  }


function readJobFormData() {
    var formData = {};
    formData["compname"] = document.getElementById("compname").value;
    formData["position"] = document.getElementById("position").value;
    formData["location"] = document.getElementById("location").value;
    formData["jobdesc"] = document.getElementById("jobdesc").value;
    formData["appdate"] = document.getElementById("appdate").value;
    formData["stage"] = document.getElementById("stage").value;
    return formData;
  }
