// Netlify Function to fetch Brawl Stars player data
// This runs on the server, so no CORS issues!

const API_TOKEN = process.env.BRAWL_API_TOKEN || null;

exports.handler = async (event) => {
  try {
    // Get player tag from query parameters
    const playerTag = event.queryStringParameters?.tag;
    
    if (!playerTag) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Player tag is required' })
      };
    }

    const cleanTag = playerTag.replace('#', '').toUpperCase();
    console.log('Fetching data for player:', cleanTag);

    // Try Official Brawl Stars API first
    try {
      const url = `https://api.brawlstars.io/v1/players/%23${cleanTag}`;
      console.log('Trying Official API:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Official API success');
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            source: 'official',
            data: data
          })
        };
      }
    } catch (error) {
      console.warn('Official API failed:', error.message);
    }

    // Fallback: Try RoyaleAPI
    try {
      const royaleUrl = `https://api.royaleapi.com/profile/${cleanTag}`;
      console.log('Trying RoyaleAPI:', royaleUrl);

      const royaleResponse = await fetch(royaleUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (royaleResponse.ok) {
        const data = await royaleResponse.json();
        console.log('✅ RoyaleAPI success');
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            source: 'royaleapi',
            data: data
          })
        };
      }
    } catch (error) {
      console.warn('RoyaleAPI failed:', error.message);
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'All API sources failed'
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
