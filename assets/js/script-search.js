
function getKeywords(keywords){
  var arr = [];
  for(let elm of keywords){
    if (elm.length > 9) {
      arr.push(elm);
    }
  }
  return arr;
}


function searchJob() {
  var apiClient = apigClientFactory.newClient();

  var userid = window.localStorage.getItem("username");

  var add_params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  
  formQuery= document.getElementById("search_job").value;

  var params = {
    username: userid,
    query: formQuery
  };

  console.log(params);
  console.log(add_params);
  console.log("Form Data: ", formQuery);
  let dataload = document.getElementById("loadingdata");
  dataload.innerHTML = 'Loading Data...';
  // json_data = getJobData(params)
  apiClient.searchGet(params, "", add_params).then(function (res) {
    console.log("Response: ", res);
    console.log("Form Data: ", formQuery);
    var jobs = res.data;
    console.log("Jobs: ",jobs);
    let placeholder = document.querySelector("#jobsearch_output");
    let out ="";
    for(let job of jobs){
        console.log(job.suggestions);
        const words = getKeywords(job.suggestions);
        console.log(words);
        out += `
            <tr>
                <td><img src='${job.thumbnail}'></td>
                <td>${job.title}</td>
                <td>${job.company_name}</td>
                <td>${job.location}</td>
                <td>${job.percentage_match}</td>
                <td>${words}</td>
            </tr>
        `;
    }
    placeholder.innerHTML = out;
    dataload.innerHTML = ' ';
  });
}
