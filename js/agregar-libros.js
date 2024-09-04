class Libro {
  constructor(titulo, autor, genero, sinopsis) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.sinopsis = sinopsis;
  }
}

const listadoLibros = JSON.parse(localStorage.getItem("libros")) || [];
console.log(listadoLibros);

document
  .getElementById("formAgregarLibro")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita la recarga de la página

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const sinopsis = document.getElementById("sinopsis").value;

    if (!titulo || !autor || !genero || !sinopsis) {
      alert("Por favor completá todos los campos");
      return;
    }

    const nuevoLibro = new Libro(titulo, autor, genero, sinopsis);
    listadoLibros.unshift(nuevoLibro);

    localStorage.setItem("libros", JSON.stringify(listadoLibros));

    // Mostrar mensaje de éxito
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = `<h3 class="my-3">¡Listo! Ya agregamos el libro!</h3>
                                <div class="col-12">
                                  <button class="btn btn-secondary" id="Volver">Volver</button>
                                </div>`;

    // Botón para volver a la página principal
    document.getElementById("Volver").addEventListener("click", function () {
      window.location.href = "../index.html";
    });
  });
