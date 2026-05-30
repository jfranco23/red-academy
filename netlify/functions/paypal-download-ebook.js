// netlify/functions/paypal-download-ebook.js
// Sirve el PDF del ebook tras verificar el token de descarga

const path = require('path');
const fs = require('fs');

const EBOOKS = {
  'contratos':      '/pdfs/ebook-contratos.pdf',
  'factibilidad':   '/pdfs/ebook-factibilidad.pdf',
  'presupuesto':    '/pdfs/ebook-presupuesto.pdf',
  'financiamiento': '/pdfs/ebook-financiamiento.pdf',
  'str':            '/pdfs/ebook-str.pdf'
};

exports.handler = async (event) => {
  const { token } = event.queryStringParameters || {};

  if (!token) {
    return { statusCode: 400, body: 'Token requerido' };
  }

  let payload;
  try {
    payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
  } catch (e) {
    return { statusCode: 400, body: 'Token inválido' };
  }

  // Verificar expiración (1 hora)
  if (Date.now() > payload.expires) {
    return {
      statusCode: 410,
      headers: { 'Content-Type': 'text/html' },
      body: '<h2>El enlace de descarga ha expirado.</h2><p>Por favor contacta a soporte@redacademy.com</p>'
    };
  }

  const filePath = EBOOKS[payload.ebookId];
  if (!filePath) {
    return { statusCode: 404, body: 'Ebook no encontrado' };
  }

  // Redirect al archivo PDF estático (alojado en /pdfs/)
  return {
    statusCode: 302,
    headers: {
      'Location': filePath,
      'Cache-Control': 'no-store'
    },
    body: ''
  };
};
