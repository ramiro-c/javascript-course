const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const btnReset = document.getElementById("resetBtn");
const formulario = document.getElementById("enviar-mail");

// Event listeners
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", inicioApp);
  email.addEventListener("blur", validarCampo);
  asunto.addEventListener("blur", validarCampo);
  mensaje.addEventListener("blur", validarCampo);
  formulario.addEventListener("submit", enviarMail);
  btnReset.addEventListener("click", resetFormulario);
}

function inicioApp() {
  btnEnviar.disabled = true;
}

function validarCampo() {
  validarLongitud(this);

  if (this.type === "email") validarEmail(this);

  const errores = document.querySelectorAll(".error");
  if (
    errores.length === 0 &&
    email.value !== "" &&
    asunto.value !== "" &&
    mensaje.value !== ""
  ) {
    btnEnviar.disabled = false;
  }
}
function validarLongitud(campo) {
  if (campo.value.length > 0) {
    campo.style.borderBottomColor = "green";
    campo.classList.remove("error");
  } else {
    campo.style.borderBottomColor = "red";
    campo.classList.add("error");
  }
}

function validarEmail(email) {
  const contenidoEmail = email.value;
  if (contenidoEmail.indexOf("@") !== -1) {
    email.style.borderBottomColor = "green";
    email.classList.remove("error");
  } else {
    email.style.borderBottomColor = "red";
    email.classList.add("error");
  }
}

function enviarMail(e) {
  e.preventDefault();
  const spinnerGif = document.querySelector("#spinner");
  spinnerGif.style.display = "block";

  const mailGif = document.createElement("img");
  mailGif.src = "img/mail.gif";
  mailGif.style.display = "block";

  // eliminar el spinner por el gif de mail enviado
  setTimeout(() => {
    spinnerGif.style.display = "none";
    document.querySelector("#loaders").appendChild(mailGif);
  }, 3000);

  // eliminar el gif de mail enviado y resetear el formulario
  setTimeout(() => {
    mailGif.remove();
    resetFormulario();
  }, 3000);
}

function resetFormulario(e) {
  e.preventDefault();
  formulario.reset();
}
