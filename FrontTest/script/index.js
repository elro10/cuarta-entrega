function makeRequest(){
    fetch("http://localhost:8080/test")
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function getDesigns(){
    fetch("http://localhost:8080/api/designs")
    .then((res) => res.json())
    .then((data) => console.log(data.payLoad));
}

function getProfile(){
    fetch("http://localhost:8080/api/user/profile", {credentials: "include"})
    .then((res) => res.json())
    .then((data) => console.log(data.payLoad));
}
