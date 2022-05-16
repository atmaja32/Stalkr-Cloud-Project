var selectedRow = null;





function onSubmitJob() {
  var formData = readJobFormData();
  formData["username"] = window.localStorage.getItem("username");
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
