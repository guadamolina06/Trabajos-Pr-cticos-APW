import { renderizacionProductos, indiceProductos, mostrarError } from "./funciones.js";
import { obtenerProductos } from "./obj.js";
import { URL_PRODUCTOS } from "./config.js";

const contenedorProductos = document.getElementById("prodPrincipal");
const prodCatalogo = document.getElementById("catalogo1");

const productos = await obtenerProductos(URL_PRODUCTOS);

if (productos) {
  renderizacionProductos(prodCatalogo, productos);
  indiceProductos(contenedorProductos, productos.slice(0, 4));
} 
else {
  const mensaje = "No pudimos cargar los productos. Intentá de nuevo más tarde.";
  mostrarError(prodCatalogo, mensaje);
  mostrarError(contenedorProductos, mensaje);
}