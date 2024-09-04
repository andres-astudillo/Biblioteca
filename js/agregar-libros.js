class Libro {
    constructor(titulo, autor, genero, sinopsis) {
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.sinopsis = sinopsis;
    }
  }
  let libro = null;
  // Agregar auto
  let btn = document.getElementById("btn-agregar");
  btn.addEventListener('click', addLibro);
  const listadoLibros = JSON.parse(localStorage.getItem('libros')); // Recupero la informacion del localStorage
  console.log(listadoLibros)
  
  function addLibro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const sinopsis = document.getElementById("sinopsis").value;
  
    const nuevoLibro = new Libro(titulo, autor, genero, sinopsis);
    //uso unshift para posicionar primero autos mas nuevos para el registro
    listadoLibros.unshift(nuevoLibro);
  
    localStorage.setItem('libros', JSON.stringify(listadoLibros)) // guardo en el LocalStorage el resultado
  
    let contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = `<h3 class="my-3">Listo! Ya agregamos el libro!</h3>
                            <div class="col-12">
                              <button class="btn btn-secondary" id="Volver">Volver</button>
                            </div>`
                            //Volver
    let btnHome = document.getElementById("Volvere");
    btnHome.addEventListener("click", function() {
      window.location.href = "../index.html";
    });
  }
  