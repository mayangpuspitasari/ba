const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Tambahkan baris ini
const db = require('./config/database');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Dummy for testing
app.get('/', (req, res) => res.send('API is running'));

app.use(cors({
    origin: 'http://localhost:5173',  // Pastikan ini sesuai dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Tentukan metode HTTP yang diperbolehkan
    allowedHeaders: ['Content-Type', 'Authorization'],  // Tentukan header yang diperbolehkan
  }));

// Middleware untuk melayani folder 'uploads' sebagai file statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rute untuk produk
const productRoutes = require('./routes/ProductRoutes');
app.use('/produk', productRoutes);

// Rute pelanggan
const PelangganRoutes = require('./routes/PelangganRoutes');
app.use('/pelanggan', PelangganRoutes);

// Rute user
const UserRoutes = require('./routes/UserRoutes');
app.use('/user', UserRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
