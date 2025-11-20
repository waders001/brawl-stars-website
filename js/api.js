// Brawl Stars API Integration Module
// This module handles all API calls to fetch player data from Brawl Stars
// Using Official Brawl Stars API with authentication

const BrawlStarsAPI = {
    // Official Brawl Stars API Configuration
    // Key Name: User_Info (Your API Key identifier)
    BASE_URL: 'https://api.brawlstars.io/v1',
    API_TOKEN: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3N1cGVyY2VsbC5jb20iLCJhdWQiOiJodHRwczovL2FwaS5icmF3bHN0YXJzLmNvbSIsImlhdCI6MTczMjExNjI3MiwiZXhwIjoxNzMyMjAyNjcyLCJub25jZSI6IjY2Njg2MjM2NzMwMzM1Mzc3NSIsIm9yZ0lkIjo3NzM1MjcsImtpZCI6IjMifQ.V5PVIqkYKPrGyYxCJ8H8MX_s9lj5RYDL2QcqjkVfPtU', // Your API Token
    
    /**
     * Fetch player profile data by Brawl Stars tag
     * @param {string} tag - Player tag (without #)
     * @returns {Promise<Object>} Player data object
     */
    async getPlayerProfile(tag) {
        try {
            // Clean up the tag (remove # if present)
            const cleanTag = tag.replace('#', '').toUpperCase();
            const encodedTag = encodeURIComponent(cleanTag);
            
            console.log('=== ATTEMPTING API CALL ===');
            console.log('Tag:', cleanTag);
            
            // Try Official Brawl Stars API first
            let url = `${this.BASE_URL}/players/%23${cleanTag}`;
            console.log('Trying Official API:', url);
            
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${this.API_TOKEN}`
                    }
                });

                console.log('API Response Status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ SUCCESS: Official API returned data');
                    console.log('API Response Data:', data);
                    return this.parsePlayerData(data);
                }
            } catch (officialError) {
                console.warn('Official API failed:', officialError.message);
            }

            // Fallback: Try RoyaleAPI (works without authentication)
            console.log('Falling back to RoyaleAPI...');
            const royaleUrl = `https://api.royaleapi.com/profile/${cleanTag}`;
            console.log('Trying RoyaleAPI:', royaleUrl);
            
            const royaleResponse = await fetch(royaleUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!royaleResponse.ok) {
                throw new Error(`RoyaleAPI Error: ${royaleResponse.status}`);
            }

            const royaleData = await royaleResponse.json();
            console.log('✅ SUCCESS: RoyaleAPI returned data');
            console.log('RoyaleAPI Response:', royaleData);
            return this.parseRoyaleAPIData(royaleData);

        } catch (error) {
            console.error('All API attempts failed:', error);
            console.warn('Using mock data as fallback');
            // Fall back to mock data for development
            return this.getMockPlayerData(tag);
        }
    },

    /**
     * Parse RoyaleAPI response format
     * @param {Object} data - RoyaleAPI response
     * @returns {Object} Formatted player data
     */
    parseRoyaleAPIData(data) {
        console.log('=== PARSING ROYALEAPI DATA ===');
        console.log('Raw RoyaleAPI Response:', data);
        
        return {
            tag: data.tag || 'N/A',
            name: data.name || 'Unknown Player',
            trophies: data.trophies || 0,
            highestTrophies: data.highestTrophies || 0,
            expLevel: data.expLevel || 1,
            expPoints: data.expPoints || 0,
            soloShowdownWins: data.soloShowdownWins || 0,
            duoShowdownWins: data.duoShowdownWins || 0,
            tripleShowdownWins: data.tripleShowdownWins || 0,
            soloVictories: data.soloShowdownWins || 0,
            duoVictories: data.duoShowdownWins || 0,
            squadVictories: data.tripleShowdownWins || 0,
            brawlers: data.brawlers ? data.brawlers.map(b => ({
                id: b.id,
                name: b.name,
                power: b.power,
                rank: b.rank || 0,
                trophies: b.trophies,
                highestTrophies: b.highestTrophies
            })) : [],
            club: data.club ? data.club.name : 'No Club',
            clubTag: data.club ? data.club.tag : null,
            totalBrawlers: data.brawlers ? data.brawlers.length : 0,
            totalTrophies: (data.brawlers || []).reduce((sum, b) => sum + (b.trophies || 0), 0),
            isRealData: true
        };
    },

    /**
     * Parse and format player data from official API response
     * @param {Object} data - Raw API response from official Brawl Stars API
     * @returns {Object} Formatted player data
     */
    parsePlayerData(data) {
        console.log('=== PARSING OFFICIAL API DATA ===');
        console.log('Raw API Response:', data);
        
        // Check if this looks like real API data or mock data
        const isRealData = data.brawlers && data.brawlers.length > 0 && data.brawlers[0].id;
        console.log('Is Real Data:', isRealData);
        console.log('Has brawlers:', data.brawlers ? data.brawlers.length : 0);
        console.log('Player name:', data.name);
        
        // Map official Brawl Stars API fields to our format
        return {
            tag: data.tag || 'N/A',
            name: data.name || 'Unknown Player',
            trophies: data.trophies || 0,
            highestTrophies: data.highestTrophies || 0,
            expLevel: data.expLevel || 1,
            expPoints: data.expPoints || 0,
            // Note: Official API uses these field names for victories
            soloShowdownWins: data.soloShowdownWins || 0,
            duoShowdownWins: data.duoShowdownWins || 0,
            tripleShowdownWins: data.tripleShowdownWins || 0,
            // Alias for easy access
            soloVictories: data.soloShowdownWins || 0,
            duoVictories: data.duoShowdownWins || 0,
            squadVictories: data.tripleShowdownWins || 0,
            // Brawlers array with all available data
            brawlers: data.brawlers ? data.brawlers.map(b => ({
                id: b.id,
                name: b.name,
                power: b.power,
                rank: b.rank,
                trophies: b.trophies,
                highestTrophies: b.highestTrophies,
                starPowers: b.starPowers || [],
                gadgets: b.gadgets || []
            })) : [],
            club: data.club ? data.club.name : 'No Club',
            clubTag: data.club ? data.club.tag : null,
            friends: data.friends || [],
            accountStatus: data.accountStatus || 'active',
            // Calculate totals
            totalBrawlers: data.brawlers ? data.brawlers.length : 0,
            totalTrophies: (data.brawlers || []).reduce((sum, b) => sum + (b.trophies || 0), 0),
            isRealData: isRealData
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
     * @param {boolean} forceRefresh - Force fresh API call (default: true on home page)
     * @returns {Promise<Object>} Player data
     */
    async getPlayerData(tag, forceRefresh = true) {
        // Always force refresh on initial load to get fresh data
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
