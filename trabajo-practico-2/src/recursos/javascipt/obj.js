import { URL_PRODUCTOS } from "./config.js";


async function obtenerDatos(url) {
    const respuesta = await fetch(url)
    const datos = await respuesta.json()
    return datos
}

const datos = await obtenerDatos(URL_PRODUCTOS)

export{datos}