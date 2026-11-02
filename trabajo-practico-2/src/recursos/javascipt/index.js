import { renderizacionProductos,indiceProductos } from "./funciones.js";
import { productos } from "./obj.js";

const contenedorProductos = document.getElementById("prodPrincipal")
const prodCatalogo = document.getElementById("catalogo1")

renderizacionProductos(prodCatalogo, productos)
indiceProductos(contenedorProductos, productos)