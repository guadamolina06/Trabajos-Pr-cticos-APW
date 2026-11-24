import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { filtrarProductos, normalizarTexto } from "../src/recursos/javascript/filtros.js";

const productos = [
  { id: 1, nombre: "Espejo bucal odontológico", categoria: "Instrumental" },
  { id: 3, nombre: "Guantes odontológicos", categoria: "Bioseguridad" },
  { id: 8, nombre: "Ionómero vítreo", categoria: "Restauración" }
];

describe("normalizarTexto", () => {
  test("saca acentos, pasa a minúsculas y quita espacios", () => {
    assert.equal(normalizarTexto("  IONÓMERO "), "ionomero");
  });
});

describe("filtrarProductos", () => {
  test("con 'Todas' y sin texto devuelve todos los productos", () => {
    assert.equal(filtrarProductos(productos, "Todas", "").length, 3);
  });

  test("filtra por categoría", () => {
    const resultado = filtrarProductos(productos, "Bioseguridad", "");
    assert.deepEqual(resultado.map(p => p.id), [3]);
  });

  test("busca por nombre sin importar acentos ni mayúsculas", () => {
    const resultado = filtrarProductos(productos, "Todas", "IONOMERO");
    assert.deepEqual(resultado.map(p => p.id), [8]);
  });

  test("combina categoría y texto", () => {
    assert.equal(filtrarProductos(productos, "Instrumental", "guantes").length, 0);
  });
});