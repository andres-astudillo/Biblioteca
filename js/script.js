class Libro {
  constructor(titulo, autor, genero, sinopsis) {
      this.titulo = titulo;
      this.autor = autor;
      this.genero = genero;
      this.sinopsis = sinopsis;
  }
}

let listadoLibros = JSON.parse(localStorage.getItem("libros")) || [];

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  document.getElementById("search-form").addEventListener("submit", function (event) {
      event.preventDefault();
      searchBooks();
  });
  document.getElementById("form-edit").addEventListener("submit", function (event) {
      event.preventDefault();
      updateLibro();
  });
  document.getElementById("cancel-edit").addEventListener("click", function () {
      document.getElementById("edit-form").classList.add("d-none");
  });
});

function loadData() {
  const dataLibros = document.getElementById("data-libros");
  dataLibros.innerHTML = "";
  listadoLibros.forEach((libro, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td>${index + 1}</td>
         <td>${libro.titulo}</td>
         <td>${libro.autor}</td>
         <td>${libro.genero}</td>
         <td>${libro.sinopsis}</td>
         <td>
             <button class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
             <button class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
         </td>`;
      dataLibros.appendChild(fila);
  });

  document.querySelectorAll(".btn-edit").forEach(button => {
      button.addEventListener("click", function () {
          const index = this.dataset.index;
          showEditForm(index);
      });
  });

  document.querySelectorAll(".btn-delete").forEach(button => {
      button.addEventListener("click", function () {
          const index = this.dataset.index;
          deleteLibro(index);
      });
  });
}

function showEditForm(index) {
  const libro = listadoLibros[index];
  document.getElementById("edit-index").value = index;
  document.getElementById("edit-titulo").value = libro.titulo;
  document.getElementById("edit-autor").value = libro.autor;
  document.getElementById("edit-genero").value = libro.genero;
  document.getElementById("edit-sinopsis").value = libro.sinopsis;
  document.getElementById("edit-form").classList.remove("d-none");
}

function updateLibro() {
  const index = document.getElementById("edit-index").value;
  const titulo = document.getElementById("edit-titulo").value;
  const autor = document.getElementById("edit-autor").value;
  const genero = document.getElementById("edit-genero").value;
  const sinopsis = document.getElementById("edit-sinopsis").value;

  listadoLibros[index] = new Libro(titulo, autor, genero, sinopsis);
  localStorage.setItem("libros", JSON.stringify(listadoLibros));
  loadData();
  document.getElementById("edit-form").classList.add("d-none");
}

function deleteLibro(index) {
  listadoLibros.splice(index, 1);
  localStorage.setItem("libros", JSON.stringify(listadoLibros));
  loadData();
}

function searchBooks() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const filteredBooks = listadoLibros.filter(libro =>
      libro.titulo.toLowerCase().includes(searchTerm) ||
      libro.autor.toLowerCase().includes(searchTerm) ||
      libro.genero.toLowerCase().includes(searchTerm) ||
      libro.sinopsis.toLowerCase().includes(searchTerm)
  );

  displayFilteredBooks(filteredBooks);
}

function displayFilteredBooks(filteredBooks) {
  const dataLibros = document.getElementById("data-libros");
  dataLibros.innerHTML = "";
  filteredBooks.forEach((libro, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td>${index + 1}</td>
         <td>${libro.titulo}</td>
         <td>${libro.autor}</td>
         <td>${libro.genero}</td>
         <td>${libro.sinopsis}</td>
         <td>
             <button class="btn btn-warning btn-edit" data-index="${index}">Editar</button>
             <button class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
         </td>`;
      dataLibros.appendChild(fila);
  });

  document.querySelectorAll(".btn-edit").forEach(button => {
      button.addEventListener("click", function () {
          const index = this.dataset.index;
          showEditForm(index);
      });
  });

  document.querySelectorAll(".btn-delete").forEach(button => {
      button.addEventListener("click", function () {
          const index = this.dataset.index;
          deleteLibro(index);
      });
  });
}
