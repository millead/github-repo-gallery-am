//select the div with a class of overview
const overview = document.querySelector(".overview");
const username = "millead";

//fetch API and JSON data
const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  console.log(data);
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
    </div>;`;
  overview.append(userInfoDiv);
};
