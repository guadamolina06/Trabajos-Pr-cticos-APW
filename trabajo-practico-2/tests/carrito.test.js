import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { agregarProducto, eliminarProducto, calcularTotal } from "../src/recursos/javascript/carrito.js";

const guantes = { id: 3, nombre: "Guantes odontológicos", precio: 12000, imagen: "g.webp", altImagen: "Guantes" };
const espejo = { id: 1, nombre: "Espejo bucal", precio: 8000, imagen: "e.webp", altImagen: "Espejo" };

describe("calcularTotal", () => {
  test("devuelve 0 si el carrito está vacío", () => {
    assert.equal(calcularTotal([]), 0);
  });

  test("suma precio por cantidad de cada producto", () => {
    const carrito = [
      { ...guantes, cantidad: 2 },
      { ...espejo, cantidad: 1 }
    ];
    assert.equal(calcularTotal(carrito), 32000);
  });
});

describe("agregarProducto", () => {
  test("agrega un producto nuevo al carrito", () => {
    const resultado = agregarProducto([], guantes, 2);
    assert.equal(resultado.length, 1);
    assert.equal(resultado[0].cantidad, 2);
  });

  test("si el producto ya está, suma la cantidad en vez de duplicarlo", () => {
    const carrito = agregarProducto([], guantes, 2);
    const resultado = agregarProducto(carrito, guantes, 1);
    assert.equal(resultado.length, 1);
    assert.equal(resultado[0].cantidad, 3);
  });

  test("no modifica el carrito original", () => {
    const carrito = [];
    agregarProducto(carrito, guantes, 1);
    assert.equal(carrito.length, 0);
  });
});

describe("eliminarProducto", () => {
  test("saca solo el producto con ese id", () => {
    const carrito = [{ ...guantes, cantidad: 1 }, { ...espejo, cantidad: 1 }];
    const resultado = eliminarProducto(carrito, 3);
    assert.deepEqual(resultado.map(item => item.id), [1]);
  });
});