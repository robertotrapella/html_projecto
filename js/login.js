const form = document.getElementById("formLogin");
const mensaje = document.getElementById("mensajeGeneral");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const data = localStorage.getItem("usuarios");
    if(!data){
        mensaje.textContent = "No hay usuarios registrados";
        mensaje.classList.add("error");
        return;
    }

    const usuarios = JSON.parse(data) || [];
    const user = usuarios.find(u => 
        u.usuario === usuario && u.password === password
    );
    if(user){
        const cuneta = {
            usuario : user.usuario,
            email: user.email
        }
        localStorage.setItem("sesionActiva", "true");
        localStorage.setItem("usuarioActivo", JSON.stringify(cuneta));
        window.location.href = "index.html";

    }else{
        mensaje.textContent = "El usuario o contrasena son incorrectos";
        mensaje.classList.add("error");
    }
});

form.addEventListener("reset", function(e) {
        mensaje.textContent = "Formulario borrado exitosamente";
        mensaje.classList.add("error");
});