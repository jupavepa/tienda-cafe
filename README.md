# Café La Vereda – Taller Práctico Desarrollo Web II

Sitio web de una tienda de café con interactividad en JavaScript y un carrito de compras básico.

## Estructura

```
tienda-cafe/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

## Funcionalidades

- **Menú responsive:** en pantallas menores a 768 px el menú se abre y cierra con el botón hamburguesa usando `classList.toggle()`.
- **Modo claro / oscuro:** el botón del menú alterna la clase `modo-oscuro` en el `<body>`.
- **Carrito de compras:**
  - Cada botón de producto tiene los atributos `data-id`, `data-nombre` y `data-precio`.
  - Al hacer clic se leen esos datos y se crea un `<li>` con `document.createElement()` y `appendChild()`.
  - Un acumulador numérico (`total`) actualiza el total en tiempo real.
  - Cada ítem tiene un botón **Eliminar** que quita el nodo y descuenta su precio.
  - El botón **Vaciar carrito** borra todos los ítems y deja el total en $0.

## Cómo ejecutarlo

Abre `index.html` en el navegador (o usa la extensión Live Server de VS Code).
