const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ========== DATOS MOCK ==========
let categorias = [
  { id: 1, nombre: 'Electrodomésticos', descripcion: 'Lavarropas, heladeras' },
  { id: 2, nombre: 'Muebles', descripcion: 'Sillas, mesas, armarios' }
];

let clientes = [
  { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '77712345' },
  { id: 2, nombre: 'María López', email: 'maria@mail.com', telefono: '77754321' }
];

let ventas = [
  { id: 1, clienteId: 1, fecha: '2025-04-27', total: 1500 }
];

// ========== ENDPOINTS CATEGORÍAS ==========
app.get('/categorias', (req, res) => res.json(categorias));
app.post('/categorias', (req, res) => {
  const nueva = { id: categorias.length + 1, ...req.body };
  categorias.push(nueva);
  res.status(201).json(nueva);
});
app.put('/categorias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    categorias[index] = { ...categorias[index], ...req.body };
    res.json(categorias[index]);
  } else {
    res.status(404).json({ error: 'No encontrada' });
  }
});
app.delete('/categorias/:id', (req, res) => {
  categorias = categorias.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// ========== ENDPOINTS CLIENTES ==========
app.get('/clientes', (req, res) => res.json(clientes));
app.post('/clientes', (req, res) => {
  const nuevo = { id: clientes.length + 1, ...req.body };
  clientes.push(nuevo);
  res.status(201).json(nuevo);
});
app.put('/clientes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    clientes[index] = { ...clientes[index], ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ error: 'No encontrado' });
  }
});
app.delete('/clientes/:id', (req, res) => {
  clientes = clientes.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
});

// ========== ENDPOINTS VENTAS ==========
app.get('/ventas', (req, res) => res.json(ventas));
app.post('/ventas', (req, res) => {
  const nueva = { id: ventas.length + 1, fecha: new Date().toISOString().split('T')[0], ...req.body };
  ventas.push(nueva);
  res.status(201).json(nueva);
});

// ========== INICIAR SERVIDOR ==========
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📋 Endpoints:`);
  console.log(`   - /categorias (GET, POST, PUT, DELETE)`);
  console.log(`   - /clientes (GET, POST, PUT, DELETE)`);
  console.log(`   - /ventas (GET, POST)`);
});