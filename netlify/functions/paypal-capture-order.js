// netlify/functions/paypal-capture-order.js
// Captura el pago y genera el link de descarga del ebook

const EBOOKS = {
  'contratos':       { title: 'Pack de Contratos para Desarrolladores', file: '/pdfs/ebook-contratos.pdf', price: '47.00' },
  'factibilidad':    { title: 'Análisis de Factibilidad Inmobiliaria',   file: '/pdfs/ebook-factibilidad.pdf', price: '37.00' },
  'presupuesto':     { title: 'Presupuesto y Costos de Construcción',    file: '/pdfs/ebook-presupuesto.pdf', price: '37.00' },
  'financiamiento':  { title: 'Financiamiento de Proyectos',             file: '/pdfs/ebook-financiamiento.pdf', price: '37.00' },
  'str':             { title: 'Short-Term Rentals Strategy',             file: '/pdfs/ebook-str.pdf', price: '47.00' }
};

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
  const PAYPAL_API = process.env.PAYPAL_ENV === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

  let body;
  try { body = JSON.parse(event.body); }
  catch (e) { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { orderID, ebookId } = body;
  if (!orderID || !ebookId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing orderID or ebookId' }) };
  }

  const ebook = EBOOKS[ebookId];
  if (!ebook) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Ebook not found' }) };
  }

  // 1) Obtener access token
  const authRes = await fetch(PAYPAL_API + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  if (!authRes.ok) return { statusCode: 502, body: JSON.stringify({ error: 'PayPal auth failed' }) };
  const { access_token } = await authRes.json();

  // 2) Capturar el pago
  const captureRes = await fetch(PAYPAL_API + '/v2/checkout/orders/' + orderID + '/capture', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json'
    }
  });
  const capture = await captureRes.json();

  if (!captureRes.ok || capture.status !== 'COMPLETED') {
    return { statusCode: 502, body: JSON.stringify({ error: 'Capture failed', details: capture }) };
  }

  // 3) Generar token de descarga temporal (válido 1 hora)
  const expires = Date.now() + 60 * 60 * 1000;
  const token = Buffer.from(JSON.stringify({ ebookId, expires, orderId: orderID })).toString('base64url');

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      success: true,
      downloadToken: token,
      downloadUrl: '/descargar-ebook?token=' + token,
      ebookTitle: ebook.title
    })
  };
};
