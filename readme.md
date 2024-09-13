# Proyecto Carrito de Compras

## Descripción de las correccciones realizadas fueron

# 1 En tu archivo carrito.js en la linea 24 tienes ya una declaracion de productos actualizado, es necesario solo exportar eso y no declararlo en cada parte de tu codigo y solo lo importas (por eso comente las demas partes de tu codigo )

            // agrega el export 
            export let productosActualizados=localStorage.getItem('Productos-Actualizados') ? JSON.parse(localStorage.getItem('Productos-Actualizados')) : []; 

# 2 En vaciar carrito agregue un par de lineas de codigo para poder actualizar el estado del carrito y mostrar los botones de vaciar, comprar y el total

        // Asegúrate de ocultar y reiniciar el estado del carrito
            document.querySelector('.valor__total').textContent = '';
            containerTotal.style.display = 'none';

## De la misma manera bajo esta logica tu overlay deberia estar siendo actualizada en tu componente carrito.js (linea 100)

// Asegúrate de mostrar el total y los botones
     containerTotal.style.display = 'flex'; // Asegúrate de que el contenedor total sea visible
     document.querySelector('.valor__total').textContent = `Valor total: $${actualizarValorTotal()}`; // Actualizar el valor total

# 3 me tome la libertad de agregar un apartado del codigo (que no se si estaba ya declarado) pero es para que el icono del carrito me muestre el carrito (valga la redundancia) a partir de la linea 135 para adelante (archivo carrito.js)

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
