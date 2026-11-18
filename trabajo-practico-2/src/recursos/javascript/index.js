import { renderizacionProductos, indiceProductos, mostrarError,mostrarNotificacion } from "./funciones.js";
import { obtenerProductos } from "./obj.js";
import { URL_PRODUCTOS } from "./config.js";
import { filtrarProductos } from "./filtros.js";
import { agregarProducto } from "./carrito.js";
import { obtenerCarrito, guardarCarrito } from "./almacenamiento.js";

const contenedorProductos = document.getElementById("prodPrincipal");
const prodCatalogo = document.getElementById("catalogo1");
const buscador = document.getElementById("buscador");
const botonesFiltro = document.querySelectorAll(".btn-filtro");
const resultadoFiltro = document.getElementById("resultadoFiltro");

let categoriaActual = "Todas";

const productos = await obtenerProductos(URL_PRODUCTOS);

if (productos) {
  indiceProductos(contenedorProductos, productos.slice(0, 4));
  if (prodCatalogo) {
    iniciarCatalogo();
  }
} else {
  const mensaje = "No pudimos cargar los productos. Intentá de nuevo más tarde.";
  mostrarError(prodCatalogo, mensaje);
  mostrarError(contenedorProductos, mensaje);
}

function iniciarCatalogo() {
  const parametros = new URLSearchParams(window.location.search);
  const categoriaURL = parametros.get("categoria");
  if (categoriaURL) {
    categoriaActual = categoriaURL;
  }

  marcarBotonActivo();
  aplicarFiltros();

  buscador.addEventListener("input", aplicarFiltros);
    prodCatalogo.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const formulario = evento.target;
    const id = Number(formulario.dataset.id);
    const cantidad = Number(formulario.cantidad.value);

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      mostrarNotificacion("Ingresá una cantidad válida (mínimo 1).", "error");
      return;
    }

    const producto = productos.find(p => p.id === id);
    const carritoActualizado = agregarProducto(obtenerCarrito(), producto, cantidad);
    guardarCarrito(carritoActualizado);

    mostrarNotificacion(`Agregaste ${cantidad} × ${producto.nombre} al carrito`);
    formulario.reset();
  });

  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
      categoriaActual = boton.dataset.categoria;
      marcarBotonActivo();
      aplicarFiltros();
    });
  });
}

function aplicarFiltros() {
  const filtrados = filtrarProductos(productos, categoriaActual, buscador.value);
  renderizacionProductos(prodCatalogo, filtrados);

  if (filtrados.length === 0) {
    resultadoFiltro.textContent = "No se encontraron productos con esos filtros.";
  } else {
    resultadoFiltro.textContent = `Mostrando ${filtrados.length} de ${productos.length} productos`;
  }
}

function marcarBotonActivo() {
  botonesFiltro.forEach(boton => {
    const estaActivo = boton.dataset.categoria === categoriaActual;
    boton.classList.toggle("activo", estaActivo);
    boton.setAttribute("aria-pressed", estaActivo);
  });
}