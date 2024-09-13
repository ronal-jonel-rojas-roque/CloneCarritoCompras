
import  {iconCart} from './carrito.js'; 
import  {actualizarOverlay, actualizarValorTotal, productosActualizados} from './carrito.js' 


/* let productosActualizados=localStorage.getItem('Productos-Actualizados') ? JSON.parse(localStorage.getItem('Productos-Actualizados')) : [];
 */
export function agregarProducto() {
  let agregarBoton = document.querySelectorAll('.agregar__boton'); // Seleccionar botones después de que se actualizó el overlay
  agregarBoton.forEach(botonAgregar => {
    botonAgregar.addEventListener('click', () => {
      let idProducto = Number(botonAgregar.dataset.id);
      let producto = productosActualizados.find(p => p.id === idProducto);
      if (producto) {
        producto.cantidad++; 
        iconCart.innerHTML = producto.cantidad;
        localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados));
        actualizarOverlay(); // Recalcular el overlay
        actualizarValorTotal(); // Recalcular el total
      }
    });
  });
}


