const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const os = require('os');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // habilita CORS para cualquier origen
app.use(express.json());

// Ruta de impresión
app.post('/imprimir', (req, res) => {
  const texto = req.body.texto;

  if (!texto) {
    return res.status(400).send('Falta el campo "texto"');
  }

  const cortarPapel = '\x1D\x56\x00'; // comando ESC/POS cortar papel
  const contenido = '\n\n\n' + texto + '\n\n\n' + cortarPapel;

  try {
    fs.writeFileSync('/dev/usb/lp0', contenido, { encoding: 'binary' });
    return res.send('Texto enviado a la impresora');
  } catch (error) {
    console.error('Error al imprimir:', error.message);
    return res.status(500).send('Error al imprimir');
  }
});

app.get('/get_ip', (req, res) => {
  res.json({ ip: '192.168.88.254' });
});

// Opciones SSL
const sslOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

// Iniciar servidor HTTPS
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(` \~E API escuchando en https://192.168.88.246:${PORT}`);
});

