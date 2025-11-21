// Netlify Function to fetch game modes / rotation data from Brawl Stars API
// Runs server-side to avoid CORS and exposes a simple endpoint to the frontend

const API_TOKEN = process.env.BRAWL_API_TOKEN || null;

exports.handler = async (event) => {
  try {
    const type = (event.queryStringParameters && event.queryStringParameters.type) || 'rotation';
    console.log('getGameData type:', type);

    // Decide endpoint
    let url;
    if (type === 'gamemodes') {
      url = `https://api.brawlstars.io/v1/gamemodes`;
    } else {
      // default -> rotation of events/maps
      url = `https://api.brawlstars.io/v1/events/rotation`;
    }

    // Try Official API
    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (resp.ok) {
        const data = await resp.json();
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, source: 'official', data })
        };
      }

      console.warn('Official API returned status', resp.status);
    } catch (err) {
      console.warn('Official API error', err.message);
    }

    // Fallback: try RoyaleAPI for rotation/gamemodes if available
    try {
      let royaleUrl;
      if (type === 'gamemodes') {
        royaleUrl = `https://api.royaleapi.com/gamemodes`;
      } else {
        royaleUrl = `https://api.royaleapi.com/rotation`; // some wrappers use /rotation
      }

      const r = await fetch(royaleUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (r.ok) {
        const data = await r.json();
        return { statusCode: 200, body: JSON.stringify({ success: true, source: 'royaleapi', data }) };
      }
    } catch (err) {
      console.warn('RoyaleAPI fallback error', err.message);
    }

    return { statusCode: 500, body: JSON.stringify({ success: false, error: 'All API sources failed' }) };

  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
