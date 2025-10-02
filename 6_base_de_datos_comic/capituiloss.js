// Obtiene los parámetros de la URL (por ejemplo: ?id=3)
const params = new URLSearchParams(window.location.search);

// Extrae el valor del parámetro "id" y lo convierte a número
const id = parseInt(params.get("id"));

// Busca el capítulo correspondiente al ID en la lista de capítulos del cómic
const capitulo = comic.capitulos.find(c => c.id === id);

// Si se encuentra el capítulo, se actualiza el contenido de la página
if (capitulo) {
  // Muestra el nombre del capítulo en el título
  document.querySelector(".titulo").textContent = capitulo.nombreCap;

  // Muestra la descripción del capítulo
  document.querySelector(".subtitulo").textContent = capitulo.descripcion;

  // Muestra la imagen de portada del capítulo
  document.querySelector(".cap1").src = capitulo.imgPortada;

  // Establece la imagen de fondo con estilo explosion-bg
  document.querySelector(".explosion-bg").style.backgrounImage = `url(${capitulo.imgPortada}) center/cover no-repeat;`;

  // Agrega un evento al botón para abrir el video del capítulo en una nueva pestaña
  document.querySelector(".btn-reproducir").addEventListener("click", () => {
    window.open(capitulo.video, "_blank");
  });
} else {
  // Si no se encuentra el capítulo, se muestra un mensaje de error
  document.querySelector(".titulo").textContent = "Capítulo no encontrado";
  document.querySelector(".subtitulo").textContent = "";
}

// Selecciona el contenedor de la lista lateral de capítulos
const listaSidebar = document.querySelector(".capitulos");

// Si existe el contenedor, se limpia y se rellena con los capítulos disponibles
if (listaSidebar) {
  listaSidebar.innerHTML = "";

  comic.capitulos.forEach(cap => {
    // Crea un nuevo elemento <li> para cada capítulo
    const li = document.createElement("li");

    // Inserta el contenido con imagen y nombre del capítulo, con estilos
    li.innerHTML = `
      <a href="./capitulo.html?id=${cap.id}" style="display: flex; align-items: center; text-decoration: none;">
        <img src="${cap.imgPortada}" alt="Capítulo ${cap.id}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border: 2px solid #444;">
        <span style="color: #eee;">Capítulo ${cap.id}: ${cap.nombreCap}</span>
      </a>
    `;

    // Agrega el <li> al contenedor lateral
    listaSidebar.appendChild(li);
  });
}