// Vercel Serverless function to fetch game rotation / gamemodes
// Uses BRAWL_API_TOKEN from environment when available

const API_TOKEN = process.env.BRAWL_API_TOKEN || null;

module.exports = async (req, res) => {
  try {
    const type = (req.query?.type) || (req.body && req.body.type) || 'rotation';
    console.log('getGameData type:', type);

    let url;
    if (type === 'gamemodes') url = `https://api.brawlstars.io/v1/gamemodes`;
    else url = `https://api.brawlstars.io/v1/events/rotation`;

    // Try official API when token is present
    if (API_TOKEN) {
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
          return res.status(200).json({ success: true, source: 'official', data });
        }
        console.warn('Official API returned', resp.status);
      } catch (err) {
        console.warn('Official API error:', err.message || err);
      }
    } else {
      console.warn('No BRAWL_API_TOKEN configured; skipping official API');
    }

    // Fallback to RoyaleAPI
    try {
      let royaleUrl;
      if (type === 'gamemodes') royaleUrl = `https://api.royaleapi.com/gamemodes`;
      else royaleUrl = `https://api.royaleapi.com/rotation`;

      const r = await fetch(royaleUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (r.ok) {
        const data = await r.json();
        return res.status(200).json({ success: true, source: 'royaleapi', data });
      }
      console.warn('RoyaleAPI returned', r.status);
    } catch (err) {
      console.warn('RoyaleAPI error:', err.message || err);
    }

    return res.status(500).json({ success: false, error: 'All API sources failed' });
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: error.message || String(error) });
  }
};
