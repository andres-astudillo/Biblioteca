class Libro {
  constructor(titulo, autor, genero, sinopsis) {
    this.titulo = titulo;
    this.autor = autor;
    this.genero = genero;
    this.sinopsis = sinopsis;
  }
}
let libro = null;

let btn = document.getElementById("btn-agregar");
btn.addEventListener("click", addLibro);
const listadoLibros = JSON.parse(localStorage.getItem("libros")) || [];
console.log(listadoLibros);

function addLibro() {
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

  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = `<h3 class="my-3">Listo! Ya agregamos el libro!</h3>
                            <div class="col-12">
                              <button class="btn btn-secondary" id="Volver">Volver</button>
                            </div>`;
  let btnHome = document.getElementById("Volver");
  btnHome.addEventListener("click", function () {
    window.location.href = "../index.html";
  });
}
