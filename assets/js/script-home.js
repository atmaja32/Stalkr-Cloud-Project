function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const token = window.location.hash;
var user;
if (token) {
  user = parseJwt(token.split("id_token="));
  console.log("user---: ", user);
}

function getTable() {
  var apiClient = apigClientFactory.newClient();

  userid = "deeptipretagouthaman";

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
    var jobs = res.data["jobs"];
    console.log("Jobs: ", jobs);
    let placeholder = document.querySelector("#data_output");
    let out = "";
    for (let job of jobs) {
      out += `
            <tr>
                <td>${job.position}</td>
                <td>${job.compname}</td>
                <td>${job.location}</td>
                <td><button class="editbtn" onclick="editJob(${job.job_id})">Edit</button></td>
                <td><button class="deletebtn" onclick="deleteJob(${job.job_id})">Delete</button></td>
            </tr>

        `;
    }
    placeholder.innerHTML = out;
  });
}
