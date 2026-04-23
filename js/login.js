const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensajeGeneral");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const url = "http://localhost:8080/api/usuarios/login";
    const data = { username: usuario, password: password };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            return response.json();
        })
        .then(response => {
            if (response.mensaje.includes("Exito")) {
                localStorage.setItem("sesionActiva", "true");
                const cuneta = {
                    usuario: usuario,
                    email: response.email
                };
                localStorage.setItem("usuarioActivo", JSON.stringify(cuneta));
                localStorage.setItem("authToken", response.token);
                window.location.href = "index.html";
            } else {
                mensaje.classList.add("error");
                mensaje.textContent = response.mensaje;
            }
        })
});

form.addEventListener("reset", function (e) {
    mensaje.textContent = "Formulario borrado exitosamente";
    mensaje.classList.add("error");
});