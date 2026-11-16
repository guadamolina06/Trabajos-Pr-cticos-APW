export async function obtenerProductos(url) {
  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    const productos = await respuesta.json();
    return productos;
  }
   catch (error) {
    console.error("No se pudieron cargar los productos:", error);
    return null;
  }
}