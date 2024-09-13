import {agregarProducto} from './AgregarCarrito.js' 
import{eliminarProducto}from './EliminarCarrito.js' 
import {activarBoton} from './ActivarBotones.js'

let data 
let carrito = document.getElementById('carrito__compras'); 
const overlay = document.getElementById('overlay'); 
let botones;

(async () => {
  try {
    let response = await fetch('./js/carrito.json');
    data = await response.json(); 
  
    recibirData(data);
    activarBoton(data);
  } catch (err) {
    console.error('Error al recibir los productos', { message: 'error' });
  }
})();



export let productosActualizados=localStorage.getItem('Productos-Actualizados') ? JSON.parse(localStorage.getItem('Productos-Actualizados')) : []; 

export let carritoID = [];
export let overlayContainer = document.querySelector('.overlay__container');
export const containerTotal = document.querySelector('.container__total');
export let vaciar = document.getElementById('vaciar'); 
export let iconCart=document.getElementById('icon-cart')


function crearBotones() {
  let boton = document.createElement('button');
  boton.innerHTML = 'Agregar';
  boton.classList.add('botones__agregar');
  return boton;
}

function recibirData(datos) {
  for (let i = 0; i < datos.length; i++) {
    const contenedorDiv = document.createElement('div');
    contenedorDiv.classList.add('tarjeta');
    let color = document.createElement('p');
    let precio = document.createElement('p');

    contenedorDiv.innerHTML += `
      <h2 class="titulo__tarjeta">${datos[i].nombre}</h2>
      <img class="imagenes__tarjeta" src="${datos[i].imagen}" alt="">
    `;
    color.textContent = 'Color: ' + datos[i].color;
    precio.textContent = '$' + datos[i].precio;
    color.classList.add('color__tarjeta');
    precio.classList.add('precio');
    
    botones = crearBotones();
    botones.dataset.id = i;
    contenedorDiv.appendChild(color);
    contenedorDiv.appendChild(precio);
    contenedorDiv.appendChild(botones);
    
    carrito.append(contenedorDiv);
  }

  carritoID = datos.map((elemento, index) => {
    elemento.id = index;
    return { ...elemento };
  });

  actualizarValorTotal();
}





export function actualizarOverlay() {
  overlayContainer.innerHTML = ''; // Limpiar el contenido del overlay antes de añadir los productos actualizados

  if (productosActualizados.length > 0) {
    for (const producto of productosActualizados) {
      overlayContainer.innerHTML += `
        <div class="overlay__flex">
          <div class="overlay__tarjeta-1">
            <h2 class="imagen__nombre">${producto.nombre}</h2>
            <img class="imagen__producto" src="${producto.imagen}" alt="">
            <p class="imagen__precio">Precio unitario: $${producto.precio}</p>
            <span class="cantidad">Stock: ${producto.stock}</span>
          </div>
          <div class="overlay__tarjeta-2">
            <span class="cantidad">Cantidad: ${producto.cantidad}</span>
            <div class="contenedor__botonera">
              <button type="button" class="agregar__boton" data-id="${producto.id}">Agregar</button>
              <button type="button" class="eliminar__boton" data-id="${producto.id}">Eliminar</button>
            </div>
          </div>
        </div>
      `;
    }
     // Asegúrate de mostrar el total y los botones
     containerTotal.style.display = 'flex'; // Asegúrate de que el contenedor total sea visible
     document.querySelector('.valor__total').textContent = `Valor total: $${actualizarValorTotal()}`; // Actualizar el valor total


    // Reagregar los event listeners después de actualizar el overlay 
    localStorage.setItem("Productos-Actualizados",productosActualizados)
    agregarProducto(); 
    eliminarProducto(); 
  } else {
    overlayContainer.innerHTML = 'Carrito vacío ☹️'; 
    containerTotal.style.display='none'
  }
  
  overlay.style.display = 'flex';
}

 


export function actualizarValorTotal() {
  let total = productosActualizados.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
  document.querySelector('.valor__total').textContent = `Valor total: $${total}`; 
  return total
}



document.getElementById('icon-overlay').addEventListener('click', () => {
  overlay.style.display = 'none';
});  




// Selecciona el icono del carrito
const iconoCarrito = document.querySelector('.contenedor-carrito');

// Función para mostrar el carrito
function toggleCarrito() {
  // Verifica si esta visible o no
  if (overlay.style.display === 'flex') {
    // ocultarlo
    overlay.style.display = 'none';
  } else {
    // mostrarlo
    actualizarOverlay(); // Asegúrate de que el carrito se actualice
    overlay.style.display = 'flex';
  }
}

// Agrega el manejador de eventos al icono del carrito
iconoCarrito.addEventListener('click', toggleCarrito);
