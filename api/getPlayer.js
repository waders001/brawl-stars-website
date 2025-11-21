// Vercel Serverless function to fetch Brawl Stars player data
// Expects environment variable BRAWL_API_TOKEN to be set in Vercel dashboard

const API_TOKEN = process.env.BRAWL_API_TOKEN || null;

module.exports = async (req, res) => {
  try {
    const playerTag = req.query?.tag || (req.body && req.body.tag);
    if (!playerTag) {
      return res.status(400).json({ error: 'Player tag is required' });
    }

    const cleanTag = playerTag.replace('#', '').toUpperCase();
    console.log('Fetching player:', cleanTag);

    // Try Official API if token available
    if (API_TOKEN) {
      try {
        const url = `https://api.brawlstars.io/v1/players/%23${cleanTag}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          return res.status(200).json({ success: true, source: 'official', data });
        }
        console.warn('Official API returned status', response.status);
      } catch (err) {
        console.warn('Official API error:', err.message || err);
      }
    } else {
      console.warn('No BRAWL_API_TOKEN configured; skipping official API');
    }

    // Fallback to RoyaleAPI
    try {
      const royaleUrl = `https://api.royaleapi.com/profile/${cleanTag}`;
      const royaleResp = await fetch(royaleUrl, { method: 'GET', headers: { 'Accept': 'application/json' } });
      if (royaleResp.ok) {
        const data = await royaleResp.json();
        return res.status(200).json({ success: true, source: 'royaleapi', data });
      }
      console.warn('RoyaleAPI returned status', royaleResp.status);
    } catch (err) {
      console.warn('RoyaleAPI error:', err.message || err);
    }

    return res.status(500).json({ success: false, error: 'All API sources failed' });
  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: error.message || String(error) });
  }
};
