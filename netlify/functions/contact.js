import 'dotenv/config';
import Mailjet from 'node-mailjet';
import fetch from 'node-fetch'; // if using Node 18+ may not be needed

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, turnstileToken } = JSON.parse(event.body);

    if (!name || !email || !message || !turnstileToken) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing fields' }) };
    }

    // --- Turnstile verification ---
    const secret = process.env.TURNSTILE_SECRET_KEY;
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret,
        response: turnstileToken
      }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const verifyJson = await verifyRes.json();
    if (!verifyJson.success) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Captcha verification failed' }) };
    }
    // --- End Turnstile verification ---

    // --- Send email via Mailjet (your existing logic) ---
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_FROM,
              Name: 'Enon Website Contact Form'
            },
            To: [
              {
                Email: process.env.EMAIL_TO,
                Name: 'Your Name'
              }
            ],
            Subject: `New Contact Form Message from ${name}`,
            TextPart: message,
            ReplyTo: {
              Email: email,
              Name: name
            }
          }
        ]
      });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error('Error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email' }) };
  }
}
