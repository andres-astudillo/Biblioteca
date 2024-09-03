let listadoLibros = [
  {
    titulo: "El Código Da Vinci",
    autor: "Da Brown.",
    genero: "Thriller, misterio.",
    sinopsis: "Este libro combina arte, historia, simbología y conspiración. La trama gira en torno a un profesor de simbología que investiga un asesinato en el Louvre y descubre una serie de enigmas relacionados con la Iglesia católica y la obra de Leonardo da Vinci¹.",
  },
  {
    titulo: "El Señor de los Anillos",
    autor: "J.R.R. Tolkien.",
    genero: "Fantasía épica.",
    sinopsis: "Una saga épica que sigue las aventuras de hobbits, elfos, enanos y humanos en un mundo lleno de magia, criaturas fantásticas y un anillo con poderes oscuros².",
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry.",
    genero: "Antoine de Saint-Exupéry.",
    sinopsis: "Una fábula sobre la amistad, la soledad y la importancia de ver el mundo con ojos de niño. El Principito viaja por diferentes planetas y aprende valiosas lecciones de vida².",
  },
];


//Editar libro
function editLibro() {
  const idLibro = document.getElementById("idLibro").value;
  if (idLibro > 0 && idLibro <= listadoLibros.length) {
    const libro = listadoLibros[idLibro - 1];
    saveStorage("autoEdit", libro);
    window.location.href = "html/Agregar-Libro.html";
  }
}

//Borrar libro
function deleteLibro() {
  const idLibro = document.getElementById("idLibro").value;
  if (idLibro > 0 && idLibro <= listadoLibros.length) {
    listadoLibros.splice(idLibro - 1, 1);
    saveStorage("libros", listadoLibros);
    loadData();
    restaurarBtn();
  }
}

//Cargar en tabla
function loadData() {
  let dataLibros = document.getElementById("data-libros");
  dataLibros.innerHTML = "";
  if (listadoLibros.length > 0) {
    listadoLibros.forEach((libro, index) => {
      let contenedor = document.createElement("tr");
      contenedor.innerHTML = `<td>${index + 1}</td>
       <td>${libro.titulo}</td>
       <td>${libro.autor}</td>
       <td>${libro.genero}</td>
       <td>${libro.sinopsis}</td>`;
      dataLibros.appendChild(contenedor);
    });
    saveStorage("libros", listadoLibros);
  }
}

function main() {
  const libros = getStorage("libros");
  if (libros == null) {
    saveStorage("libros", listadoLibros);
  } else {
    listadoLibros = getStorage("libros");
  }
  loadData();
  resetStorage("libroEdit");
}

let btnDelete = document.getElementById("btn-delete");
btnDelete.addEventListener("click", abrirInputDelete);

let btnEdit = document.getElementById("btn-edit");
btnEdit.addEventListener("click", abrirInputEdit);

function abrirInputDelete() {
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<div class="col-md-4">
                        <label for="idLibro" class="form-label">Indica el nro de libro a eliminar</label>
                        <input type="text" class="form-control" id="idLibro" name="idLibro" required autofocus placeholder="Nro Libro">
                      </div>
                      <br>
                      <button class="btn btn-secondary" id="btn-Cancelar">Cancelar</button>
                      <button class="btn btn-danger" id="eliminarLibro">Eliminar</button>
                      `;
  let btnCancelar = document.getElementById("btn-Cancelar");
  btnCancelar.addEventListener("click", restaurarBtn);
  let eliminarLibro = document.getElementById("eliminarLibro");
  eliminarLibro.addEventListener("click", deleteLibro);
}

function abrirInputEdit() {
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<div class="col-md-4">
                        <label for="idLibro" class="form-label">Indica el nro de libro a editar</label>
                        <input type="text" class="form-control" id="idLibro" name="idLibro" required autofocus placeholder="Nro Libro">
                      </div>
                      <br>
                      <button class="btn btn-secondary" id="btn-Cancelar">Cancelar</button>
                      <button class="btn btn-primary" id="editarLibro">Editar</button>
                      `;
  let btnCancelar = document.getElementById("btn-Cancelar");
  btnCancelar.addEventListener("click", restaurarBtn);
  let editaLibro = document.getElementById("editarLibro");
  editarLibro.addEventListener("click", editLibro);
}

function restaurarBtn() {
  let btnContainer = document.getElementById("btn-container");
  btnContainer.innerHTML = `<a href="html/Agregar-Libro.html" class="btn btn-success">Agregar</a>
                              <a class="btn btn-warning" id="btn-edit">Editar</a>
                              <button type="button" class="btn btn-danger" id="btn-delete">Eliminar</button>`;
  let btnDelete = document.getElementById("btn-delete");
  btnDelete.addEventListener("click", abrirInputDelete);
  let btnEdit = document.getElementById("btn-edit");
  btnEdit.addEventListener("click", abrirInputEdit);
}

