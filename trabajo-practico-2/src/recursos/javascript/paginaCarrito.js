import { obtenerCarrito, guardarCarrito } from "./almacenamiento.js";
import { actualizarCantidad, eliminarProducto, calcularTotal, contarUnidades } from "./carrito.js";
import { formatearPrecio, mostrarNotificacion } from "./funciones.js";

const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const unidadesCarrito = document.getElementById("unidadesCarrito");
const btnVaciar = document.getElementById("btnVaciar");
const btnConfirmar = document.getElementById("btnConfirmar");

let carrito = obtenerCarrito();

function renderizarCarrito() {
  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <p class="carrito-vacio">
        Tu carrito está vacío. <a href="productos.html">Ver productos</a>
      </p>`;
  } else {
    listaCarrito.innerHTML = carrito.map(item => `
      <article class="item-carrito">
        <img class="imagen-carrito" src="${item.imagen}" alt="${item.altImagen}">
        <div class="item-info">
          <h3>${item.nombre}</h3>
          <p>Precio unitario: ${formatearPrecio(item.precio)}</p>
          <label for="cantidad-carrito-${item.id}">Cantidad:</label>
          <input type="number" id="cantidad-carrito-${item.id}" class="input-cantidad"
                 data-id="${item.id}" value="${item.cantidad}" min="1">
          <p>Subtotal: ${formatearPrecio(item.precio * item.cantidad)}</p>
          <button type="button" class="btn-eliminar" data-id="${item.id}">Eliminar</button>
        </div>
      </article>
    `).join("");
  }

  totalCarrito.textContent = formatearPrecio(calcularTotal(carrito));
  unidadesCarrito.textContent = contarUnidades(carrito);
  btnVaciar.disabled = carrito.length === 0;
  btnConfirmar.disabled = carrito.length === 0;
}

function actualizarCarrito(nuevoCarrito) {
  carrito = nuevoCarrito;
  guardarCarrito(carrito);
  renderizarCarrito();
}

listaCarrito.addEventListener("change", (evento) => {
  if (!evento.target.classList.contains("input-cantidad")) return;

  const id = Number(evento.target.dataset.id);
  const cantidad = Number(evento.target.value);

  if (!Number.isInteger(cantidad) || cantidad < 1) {
    mostrarNotificacion("La cantidad mínima es 1.", "error");
    renderizarCarrito();
    return;
  }

  actualizarCarrito(actualizarCantidad(carrito, id, cantidad));
});

listaCarrito.addEventListener("click", (evento) => {
  if (!evento.target.classList.contains("btn-eliminar")) return;

  const id = Number(evento.target.dataset.id);
  actualizarCarrito(eliminarProducto(carrito, id));
  mostrarNotificacion("Producto eliminado del carrito.");
});

btnVaciar.addEventListener("click", () => {
  actualizarCarrito([]);
  mostrarNotificacion("Vaciaste el carrito.");
});

renderizarCarrito();