const logueado = localStorage.getItem("sesionActiva");
const div_logueado = document.getElementById("div-logueado");
const div_noLogueado = document.getElementById("div-noLogueado");
const closeSesButton = document.getElementById("close-sesion-text");
const data = localStorage.getItem("usuarioActivo");
const cuenta = JSON.parse(data);
const nombre = cuenta.usuario;
const email = cuenta.email;
const btnUsuario = document.getElementById("btn-inicial");
const nombreUsuario = document.getElementById("nombreUsuario");
const btnUsuarioExpandir = document.getElementById("btn-general");
const datUsuario = document.getElementById("datos-usuario");
const datEmail = document.getElementById("datos-email");
const menuUsuario = document.getElementById("menu-usuario");
const confBtn = document.getElementById("conf-sesion-btn");
const hamBtn = document.getElementById("hamburguesa-menu");
const listDesplegable = document.getElementById("lista-despegable");


if(logueado === "true"){

    div_logueado.classList.add("activo");
    div_noLogueado.classList.add("desactivado");

    if(nombre.length > 0){
        const inicial = nombre.charAt(0).toUpperCase();
        btnUsuario.textContent = inicial;
    }else{
        btnUsuario.textContent = "?";
    }
    nombreUsuario.textContent = nombre;

}

btnUsuarioExpandir.onclick = function() {
    menuUsuario.classList.toggle("activo");
    datUsuario.textContent = nombre;
    datEmail.textContent = email;
}

document.addEventListener("click", function(e){
    if (!btnUsuarioExpandir.contains(e.target) && !menuUsuario.contains(e.target)) {
        menuUsuario.classList.remove("activo");
    }
});

confBtn.onclick = function() {
    window.location.href = "configuracion_cuenta.html";
}

closeSesButton.onclick = function() {
    logueado.sesionActiva = "false";
    localStorage.setItem("sesionActiva", "false");
    div_logueado.classList.remove("activo");
    div_noLogueado.classList.remove("desactivado");
    const actual = {
        usuario : "",
        email : ""
    };
    localStorage.setItem("usuarioActivo", JSON.stringify(actual));
}

hamBtn.onclick = function() {
    listDesplegable.classList.toggle("activo");
}

document.addEventListener("click", function(e){
    if (!listDesplegable.contains(e.target) && !hamBtn.contains(e.target)) {
        listDesplegable.classList.remove("activo");
    }
});


