// Obtener elementos del DOM
const formulario = document.getElementById("formulario-libro");
const tabla = document.getElementById("tabla-libros");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const busqueda = document.getElementById("busqueda");

// Array para almacenar los libros
let libros = [];

// Función para agregar un libro
function agregarLibro(titulo, autor, genero, portada) {
  const libro = { titulo, autor, genero, portada };
  libros.push(libro);
  guardarLibrosEnLocalStorage();
  actualizarTabla();
}

// Función para actualizar la tabla
function actualizarTabla() {
  cuerpoTabla.innerHTML = "";
  libros.forEach((libro, indice) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.genero}</td>
      <td><img src="${libro.portada}" width="50"></td>
      <td>
        <button onclick="modificarLibro(${indice})">Modificar</button>
        <button onclick="eliminarLibro(${indice})">Eliminar</button>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}

// Función para modificar un libro
function modificarLibro(indice) {
  const libro = libros[indice];
  const titulo = prompt("Ingrese el nuevo título:", libro.titulo);
  const autor = prompt("Ingrese el nuevo autor:", libro.autor);
  const genero = prompt("Ingrese el nuevo género:", libro.genero);
  const portada = prompt("Ingrese la nueva portada:", libro.portada);
  libros[indice] = { titulo, autor, genero, portada };
  guardarLibrosEnLocalStorage();
  actualizarTabla();
}

// Función para eliminar un libro
function eliminarLibro(indice) {
  libros.splice(indice, 1);
  guardarLibrosEnLocalStorage();
  actualizarTabla();
}

// Función para guardar los libros en localStorage
function guardarLibrosEnLocalStorage() {
  const librosJSON = JSON.stringify(libros);
  localStorage.setItem("libros", librosJSON);
}

// Función para cargar los libros desde localStorage
function cargarLibrosDesdeLocalStorage() {
  const librosJSON = localStorage.getItem("libros");
  if (librosJSON) {
    libros = JSON.parse(librosJSON);
  }
}

// Cargar libros desde localStorage al iniciar la página
cargarLibrosDesdeLocalStorage();

// Agregar evento submit al formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const portada = document.getElementById("portada").files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const portadaDataURL = e.target.result;
    agregarLibro(titulo, autor, genero, portadaDataURL);
  };
  reader.readAsDataURL(portada);
  formulario.reset();
});

// Agregar evento de búsqueda
busqueda.addEventListener("input", (e) => {
  const busquedaTexto = e.target.value.toLowerCase();
  const librosFiltrados = libros.filter((libro) => {
    return (
      libro.titulo.toLowerCase().includes(busquedaTexto) ||
      libro.autor.toLowerCase().includes(busquedaTexto) ||
      libro.genero.toLowerCase().includes(busquedaTexto)
    );
  });
  actualizarTabla(librosFiltrados);
});

// Función para actualizar la tabla con los libros filtrados
function actualizarTabla(librosFiltrados) {
  cuerpoTabla.innerHTML = "";
  librosFiltrados.forEach((libro, indice) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${libro.titulo}</td>
      <td>${libro.autor}</td>
      <td>${libro.genero}</td>
      <td><img src="${libro.portada}" width="50"></td>
      <td>
        <button onclick="modificarLibro(${indice})">Modificar</button>
        <button onclick="eliminarLibro(${indice})">Eliminar</button>
      </td>
    `;
    cuerpoTabla.appendChild(fila);
  });
}
