// netlify/functions/paypal-create-order.js
// Crea una orden de PayPal para comprar un ebook

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

  const { ebookId, ebookTitle, price, currency = 'USD' } = body;
  if (!ebookId || !price) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ebookId or price' }) };
  }

  // 1) Obtener access token de PayPal
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

  // 2) Crear la orden
  const orderRes = await fetch(PAYPAL_API + '/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
      'PayPal-Request-Id': 'ebook-' + ebookId + '-' + Date.now()
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: ebookId,
        description: ebookTitle,
        amount: { currency_code: currency, value: price },
        custom_id: ebookId
      }]
    })
  });
  const order = await orderRes.json();
  if (!orderRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Order creation failed', details: order }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: order.id })
  };
};
