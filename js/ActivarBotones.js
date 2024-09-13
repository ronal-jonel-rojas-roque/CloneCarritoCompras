import { carritoID, iconCart, actualizarOverlay, actualizarValorTotal, productosActualizados } from "./carrito.js";

export function activarBoton(data) {
    let botones = Array.from(document.querySelectorAll('.botones__agregar'));
  
    botones.forEach((button) => {
      button.addEventListener('click', () => {
        let botonClickeado = Number(button.dataset.id);
        let productoSeleccionado = carritoID.find(elemento => elemento.id === botonClickeado); 
        let productoExistente = productosActualizados.find(el => el.id === botonClickeado);  
        console.log(productoSeleccionado)
  
        if (productoSeleccionado &&productoSeleccionado.stock > 0) {
       
        
          if(productoExistente){  
        

            if (productoExistente.cantidad < Infinity) { 
              console.log(productoExistente)
              productoExistente.cantidad++;  
              productoSeleccionado.stock--
              iconCart.innerHTML=productoExistente.cantidad  
              console.log(productoExistente.cantidad) 
              console.log(productoExistente.stock)
            }  
            
            }  

             else {
              
              iconCart.innerHTML=1
              productosActualizados.push({ ...productoSeleccionado,cantidad:1 }); 
            
            }
  
          localStorage.setItem('Productos-Actualizados', JSON.stringify(productosActualizados)); 
          actualizarValorTotal();
          actualizarOverlay(); 

          if(productoSeleccionado.stock===0){
            alert('No habia productos')
          }
          
        
        }   
       

       

      });
    });
  }  
  