// variables
const presupuestoSemanal = prompt("Cual es tu presupuesto Semanal?");
const formulario = document.getElementById("agregar-gasto");
let presupuestoUsuario;

class Presupuesto {
  constructor(cantidad) {
    this.presupuesto = Number(cantidad);
    this.restante = Number(cantidad);
  }
  // todo para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }

  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");

    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.appendChild(document.createTextNode(mensaje));
    // insertar en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    // eliminar el alert despues de 3 segundos
    setTimeout(function () {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 3000);
  }

  // inserta los gastos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastosListado = document.querySelector("#gastos ul");
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
    `;

    gastosListado.appendChild(li);
  }

  // actualiza el presupuesto restante
  actualizarPresupuestoRestante(cantidad) {
    const restanteSpan = document.querySelector("span#restante");
    // obtenemos el presupuesto restante
    const presupuestoRestante = presupuestoUsuario.presupuestoRestante(
      cantidad
    );

    restanteSpan.innerHTML = `${presupuestoRestante}`;

    this.actualizarColorPresupuestoRestante();
  }

  // cambia de color el presupuesto restante
  actualizarColorPresupuestoRestante() {
    const presupuestoTotal = presupuestoUsuario.presupuesto;
    const presupuestoRestante = presupuestoUsuario.restante;
    const restante = document.querySelector(".restante");

    // comprobar el 25% y el 50%
    if (presupuestoTotal / 4 > presupuestoRestante) {
      restante.classList.remove("alert-success", "alert-warning");
      restante.classList.add("alert-danger");
    } else if (presupuestoTotal / 2 > presupuestoRestante) {
      restante.classList.remove("alert-success");
      restante.classList.add("alert-warning");
    }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoSemanal <= 0 || presupuestoSemanal === "") {
    window.location.reload();
  }
  presupuestoUsuario = new Presupuesto(presupuestoSemanal);
  const ui = new UI();
  ui.insertarPresupuesto(presupuestoUsuario.presupuesto);
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombreGasto = document.getElementById("gasto").value;
  const cantidadGasto = document.getElementById("cantidad").value;

  const ui = new UI();

  // comprobar que los campos no esten vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    ui.imprimirMensaje("Los dos campos son obligatorios", "error");
    return;
  }
  if (cantidadGasto < 0) {
    ui.imprimirMensaje("El gasto debe ser un numero positivo", "error");
    return;
  }
  ui.imprimirMensaje("Gasto insertado con exito", "exito");
  ui.agregarGastoListado(nombreGasto, cantidadGasto);
  ui.actualizarPresupuestoRestante(cantidadGasto);
});
