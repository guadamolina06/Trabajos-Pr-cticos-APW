const CLAVE_CARRITO = "carritoDentalPro";

function obtenerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error("No se pudo leer el carrito:", error);
    return [];
  }
}

function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
}

export { obtenerCarrito, guardarCarrito };