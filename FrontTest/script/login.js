console.log("aqui estoy");

let form = document.querySelector("form");
// let formData = new FormData([form]);


form.onsubmit = async (e) => {
    e.preventDefault();
    console.log("me push");
    let responseData
    // let data = [{ "email": `${form.email.value}` }, { "password": `${form.password.value}` }]
    let data = new FormData(form);
    let respuesta = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        body: new URLSearchParams(data),
    })
    .then((res) => res.json())
        .then((data) => {
            console.log(data.status);
            if (data.status == "success") {
                window.location.href = "http://127.0.0.1:5500/FrontTest/pages/profile.html"
            }
    });
}
