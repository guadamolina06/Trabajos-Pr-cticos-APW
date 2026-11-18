function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function filtrarProductos(productos, categoria, textoBuscado) {
  const busqueda = normalizarTexto(textoBuscado);

  return productos.filter(producto => {
    const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;
    const coincideTexto = normalizarTexto(producto.nombre).includes(busqueda);
    return coincideCategoria && coincideTexto;
  });
}

export { normalizarTexto, filtrarProductos };