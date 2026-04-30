const form = document.getElementById("formRegister");
const errorPassword = document.getElementById("errorPassword");
const errorConfirm = document.getElementById("errorConfirm");
const mensaje = document.getElementById("mensajeGeneral");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password_confirmation").value

    mensaje.textContent = "";
    mensaje.classList.remove("error", "exito");

    errorPassword.textContent = "";
    errorPassword.classList.remove("activo");

    errorConfirm.textContent = "";
    errorConfirm.classList.remove("activo");

    if (password.length < 6) {
        errorPassword.textContent = "La contraseña debe tener al menos 6 caracteres";
        errorPassword.classList.add("activo");
        return;
    }

    if (password !== confirmPassword) {
        errorConfirm.textContent = "Las contraseñas no coinciden";
        errorConfirm.classList.add("activo");
        return;
    }

    const url = "http://localhost:8080/api/usuarios/registro";
    const data = { username: usuario, email: correo, password: password }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Verificamos si Java nos mandó una queja
            if (result.mensaje.includes("Error")) {
                mensaje.textContent = result;  // Mostramos el error exacto (ej. "Error: Correo ya registrado")
                mensaje.classList.remove("exito");
                mensaje.classList.add("error");
            }
            else {
                localStorage.setItem("authToken", result.token);
                mensaje.textContent = "Registro exitoso";
                mensaje.classList.remove("error");
                mensaje.classList.add("exito");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500);
            }
        })
        .catch(error => console.log(error));
});

form.addEventListener("reset", function () {
    const mensaje = document.getElementById("mensajeGeneral");

    mensaje.textContent = "Formulario limpiado";
    errorPassword.classList.remove("activo");
    errorConfirm.classList.remove("activo");
    mensaje.classList.add("exito");
});

