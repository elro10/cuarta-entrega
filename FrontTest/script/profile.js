let profileData;
let profileData2;
let userName = document.getElementById("name");
let userEmail = document.getElementById("email");

async function getProfile() {
  await fetch("http://localhost:8080/api/user/profile", { credentials: "include" })
    .then((res) => res.json())
    .then((data) => {
      profileData = data.payLoad;
      console.log("profiledata", profileData);
      userName.innerHTML += `${profileData.first_name}`;
      userEmail.innerHTML += `${profileData.email}`;
    });
}

getProfile();
