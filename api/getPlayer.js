module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const API_TOKEN = process.env.BRAWL_API_TOKEN;
    const playerTag = req.query?.tag;
    
    if (!playerTag) {
      return res.status(400).json({ error: 'Player tag is required' });
    }

    const cleanTag = playerTag.replace('#', '').toUpperCase();
    console.log('Fetching player:', cleanTag);

    if (API_TOKEN) {
      try {
        // Note: %23 is URL encoded # symbol
        const url = `https://api.brawlstars.com/v1/players/%23${cleanTag}`;
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
        
        console.log('API returned status:', response.status);
      } catch (err) {
        console.error('API error:', err);
      }
    }

    // Return mock data as fallback
    return res.status(200).json({ 
      success: true, 
      source: 'mock',
      data: {
        tag: `#${cleanTag}`,
        name: `Player_${cleanTag}`,
        trophies: 12500,
        highestTrophies: 13000,
        expLevel: 120,
        '3vs3Victories': 250,
        soloVictories: 180,
        duoVictories: 120,
        brawlers: []
      }
    });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: error.message });
  }
};