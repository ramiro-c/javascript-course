class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }
  cotizar() {
    // 1 americano 1.15
    // 2 asiatico 1.05
    // 3 europeo 1.35
    let cantidad = 0;
    const precioBase = 2000;

    switch (this.marca) {
      case "1":
        cantidad = base * 1.15;
        break;
      case "2":
        cantidad = base * 1.05;
        break;
      case "3":
        cantidad = base * 1.35;
        break;
      default:
        break;
    }
    // leer el anio
    const diferencia = new Date().getFullYear() - this.anio;
    // cada anio de diferencia hay que reducir un 3% el valor
    cantidad -= diferencia * cantidad * 0.03;
    // basico se agrega un 30% mas
    // completo se agrega un 50% mas
    if (this.tipo === "basico") return cantidad * 1.3;
    return cantidad * 1.5;
  }
}

// todo lo que se muestra en pantalla
class Interfaz {
  mostrarError(mensaje, tipo) {
    const div = document.createElement("div");
    if (tipo === "error") {
      div.classList.add("mensaje", "error");
    } else {
      div.classList.add("mensaje", "correcto");
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(() => {
      document.querySelector(".mensaje").remove();
    }, 3000);
  }
}

// EventListener
const formulario = document.getElementById("cotizar-seguro");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  // leer la marca seleccionada
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  // leer el anio seleccionado
  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  // leer el valor del radio button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  const interfaz = new Interfaz();
  if (marcaSeleccionada === "" || anioSeleccionado === "" || tipo === "") {
    interfaz.mostrarError(
      "Faltan datos, revise el formulario e intente otra vez!",
      "error"
    );
  } else {
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
    const cantidad = seguro.cotizar();
  }
});

const anioMaximo = new Date().getFullYear();
const anioMinimo = anioMaximo - 20;

const selectAnios = document.getElementById("anio");

for (let anio = anioMaximo; anio >= anioMinimo; anio--) {
  let option = document.createElement("option");
  option.value = anio;
  option.innerHTML = anio;
  selectAnios.appendChild(option);
}
