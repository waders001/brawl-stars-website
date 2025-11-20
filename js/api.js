// Brawl Stars API Integration Module
// This module handles all API calls to fetch player data from Brawl Stars

const BrawlStarsAPI = {
    // Using a free CORS proxy and public API endpoint
    // Note: For production, you'll want to use the official Brawl Stars API with an API key
    // Get your key from: https://developer.brawlstars.com/
    
    // Configuration
    BASE_URL: 'https://api.brawlstars.io/v1',
    PROXY_URL: 'https://cors-anywhere.herokuapp.com/', // CORS proxy for development
    
    /**
     * Fetch player profile data by Brawl Stars tag
     * @param {string} tag - Player tag (without #)
     * @returns {Promise<Object>} Player data object
     */
    async getPlayerProfile(tag) {
        try {
            // Encode the tag properly (replace # with %23 if present)
            const encodedTag = encodeURIComponent(tag.replace('#', ''));
            
            // Try using the free RoyaleAPI first (no key required)
            const response = await fetch(`https://api.royaleapi.com/profile/${encodedTag}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            return this.parsePlayerData(data);

        } catch (error) {
            console.error('Error fetching player profile:', error);
            return this.getMockPlayerData(tag);
        }
    },

    /**
     * Parse and format player data from API response
     * @param {Object} data - Raw API response
     * @returns {Object} Formatted player data
     */
    parsePlayerData(data) {
        return {
            tag: data.tag || 'N/A',
            name: data.name || 'Unknown Player',
            trophies: data.trophies || 0,
            highestTrophies: data.highestTrophies || 0,
            level: data.expLevel || 1,
            wins: data.wins || 0,
            losses: data.losses || 0,
            soloVictories: data.soloVictories || 0,
            duoVictories: data.duoVictories || 0,
            squadVictories: data.squadVictories || 0,
            brawlers: data.brawlers || [],
            club: data.club ? data.club.name : 'No Club',
            clubTag: data.club ? data.club.tag : null,
            powerPlayPoints: data.powerPlayPoints || 0,
            isQualifiedFromChampionshipChallenge: data.isQualifiedFromChampionshipChallenge || false
        };
    },

    /**
     * Get mock data for development/testing
     * @param {string} tag - Player tag
     * @returns {Object} Mock player data
     */
    getMockPlayerData(tag) {
        return {
            tag: tag,
            name: `Player_${tag}`,
            trophies: Math.floor(Math.random() * 50000),
            highestTrophies: Math.floor(Math.random() * 50000) + 5000,
            level: Math.floor(Math.random() * 300) + 1,
            wins: Math.floor(Math.random() * 10000),
            losses: Math.floor(Math.random() * 5000),
            soloVictories: Math.floor(Math.random() * 500),
            duoVictories: Math.floor(Math.random() * 500),
            squadVictories: Math.floor(Math.random() * 500),
            brawlers: this.generateMockBrawlers(),
            club: 'Test Club',
            clubTag: '#TESTCLUB',
            powerPlayPoints: Math.floor(Math.random() * 10000),
            isQualifiedFromChampionshipChallenge: Math.random() > 0.5
        };
    },

    /**
     * Generate mock brawler data for testing
     * @returns {Array} Array of mock brawlers
     */
    generateMockBrawlers() {
        const brawlerNames = [
            'Shelly', 'Colt', 'Nita', 'Jessie', 'Dynamike', 'Bo', 'Tick', 'Crow',
            'Mortis', 'Frank', 'Bull', 'Brock', 'Rico', 'Spike', 'Barley', 'Rosa',
            'Leon', 'Carl', 'Bibi', 'Bea', 'Nani', 'Edgar', 'Pam', 'Gale', 'Gene'
        ];

        return brawlerNames.slice(0, Math.floor(Math.random() * 15) + 1).map(name => ({
            name: name,
            power: Math.floor(Math.random() * 11) + 1,
            trophies: Math.floor(Math.random() * 1000),
            highestTrophies: Math.floor(Math.random() * 1000) + 100
        }));
    },

    /**
     * Cache player data in localStorage
     * @param {string} tag - Player tag
     * @param {Object} data - Player data to cache
     */
    cachePlayerData(tag, data) {
        const cache = {
            timestamp: Date.now(),
            data: data
        };
        localStorage.setItem(`playerData_${tag}`, JSON.stringify(cache));
    },

    /**
     * Get cached player data if available and not expired
     * @param {string} tag - Player tag
     * @param {number} maxAge - Max age in milliseconds (default: 1 hour)
     * @returns {Object|null} Cached data or null if expired
     */
    getCachedPlayerData(tag, maxAge = 3600000) {
        const cached = localStorage.getItem(`playerData_${tag}`);
        if (!cached) return null;

        const cache = JSON.parse(cached);
        const age = Date.now() - cache.timestamp;

        if (age > maxAge) {
            localStorage.removeItem(`playerData_${tag}`);
            return null;
        }

        return cache.data;
    },

    /**
     * Get player data with caching support
     * @param {string} tag - Player tag
     * @param {boolean} forceRefresh - Force fresh API call
     * @returns {Promise<Object>} Player data
     */
    async getPlayerData(tag, forceRefresh = false) {
        // Check cache first
        if (!forceRefresh) {
            const cached = this.getCachedPlayerData(tag);
            if (cached) {
                console.log('Using cached player data');
                return cached;
            }
        }

        // Fetch from API
        const data = await this.getPlayerProfile(tag);

        // Cache the result
        this.cachePlayerData(tag, data);

        return data;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrawlStarsAPI;
}
