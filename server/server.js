const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Configura la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'data',
    password: '23823752',
    port: 5432
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../'))); // Servir archivos estáticos desde el directorio raíz

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log('Solicitud de inicio de sesión:', { email, password });

    try {
        // Buscar al usuario en la base de datos
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ success: true, name: user.name });
        } else {
            res.status(401).json({ success: false, message: 'Correo o contraseña incorrectos' });
        }
    } catch (err) {
        console.error('Error en el inicio de sesión:', err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});
    
// Ruta para registrarse
app.post('/register', async (req, res) => {
    const { name, lastname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, lastname, email, hashedPassword]
        );

        res.send('Registro exitoso');
    } catch (err) {
        console.error('Error al registrar:', err);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta de prueba de la base de datos
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`La hora actual en la base de datos es: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Error de conexión con la base de datos:', err);
        res.status(500).send('Error de conexión con la base de datos');
    }
});

// Ruta para servir la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../main.html'));
});

// Ruta para servir la página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en el puerto ${PORT}`);
});
