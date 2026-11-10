import { renderizacionProductos,indiceProductos } from "./funciones.js";
import { datos} from "./obj.js";

const contenedorProductos = document.getElementById("prodPrincipal")
const prodCatalogo = document.getElementById("catalogo1")

renderizacionProductos(prodCatalogo, datos)
indiceProductos(contenedorProductos, datos)