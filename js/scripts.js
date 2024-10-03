// Esperamos a que se envíe el formulario
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evitamos que el formulario recargue la página

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("https://fakestoreapi.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);

      if (json.token) {
        localStorage.setItem("authToken", json.token);
        window.location.href = "../html/shop.html";
      } else {
        alert("Usuario no registrado");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al intentar iniciar sesión");
    });
});
