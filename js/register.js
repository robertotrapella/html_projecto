const form = document.getElementById("formRegister");
const errorPassword = document.getElementById("errorPassword");
const errorConfirm = document.getElementById("errorConfirm");
const mensaje = document.getElementById("mensajeGeneral");

form.addEventListener("submit", function(event) {
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

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.some(
        user => user.usuario.toLowerCase() === usuario.toLowerCase()
    );

    if(existe){
        mensaje.textContent = "El nombre de usuario ya existe";
        mensaje.classList.add("error");
        return;
    }

    const user = {
        usuario: usuario,
        email: correo,
        password: password
    };

    usuarios.push(user);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mensaje.textContent = "Registro exitoso";
    mensaje.classList.add("exito");

    localStorage.setItem("sesionActiva", "true");
    const cuneta = {
        usuario : usuario,
        email: correo
    }
    localStorage.setItem("usuarioActivo", JSON.stringify(cuneta));

    window.location.href = "index.html"



});

form.addEventListener("reset", function(){
    const mensaje = document.getElementById("mensajeGeneral");

    mensaje.textContent = "Formulario limpiado";
    errorPassword.classList.remove("activo");
    errorConfirm.classList.remove("activo");
    mensaje.classList.add("exito");
});

