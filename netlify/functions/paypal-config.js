// netlify/functions/paypal-config.js
// Expone solo los datos PÚBLICOS necesarios para cargar el SDK de PayPal en el navegador.
// El Client ID de PayPal es público y seguro de exponer; el Client Secret NUNCA se envía aquí.

exports.handler = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;

  if (!clientId) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'PayPal no está configurado. Falta la variable de entorno PAYPAL_CLIENT_ID.'
      })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    },
    body: JSON.stringify({
      clientId,
      currency: 'USD',
      env: process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox'
    })
  };
};
