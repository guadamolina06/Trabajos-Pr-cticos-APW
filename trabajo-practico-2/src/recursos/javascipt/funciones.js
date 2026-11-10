
function renderizacionProductos(contenedor, productos) {
    if (!contenedor) return;
    let productosHTML ="";
    productos.forEach(elementos=>{
        productosHTML+=
        `
           <div class="contenido-productos">
            <h2>${elementos.nombre}</h2>
            <img src="${elementos.imagen}" alt="${elementos.altImagen}">
            <p> ${elementos.descripcion}</p>
            <p>${elementos.precio}</p>
           <section aria-labelledby="caracteristicas">
            <h2 id=${elementos.id}></h2>
            <ul>
              <li class="descripcionProductos">${elementos.caracteristicas}</li>
              </ul>
           </section>
             <form action="carrito.html" method="get">
 
                <label for="cantidad">
                    Cantidad:
                </label>

                <input
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    value="1"
                    min="1">

                <button type="submit">
                    Agregar al carrito
                </button>
           </form>
            </div>
        `
      

    })
      contenedor.innerHTML=productosHTML
}

function indiceProductos (contenedor,productos){
    if (!contenedor) return;
    let productosHTML="";
    productos.forEach(elementos=>{
        productosHTML+= `  
                
             <article   class="decripcion-destc">
                
                <img src="${elementos.imagen}" class="imagenes" alt="${elementos.altImagen}" >
                <h3>${elementos.nombre}</h3>
                <p>
                    ${elementos.precio}
                </p>
                <a href="productos.html" class="btn-categorias">
                    Ver Producto
                </a>
             </article>`
             
    })
    contenedor.innerHTML=productosHTML
}



export{renderizacionProductos,indiceProductos}