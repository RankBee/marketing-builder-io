import type { NextApiRequest, NextApiResponse } from 'next';

const GHOST_ADMIN_API_URL = 'https://geo.rankbee.ai/ghost/api/admin';
const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY || '';

/**
 * Convert hex string to Uint8Array
 */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

/**
 * Generate JWT token for Ghost Admin API
 */
async function generateGhostToken(apiKey: string): Promise<string> {
  const [id, secret] = apiKey.split(':');

  const header = { alg: 'HS256', typ: 'JWT', kid: id };
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (5 * 60),
    aud: '/admin/'
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const unsignedToken = `${base64Header}.${base64Payload}`;

  const secretBytes = hexToBytes(secret);
  const encoder = new TextEncoder();
  const data = encoder.encode(unsignedToken);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    secretBytes.buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
  const base64Signature = Buffer.from(signature).toString('base64url');

  return `${unsignedToken}.${base64Signature}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, name } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  if (!GHOST_ADMIN_API_KEY) {
    console.error('[subscribe] GHOST_ADMIN_API_KEY not configured');
    return res.status(500).json({ success: false, error: 'Newsletter subscription is temporarily unavailable.' });
  }

  try {
    const token = await generateGhostToken(GHOST_ADMIN_API_KEY);

    const response = await fetch(`${GHOST_ADMIN_API_URL}/members/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Ghost ${token}`
      },
      body: JSON.stringify({
        members: [{
          email,
          name: name || '',
          subscribed: true,
          labels: ['newsletter']
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[subscribe] Ghost Members API error:', response.status, errorData);

      if (response.status === 422) {
        return res.status(200).json({ success: false, error: 'This email is already subscribed to our newsletter.' });
      }

      return res.status(502).json({ success: false, error: `Failed to subscribe: ${response.statusText}` });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[subscribe] Error adding subscriber to Ghost:', error);
    return res.status(500).json({ success: false, error: 'Network error' });
  }
}
