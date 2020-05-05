const formulario = document.querySelector("#generar-nombre");

formulario.addEventListener("submit", cargarNombres);

function cargarNombres(e) {
  e.preventDefault();

  const origen = document.getElementById("origen");
  const origenSeleccionado = origen.options[origen.selectedIndex].value;

  const genero = document.getElementById("genero");
  const generoSeleccionado = genero.options[genero.selectedIndex].value;

  const cantidad = document.getElementById("numero").value;

  // url para que solo traiga los nombres
  let url = "https://randomuser.me/api/?inc=name&";
  if (origenSeleccionado !== "") {
    url += `nat=${origenSeleccionado}&`;
  }
  if (generoSeleccionado !== "") {
    url += `gender=${generoSeleccionado}&`;
  }
  if (cantidad !== "") {
    url += `results=${cantidad}`;
  }

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let htmlNombres = "<h2>Nombres Generados</h2>";
      htmlNombres += '<ul class="lista">';
      const personas = data.results;

      personas.map((persona) => {
        htmlNombres += `<li>${persona.name.first}</li>`;
      });

      htmlNombres += "</ul>";
      document.getElementById("resultado").innerHTML = htmlNombres;
    })
    .catch(function (error) {
      let htmlError = "<p>Hubo un error, intente nuevamente</p>";
      console.error(error);
      document.getElementById("resultado").innerHTML = htmlError;
    });
}
