
import  {iconCart} from './carrito.js'; 
import  {actualizarOverlay, actualizarValorTotal, productosActualizados} from './carrito.js' 




/* let productosActualizados=localStorage.getItem('Productos-Actualizados') ? JSON.parse(localStorage.getItem('Productos-Actualizados')) : [];
 */


export function eliminarProducto() {
  let eliminarBoton = document.querySelectorAll('.eliminar__boton');

  eliminarBoton.forEach(botonEliminar => {
    botonEliminar.addEventListener('click', () => {
      let idProducto = Number(botonEliminar.dataset.id);
      let producto = productosActualizados.find(p => p.id === idProducto);

      if (producto) {
        if (producto.cantidad > 1) {
          // Disminuir la cantidad si es mayor a 1
          producto.cantidad--;
          iconCart.innerHTML = producto.cantidad;
        } else {
          // Si la cantidad es 1, eliminar el producto
          productosActualizados.splice(productosActualizados.findIndex(produc=>produc.id===idProducto), 1);

          iconCart.innerHTML = productosActualizados.length > 0 ? productosActualizados.reduce((acc, prod) => acc + prod.cantidad, 0) : 0;
        }

        // Guardar el estado actualizado en localStorage
        localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados));

        // Actualizar la interfaz del overlay y el valor total
        actualizarOverlay();
        actualizarValorTotal();
      }
    });
  });
}
