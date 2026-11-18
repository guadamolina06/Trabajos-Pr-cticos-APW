function agregarProducto(carrito, producto, cantidad) {
  const yaEsta = carrito.find(item => item.id === producto.id);

  if (yaEsta) {
    return carrito.map(item =>
      item.id === producto.id
        ? { ...item, cantidad: item.cantidad + cantidad }
        : item
    );
  }

  const nuevoItem = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen: producto.imagen,
    altImagen: producto.altImagen,
    cantidad: cantidad
  };

  return [...carrito, nuevoItem];
}

function actualizarCantidad(carrito, id, cantidad) {
  return carrito.map(item =>
    item.id === id ? { ...item, cantidad: cantidad } : item
  );
}

function eliminarProducto(carrito, id) {
  return carrito.filter(item => item.id !== id);
}

function calcularTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function contarUnidades(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

export { agregarProducto, actualizarCantidad, eliminarProducto, calcularTotal, contarUnidades };