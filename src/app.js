const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, '../views'));

// Configuración del motor de vistas
//app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, '..', 'public')));

// Configuración de sesión
app.use(session({
  secret: 'secreto_super_seguro',
  resave: false,
  saveUninitialized: true
}));

// Lista de productos (mock)
const productos = [
  { id: 1, nombre: 'Camisa', precio: 25, imagen: '/images/camisa.jpg' },
  { id: 2, nombre: 'Pantalón', precio: 40, imagen: '/images/pantalon.jpg' },
  { id: 3, nombre: 'Zapatos', precio: 60, imagen: '/images/zapatos.jpg' }
];


// Ruta principal: mostrar productos
app.get('/', (req, res) => {
  res.render('index', { productos });
});

// Ruta para agregar producto al carrito
app.post('/agregar/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const producto = productos.find(p => p.id === productoId);

  if (!producto) return res.status(404).send('Producto no encontrado');

  if (!req.session.carrito) req.session.carrito = [];

  // Buscar si ya existe el producto en el carrito
  const itemEnCarrito = req.session.carrito.find(item => item.producto.id === productoId);

  if (itemEnCarrito) {
    // Si existe, aumentar cantidad
    itemEnCarrito.cantidad += 1;
  } else {
    // Si no existe, agregar nuevo con cantidad 1
    req.session.carrito.push({ producto, cantidad: 1 });
  }

  res.redirect('/carrito');
});


// Ver productos del carrito
app.get('/carrito', (req, res) => {
  const carrito = req.session.carrito || [];
  res.render('carrito', { carrito });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
