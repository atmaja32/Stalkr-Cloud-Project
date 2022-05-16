// var authData = {
//   UserPoolId: "us-east-1_Zvl1JB1RS",
//   ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
// };

// var userPool = new AmazonCognitoIdentity.CognitoUserPool(authData);
// var cognitoUser = userPool.getCurrentUser();
// console.log("CurrentUser: ",cognitoUser);
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:3876d161-789b-4f34-9dc2-03cf80d34457',
});
var poolData = {
  UserPoolId: "us-east-1_Zvl1JB1RS",
  ClientId: "7kijisuv7m9dsvgpn1ic26bvvb",
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUserPool(poolData);

console.log("CurrentUser: ", cognitoUser);


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
    var jobs = res.data['jobs'];
    console.log("Jobs: ",jobs);
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
