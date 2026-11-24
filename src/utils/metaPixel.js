/**
 * Utility for unified Meta Pixel (Browser) + Meta Conversions API (Server) tracking.
 * Automatically generates an eventID so Meta deduplicates browser and server events.
 */

export function generateEventId(prefix = 'evt') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export async function trackMetaEvent(eventName, userData = {}, customData = {}, explicitEventId = null) {
  const eventId = explicitEventId || generateEventId(eventName.toLowerCase());

  // 1. Client-Side Browser Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } catch (err) {
      console.warn('Meta Pixel client error:', err);
    }
  }

  // 2. Server-Side Conversions API (CAPI)
  if (typeof window !== 'undefined') {
    try {
      fetch('/api/meta-conversion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventName,
          eventId,
          eventSourceUrl: window.location.href,
          userData,
          customData
        })
      }).catch((err) => {
        // Silently catch network failures so user experience is never affected
        console.warn('Meta CAPI fetch error:', err);
      });
    } catch (err) {
      console.warn('Meta CAPI trigger error:', err);
    }
  }

  return eventId;
}

export function trackMetaLead(userData = {}, customData = {}) {
  return trackMetaEvent(
    'Lead',
    userData,
    {
      content_name: 'Founder Clarity Intensive Application',
      content_category: 'Executive Coaching',
      currency: 'INR',
      value: 0,
      ...customData
    },
    generateEventId('lead')
  );
}

export function trackMetaContact(userData = {}, customData = {}) {
  return trackMetaEvent(
    'Contact',
    userData,
    {
      content_name: 'WhatsApp / Direct Inquiry',
      ...customData
    },
    generateEventId('contact')
  );
}