//FUNCIONES DE LOCAL STORAGE
function getStorage(clave) {
  return JSON.parse(localStorage.getItem(clave)); // Recupero la informacion del localStorage, sino existe devuelve 1
}
function saveStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor)); // guardo en el LocalStorage el resultado
}

const resetStorage = (clave) => {
  localStorage.removeItem(clave); // reseteo en el LocalStorage
};

main();

// // Obtener elementos del DOM
// const formulario = document.getElementById("formulario-libro");
// const tabla = document.getElementById("tabla-libros");
// const cuerpoTabla = document.getElementById("cuerpo-tabla");
// const busqueda = document.getElementById("busqueda");

// // Array para almacenar los libros
// let libros = [];

// // Función para agregar un libro
// function agregarLibro(titulo, autor, genero, portada) {
//   const libro = { titulo, autor, genero, portada };
//   libros.push(libro);
//   guardarLibrosEnLocalStorage();
//   actualizarTabla();
// }

// // Función para actualizar la tabla
// function actualizarTabla() {
//   cuerpoTabla.innerHTML = "";
//   libros.forEach((libro, indice) => {
//     const fila = document.createElement("tr");
//     fila.innerHTML = `
//       <td>${libro.titulo}</td>
//       <td>${libro.autor}</td>
//       <td>${libro.genero}</td>
//       <td><img src="${libro.portada}" width="50"></td>
//       <td>
//         <button onclick="modificarLibro(${indice})">Modificar</button>
//         <button onclick="eliminarLibro(${indice})">Eliminar</button>
//       </td>
//     `;
//     cuerpoTabla.appendChild(fila);
//   });
// }

// // Función para modificar un libro
// function modificarLibro(indice) {
//   const libro = libros[indice];
//   const titulo = prompt("Ingrese el nuevo título:", libro.titulo);
//   const autor = prompt("Ingrese el nuevo autor:", libro.autor);
//   const genero = prompt("Ingrese el nuevo género:", libro.genero);
//   const portada = prompt("Ingrese la nueva portada:", libro.portada);
//   libros[indice] = { titulo, autor, genero, portada };
//   guardarLibrosEnLocalStorage();
//   actualizarTabla();
// }

// // Función para eliminar un libro
// function eliminarLibro(indice) {
//   libros.splice(indice, 1);
//   guardarLibrosEnLocalStorage();
//   actualizarTabla();
// }

// // Función para guardar los libros en localStorage
// function guardarLibrosEnLocalStorage() {
//   const librosJSON = JSON.stringify(libros);
//   localStorage.setItem("libros", librosJSON);
// }

// // Función para cargar los libros desde localStorage
// function cargarLibrosDesdeLocalStorage() {
//   const librosJSON = localStorage.getItem("libros");
//   if (librosJSON) {
//     libros = JSON.parse(librosJSON);
//   }
// }

// // Cargar libros desde localStorage al iniciar la página
// cargarLibrosDesdeLocalStorage();

// // Agregar evento submit al formulario
// formulario.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const titulo = document.getElementById("titulo").value;
//   const autor = document.getElementById("autor").value;
//   const genero = document.getElementById("genero").value;
//   const portada = document.getElementById("portada").files[0];
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     const portadaDataURL = e.target.result;
//     agregarLibro(titulo, autor, genero, portadaDataURL);
//   };
//   reader.readAsDataURL(portada);
//   formulario.reset();
// });

// // Agregar evento de búsqueda
// busqueda.addEventListener("input", (e) => {
//   const busquedaTexto = e.target.value.toLowerCase();
//   const librosFiltrados = libros.filter((libro) => {
//     return (
//       libro.titulo.toLowerCase().includes(busquedaTexto) ||
//       libro.autor.toLowerCase().includes(busquedaTexto) ||
//       libro.genero.toLowerCase().includes(busquedaTexto)
//     );
//   });
//   actualizarTabla(librosFiltrados);
// });

// // Función para actualizar la tabla con los libros filtrados
// function actualizarTabla(librosFiltrados) {
//   cuerpoTabla.innerHTML = "";
//   librosFiltrados.forEach((libro, indice) => {
//     const fila = document.createElement("tr");
//     fila.innerHTML = `
//       <td>${libro.titulo}</td>
//       <td>${libro.autor}</td>
//       <td>${libro.genero}</td>
//       <td><img src="${libro.portada}" width="50"></td>
//       <td>
//         <button onclick="modificarLibro(${indice})">Modificar</button>
//         <button onclick="eliminarLibro(${indice})">Eliminar</button>
//       </td>
//     `;
//     cuerpoTabla.appendChild(fila);
//   });
// }
