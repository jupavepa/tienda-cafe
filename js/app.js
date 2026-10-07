/* =========================================================
   TALLER PRÁCTICO - DESARROLLO WEB II
   Interactividad y Carrito de Compras Básico
   ========================================================= */


/* ---------------------------------------------------------
   1. MENÚ RESPONSIVE
   Al hacer clic en el botón hamburguesa se agrega o quita
   la clase "abierto" del menú usando classList.toggle().
   --------------------------------------------------------- */
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', function () {
  menu.classList.toggle('abierto');
  btnMenu.classList.toggle('activo'); // anima el ícono a una "X"

  // Accesibilidad: indica a los lectores de pantalla si está abierto
  const estaAbierto = menu.classList.contains('abierto');
  btnMenu.setAttribute('aria-expanded', estaAbierto);
  btnMenu.setAttribute('aria-label', estaAbierto ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar el menú cuando se hace clic en un enlace (útil en móvil)
const enlacesMenu = menu.querySelectorAll('a');
enlacesMenu.forEach(function (enlace) {
  enlace.addEventListener('click', function () {
    menu.classList.remove('abierto');
    btnMenu.classList.remove('activo');
    btnMenu.setAttribute('aria-expanded', 'false');
  });
});


/* ---------------------------------------------------------
   2. MODO CLARO / OSCURO
   Se alterna la clase "modo-oscuro" en el <body>.
   El CSS cambia las variables de color según esa clase.
   --------------------------------------------------------- */
const btnTema = document.getElementById('btn-tema');

btnTema.addEventListener('click', function () {
  document.body.classList.toggle('modo-oscuro');

  // Cambiar el texto del botón según el modo actual
  if (document.body.classList.contains('modo-oscuro')) {
    btnTema.textContent = 'Modo claro';
    btnTema.setAttribute('aria-label', 'Cambiar a modo claro');
  } else {
    btnTema.textContent = 'Modo oscuro';
    btnTema.setAttribute('aria-label', 'Cambiar a modo oscuro');
  }
});


/* ---------------------------------------------------------
   3. CARRITO DE COMPRAS
   --------------------------------------------------------- */

// Referencias a los elementos del DOM
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
const mensajeVacio = document.getElementById('carrito-vacio');
const btnVaciar = document.getElementById('btn-vaciar');

// Acumulador numérico del total a pagar
let total = 0;


// Da formato de moneda colombiana: 38000 -> "$38.000"
function formatearPrecio(valor) {
  return '$' + valor.toLocaleString('es-CO');
}


// Actualiza en pantalla el total, el contador y el mensaje de vacío
function actualizarCarrito() {
  totalCarrito.textContent = formatearPrecio(total);

  const cantidadItems = listaCarrito.children.length;
  contadorCarrito.textContent = cantidadItems;

  if (cantidadItems === 0) {
    mensajeVacio.classList.remove('oculto');
  } else {
    mensajeVacio.classList.add('oculto');
  }
}


// Crea dinámicamente un ítem del carrito y lo agrega al DOM
function agregarAlCarrito(id, nombre, precio) {
  // <li class="item-carrito" data-id="..."> 
  const item = document.createElement('li');
  item.classList.add('item-carrito');
  item.dataset.id = id;

  // <span class="item-nombre">Nombre</span>
  const spanNombre = document.createElement('span');
  spanNombre.classList.add('item-nombre');
  spanNombre.textContent = nombre;

  // <span class="item-precio">$00.000</span>
  const spanPrecio = document.createElement('span');
  spanPrecio.classList.add('item-precio');
  spanPrecio.textContent = formatearPrecio(precio);

  // <button class="btn-eliminar">Eliminar</button>
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('btn-eliminar');
  btnEliminar.textContent = 'Eliminar';
  btnEliminar.setAttribute('aria-label', 'Eliminar ' + nombre + ' del carrito');

  // Evento para eliminar ESTE ítem: quita el nodo y descuenta su precio
  btnEliminar.addEventListener('click', function () {
    item.remove();
    total = total - precio;
    actualizarCarrito();
  });

  // Se arman los nodos con appendChild()
  item.appendChild(spanNombre);
  item.appendChild(spanPrecio);
  item.appendChild(btnEliminar);
  listaCarrito.appendChild(item);

  // Se suma el precio al acumulador
  total = total + precio;
  actualizarCarrito();
}


// Capturar el clic de cada botón "Agregar al carrito"
botonesAgregar.forEach(function (boton) {
  boton.addEventListener('click', function () {
    // Leer los atributos data-id, data-nombre y data-precio
    const id = boton.dataset.id;
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio); // convertir texto a número

    agregarAlCarrito(id, nombre, precio);

    // Confirmación visual breve en el botón
    boton.textContent = 'Agregado';
    setTimeout(function () {
      boton.textContent = 'Agregar al carrito';
    }, 900);
  });
});


// Vaciar carrito: borra todos los ítems y reinicia el total a $0
btnVaciar.addEventListener('click', function () {
  listaCarrito.innerHTML = '';
  total = 0;
  actualizarCarrito();
});


// Estado inicial al cargar la página
actualizarCarrito();
