// Selecciona el elemento HTML donde se mostrará el título del cómic
const tituloComic = document.querySelector(".titulo-comic");

// Selecciona el elemento HTML donde se mostrará la descripción del cómic
const descripcionComic = document.querySelector(".descripcion-comic");

// Selecciona el elemento HTML donde se mostrará la imagen principal del cómic (aunque no se usa en este fragmento)
const imgComic = document.querySelector(".img-comic");

// Selecciona el contenedor donde se listarán los capítulos del cómic
const listaCaps = document.querySelector(".lista-caps");

// Si existe el elemento del título, se le asigna el nombre del cómic
if (tituloComic) tituloComic.textContent = comic.nombreComic;

// Si existe el elemento de descripción, se le asigna la descripción del cómic
if (descripcionComic) descripcionComic.textContent = comic.descripcion;

// Si existe el contenedor de capítulos, se recorre cada capítulo del cómic
if (listaCaps) {
  comic.capitulos.forEach(cap => {
    // Se crea un nuevo elemento <li> para cada capítulo
    const li = document.createElement("li");

    // Se inserta el contenido HTML del capítulo: nombre, imagen y enlace
    li.innerHTML = `
      <a href="./capitulo.html?id=${cap.id}">
        <p>${cap.nombreCap}</p>
        <img src="${cap.imgPortada}" width="150" alt="${cap.nombreCap}">
      </a>
    `;

    // Se agrega el <li> al contenedor de la lista
    listaCaps.appendChild(li);
  });
}