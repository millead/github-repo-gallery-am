//select the div with a class of overview
const overview = document.querySelector(".overview");
const username = "millead";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

//fetch API and JSON data
const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  displayInfo(data);
};
getData();

// fetch and display user information by creating a new div element
const displayInfo = function (data) {
  const userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("user-info");
  userInfoDiv.innerHTML = `<figure>
      <img alt="user avatar" src = ${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(userInfoDiv);
  getRepos();
};

//Fetch you Repos frrom provided list repositories of User

const getRepos = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await res.json();
  repoInfo(repoData);
};

//get info about your repos
const repoInfo = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    fetchRepoInfo(repoName);
  }
});

// Creat a function to get specific repo Info
const fetchRepoInfo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  console.log(repoInfo);

  //create array of languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageDate = await fetchLanguages.json();
  //console.log(languageDate);

  //add languages
  const languages = [];
  for (const language in languageDate) {
    languages.push(language);
  }
  //console.log(languages);

  displayRepoInfo(repoInfo, languages);
};

//create a function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");

  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

  repoData.append(div);
};
