function formatearPrecio(precio) {
  return `$${precio.toLocaleString("es-AR")}`;
}

function renderizacionProductos(contenedor, productos) {
  if (!contenedor) return;
  let productosHTML = "";
  productos.forEach(producto => {
    const listaCaracteristicas = producto.caracteristicas
      .map(caracteristica => `<li>${caracteristica}</li>`)
      .join("");

    productosHTML += `
      <article class="contenido-productos">
        <span class="etiqueta-categoria">${producto.categoria}</span>
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.altImagen}">
        <p>${producto.descripcion}</p>
        <p class="precio">${formatearPrecio(producto.precio)}</p>
        <section aria-labelledby="caracteristicas-${producto.id}">
          <h3 id="caracteristicas-${producto.id}">Características</h3>
          <ul>${listaCaracteristicas}</ul>
        </section>
        <form class="form-agregar" data-id="${producto.id}">
          <label for="cantidad-${producto.id}">Cantidad:</label>
          <input type="number" id="cantidad-${producto.id}" name="cantidad" value="1" min="1" required>
          <button type="submit">Agregar al carrito</button>
        </form>
      </article>
    `;
  });
  contenedor.innerHTML = productosHTML;
}

function indiceProductos(contenedor, productos) {
  if (!contenedor) return;
  let productosHTML = "";
  productos.forEach(producto => {
    productosHTML += `
      <article class="decripcion-destc">
        <img src="${producto.imagen}" class="imagenes" alt="${producto.altImagen}">
        <h3>${producto.nombre}</h3>
        <p>${formatearPrecio(producto.precio)}</p>
        <a href="productos.html" class="btn-categorias">Ver Producto</a>
      </article>
    `;
  });
  contenedor.innerHTML = productosHTML;
}

function mostrarError(contenedor, mensaje) {
  if (!contenedor) return;
  contenedor.innerHTML = `<p class="mensaje-error">${mensaje}</p>`;
}
function mostrarNotificacion(mensaje, tipo = "exito") {
  const aviso = document.createElement("div");
  aviso.className = `notificacion notificacion-${tipo}`;
  aviso.setAttribute("role", "status");
  aviso.textContent = mensaje;
  document.body.appendChild(aviso);

  setTimeout(() => {
    aviso.remove();
  }, 3000);
}

export { renderizacionProductos, indiceProductos, mostrarError, formatearPrecio, mostrarNotificacion };