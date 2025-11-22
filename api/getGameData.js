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
    const type = req.query?.type || 'rotation';
    
    console.log('Game data request - type:', type);

    if (API_TOKEN) {
      try {
        const url = type === 'gamemodes' 
          ? 'https://api.brawlstars.com/v1/gamemodes'
          : 'https://api.brawlstars.com/v1/events/rotation';
          
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Parse the rotation data
          if (type === 'rotation' && data) {
            // The official API returns an array of events
            const events = Array.isArray(data) ? data : (data.items || data.events || []);
            const parsedEvents = events.map(event => ({
              modeName: event.event?.mode || 'Unknown Mode',
              mapName: event.event?.map || 'Unknown Map',
              startTime: event.startTime,
              endTime: event.endTime
            }));
            
            return res.status(200).json({ 
              success: true, 
              source: 'official', 
              data: parsedEvents 
            });
          }
          
          return res.status(200).json({ 
            success: true, 
            source: 'official', 
            data 
          });
        }
        
        console.log('API returned status:', response.status);
      } catch (err) {
        console.error('API error:', err);
      }
    }

    // Return mock rotation
    const mockRotation = [
      { modeName: 'Gem Grab', mapName: 'Hard Rock Mine' },
      { modeName: 'Solo Showdown', mapName: 'Feast or Famine' },
      { modeName: 'Brawl Ball', mapName: 'Pinhole Punt' },
      { modeName: 'Heist', mapName: 'Safe Zone' },
      { modeName: 'Bounty', mapName: 'Snake Prairie' },
      { modeName: 'Knockout', mapName: 'Goldarm Gulch' }
    ];
    
    return res.status(200).json({ 
      success: true, 
      source: 'mock', 
      data: mockRotation 
    });

  } catch (error) {
    console.error('Function error:', error);
    return res.status(500).json({ error: error.message });
  }
};
