const tokenOficial = localStorage.getItem("authToken");
const div_logueado = document.getElementById("div-logueado");
const div_noLogueado = document.getElementById("div-noLogueado");
const closeSesButton = document.getElementById("close-sesion-text");
let nombre = "";
let email = "";
if (tokenOficial !== null) {
  const payloadEncriptado = tokenOficial.split('.')[1];
  const cajaFuerteAbierta = JSON.parse(atob(payloadEncriptado));
  nombre = cajaFuerteAbierta.username;
  email = cajaFuerteAbierta.email;
}
const btnUsuario = document.getElementById("btn-inicial");
const nombreUsuario = document.getElementById("nombreUsuario");
const btnUsuarioExpandir = document.getElementById("btn-general");
const datUsuario = document.getElementById("datos-usuario");
const datEmail = document.getElementById("datos-email");
const menuUsuario = document.getElementById("menu-usuario");
const confBtn = document.getElementById("conf-sesion-btn");
const hamBtn = document.getElementById("hamburguesa-menu");
const listDesplegable = document.getElementById("lista-despegable");
const inicioSesion = document.getElementById("inicio-ses");
const registro = document.getElementById("reg");


if (tokenOficial !== null) {
  div_logueado.classList.add("activo");
  div_noLogueado.classList.add("desactivado");

  if (nombre.length > 0) {
    const inicial = nombre.charAt(0).toUpperCase();
    btnUsuario.textContent = inicial;
  } else {
    btnUsuario.textContent = "?";
  }
  nombreUsuario.textContent = nombre;
}

btnUsuarioExpandir.onclick = function () {
  menuUsuario.classList.toggle("activo");
  datUsuario.textContent = nombre;
  datEmail.textContent = email;
};

document.addEventListener("click", function (e) {
  if (
    !btnUsuarioExpandir.contains(e.target) &&
    !menuUsuario.contains(e.target)
  ) {
    menuUsuario.classList.remove("activo");
  }
});

confBtn.onclick = function () {
  window.location.href = "configuracion_cuenta.html";
};

closeSesButton.onclick = function () {
  localStorage.removeItem("authToken");
  localStorage.removeItem("sesionActiva");
  localStorage.removeItem("usuarioActivo");
  div_logueado.classList.remove("activo");
  div_noLogueado.classList.remove("desactivado");
  window.location.href = "index.html";
};

hamBtn.onclick = function () {
  listDesplegable.classList.toggle("activo");
};

document.addEventListener("click", function (e) {
  if (!listDesplegable.contains(e.target) && !hamBtn.contains(e.target)) {
    listDesplegable.classList.remove("activo");
  }
});

function ajustarDiseno() {
  if (window.innerWidth < 768) {
    inicioSesion.classList.add("estrecho");
    inicioSesion.textContent = "🔑";
    registro.classList.add("estrecho");
    registro.textContent = "👤";
  } else {
    inicioSesion.classList.remove("estrecho");
    inicioSesion.textContent = "Iniciar sesion";
    registro.classList.remove("estrecho");
    registro.textContent = "Registrarse";
  }
}

window.addEventListener("resize", ajustarDiseno);
