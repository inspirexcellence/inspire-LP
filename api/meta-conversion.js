import crypto from 'crypto';

function hash(val) {
  if (!val || typeof val !== 'string') return undefined;
  const clean = val.trim().toLowerCase();
  if (!clean) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
}

function cleanPhone(phone) {
  if (!phone || typeof phone !== 'string') return undefined;
  // Remove non-digit characters
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // If Indian 10-digit number without country code, prepend 91
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
}

function getCookie(cookieHeader, name) {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      eventName = 'PageView',
      eventId,
      eventSourceUrl,
      userData = {},
      customData = {}
    } = req.body || {};

    const datasetId = process.env.META_DATASET_ID || '1610703920742109';
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('META_ACCESS_TOKEN environment variable is missing.');
      return res.status(500).json({ success: false, error: 'META_ACCESS_TOKEN is not configured in Vercel environment variables.' });
    }

    // Extract client IP and user agent for high match accuracy
    const clientIp = (
      req.headers['x-forwarded-for'] ||
      req.socket?.remoteAddress ||
      ''
    ).split(',')[0].trim();

    const userAgent = req.headers['user-agent'] || '';
    const cookieHeader = req.headers.cookie || '';
    const fbp = getCookie(cookieHeader, '_fbp') || userData.fbp;
    const fbc = getCookie(cookieHeader, '_fbc') || userData.fbc;

    // Split name into first and last name if available
    let fn, ln;
    if (userData.name) {
      const parts = userData.name.trim().split(/\s+/);
      fn = parts[0];
      if (parts.length > 1) {
        ln = parts.slice(1).join(' ');
      }
    }

    const payloadUserData = {
      client_ip_address: clientIp || undefined,
      client_user_agent: userAgent || undefined,
      fbp: fbp || undefined,
      fbc: fbc || undefined
    };

    const hashedEmail = hash(userData.email);
    if (hashedEmail) payloadUserData.em = [hashedEmail];

    const hashedPhone = cleanPhone(userData.phone);
    if (hashedPhone) payloadUserData.ph = [hashedPhone];

    const hashedFn = hash(fn);
    if (hashedFn) payloadUserData.fn = [hashedFn];

    const hashedLn = hash(ln);
    if (hashedLn) payloadUserData.ln = [hashedLn];

    const eventPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          event_source_url: eventSourceUrl || req.headers.referer || undefined,
          action_source: 'website',
          user_data: payloadUserData,
          custom_data: Object.keys(customData).length > 0 ? customData : undefined
        }
      ]
    };

    const metaUrl = `https://graph.facebook.com/v19.0/${datasetId}/events?access_token=${accessToken}`;

    const metaRes = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventPayload)
    });

    const metaData = await metaRes.json();

    if (!metaRes.ok) {
      console.error('Meta CAPI Error:', metaData);
      return res.status(metaRes.status).json({ success: false, error: metaData });
    }

    return res.status(200).json({ success: true, result: metaData });
  } catch (error) {
    console.error('Server error in meta-conversion:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
