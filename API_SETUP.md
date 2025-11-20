# Brawl Stars API Integration Guide

## Overview
Your Brawl Stars website now includes API integration to pull real player data directly from Brawl Stars. The system displays player stats, trophies, brawlers, and victory counts on the home dashboard.

## Files Created/Updated

### New Files:
- **`js/api.js`** - Main API integration module with methods to fetch player data

### Updated Files:
- **`home.html`** - Added API script reference
- **`js/home.js`** - Updated `loadUserStats()` function to fetch real player data

## How It Works

### 1. **Player Login Flow**
```
User enters Brawl Stars tag → Stored in sessionStorage → Home page loads → API fetches data
```

### 2. **API Module (js/api.js)**
The `BrawlStarsAPI` object provides these key methods:

#### `getPlayerData(tag, forceRefresh = false)`
- Fetches player data with automatic caching
- Returns: Promise with player object
- Caches data for 1 hour to reduce API calls
- Set `forceRefresh = true` to bypass cache

#### `getPlayerProfile(tag)`
- Direct API call to fetch player profile
- Currently uses RoyaleAPI (no key required)
- Returns parsed player data object

#### Available Player Data Fields:
```javascript
{
  tag,                                    // Player tag
  name,                                   // Player name
  trophies,                              // Current trophies
  highestTrophies,                       // All-time highest
  level,                                 // Player level
  wins,                                  // Total wins
  losses,                                // Total losses
  soloVictories,                         // Solo Showdown wins
  duoVictories,                          // Duo Showdown wins
  squadVictories,                        // Squad Showdown wins
  brawlers: [                            // Array of owned brawlers
    {
      name,                              // Brawler name
      power,                             // Power level (1-11)
      trophies,                          // Brawler trophies
      highestTrophies                    // Brawler all-time high
    }
  ],
  club,                                  // Club name
  clubTag,                               // Club tag
  powerPlayPoints,                       // Power Play points
  isQualifiedFromChampionshipChallenge   // Championship status
}
```

## Current API Sources

### Primary: RoyaleAPI (Recommended for Development)
- **URL**: `https://api.royaleapi.com`
- **Requires**: No API key
- **Rate Limit**: 10-100 requests/second
- **Status**: Free & reliable
- **Advantage**: No key required, works immediately

### Alternative: Official Brawl Stars API
- **URL**: `https://api.brawlstars.io`
- **Requires**: API key from [developer.brawlstars.com](https://developer.brawlstars.com/)
- **Rate Limit**: Depends on tier
- **Status**: Official, most reliable
- **Advantage**: Direct from source, better reliability

### Fallback: Mock Data
- If API is unavailable, the system generates realistic mock data
- Perfect for testing and development
- Can be triggered by network errors

## Setup Instructions

### Option 1: Use Default RoyaleAPI (No Setup Required)
✅ Works out of the box - no configuration needed!

### Option 2: Use Official Brawl Stars API (Production)

1. **Get API Key**:
   - Visit [developer.brawlstars.com](https://developer.brawlstars.com/)
   - Sign in with Supercell ID
   - Create a new API key
   - Copy your API key

2. **Update `js/api.js`**:
   Replace this section in the `getPlayerProfile` method:
   ```javascript
   // Replace the RoyaleAPI fetch with:
   const response = await fetch(
       `https://api.brawlstars.io/v1/players/%23${encodedTag}`,
       {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer YOUR_API_KEY_HERE'
           }
       }
   );
   ```

3. **Never commit your API key to GitHub!**
   - Consider using environment variables
   - Or storing it in a `.env` file (add to `.gitignore`)

## Usage Examples

### In Your JavaScript:
```javascript
// Fetch player data
BrawlStarsAPI.getPlayerData('PLAYER_TAG')
    .then(player => {
        console.log(player.name);
        console.log(player.trophies);
        console.log(player.brawlers);
    });

// Force refresh (ignore cache)
BrawlStarsAPI.getPlayerData('PLAYER_TAG', true);

// Direct API call
BrawlStarsAPI.getPlayerProfile('PLAYER_TAG')
    .then(data => console.log(data));

// Access cached data
const cached = BrawlStarsAPI.getCachedPlayerData('PLAYER_TAG');
if (cached) {
    console.log('Using cached data:', cached);
}
```

## Current Implementation on Home Page

The `loadUserStats()` function in `home.js`:
1. ✅ Checks if user is logged in with a Brawl Stars tag
2. ✅ Shows "Loading..." state while fetching
3. ✅ Displays player name, trophies, highest brawler, and victories
4. ✅ Caches data to reduce API calls
5. ✅ Handles errors gracefully
6. ✅ Stores player data in sessionStorage for other pages

## Browser Console Testing

Test the API in your browser console:

```javascript
// Try fetching a player
BrawlStarsAPI.getPlayerData('ABC123').then(p => console.log(p));

// Clear cache for a player
localStorage.removeItem('playerData_ABC123');

// See all cached data
console.log(localStorage);
```

## Troubleshooting

### "Error: API Error 403"
- The player tag may be invalid
- Check the tag format (should be alphanumeric, no #)
- Verify the player exists in Brawl Stars

### "API Error: 404"
- Player tag not found in database
- Make sure the tag is correct
- Public profiles only (private profiles won't work)

### CORS Errors
- May occur in local development
- The code handles this by falling back to mock data
- Production should work fine with proper API key

### Rate Limiting
- If you see rate limit errors, wait a few seconds
- Consider implementing exponential backoff in production
- Use caching to reduce unnecessary API calls

## Next Steps

### 1. **Add Player Search**
- Allow users to search other players
- Display multiple player profiles

### 2. **Add Brawler Comparison**
- Compare brawlers across players
- Show power level progression

### 3. **Add Statistics Dashboard**
- Win/loss statistics
- Most played brawlers
- Game mode performance

### 4. **Add Real-time Updates**
- Auto-refresh stats every X minutes
- Show notification when stats change

### 5. **Add Club Information**
- Display club members
- Show club statistics and rankings

## Security Notes

⚠️ **Important**:
- Never commit API keys to GitHub
- Use environment variables for sensitive data
- Consider backend proxy for production (don't expose API key to client)
- Validate all user input
- Implement rate limiting on your backend

## References

- [Brawl Stars Developer Portal](https://developer.brawlstars.com/)
- [RoyaleAPI Documentation](https://docs.royaleapi.com/brawl-stars/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Support

If you encounter issues:
1. Check browser console for error messages
2. Test the API directly: `BrawlStarsAPI.getPlayerData('TAG')`
3. Verify internet connection
4. Ensure player tag is correct
5. Try clearing browser cache and localStorage

---
Last Updated: November 20, 2025
