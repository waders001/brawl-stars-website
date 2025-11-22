// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize navigation
    initNavigation();
    
    // Load all data
    loadAllData();
});

// Load all data (user stats, featured brawlers, game modes)
async function loadAllData() {
    const loginType = sessionStorage.getItem('loginType');
    
    // Always load game modes (for both guests and logged-in users)
    loadGameModes();
    
    if (loginType === 'tag') {
        // Load user-specific data
        const brawlTag = sessionStorage.getItem('brawlTag');
        const playerData = await loadUserStats();
        
        if (playerData) {
            // Load featured brawlers (top 5 by trophies)
            loadFeaturedBrawlers(playerData);
        }
    } else {
        // Show default featured brawlers for guests
        showDefaultFeaturedBrawlers();
    }
}

// Authentication Check
function checkAuthentication() {
    const loginType = sessionStorage.getItem('loginType');
    const profileName = document.getElementById('profileName');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!loginType) {
        // Not logged in, redirect to login
        window.location.href = 'index.html';
        return;
    }

    // Update profile display
    if (loginType === 'tag') {
        const brawlTag = sessionStorage.getItem('brawlTag');
        profileName.textContent = `#${brawlTag}`;
    } else {
        profileName.textContent = 'Guest';
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    });
}

// Load Featured Brawlers (User's Top 5)
function loadFeaturedBrawlers(playerData) {
    const brawlersSection = document.querySelector('.brawlers-section');
    const sectionHeader = brawlersSection.querySelector('.section-header');
    const brawlersGrid = document.querySelector('.brawlers-grid');
    
    if (!playerData || !playerData.brawlers || playerData.brawlers.length === 0) {
        showDefaultFeaturedBrawlers();
        return;
    }
    
    // Sort brawlers by trophies and get top 5
    const topBrawlers = [...playerData.brawlers]
        .sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
        .slice(0, 5);
    
    // Update section header
    sectionHeader.innerHTML = `
        <h2 class="section-title">Your Top Brawlers</h2>
        <p class="section-subtitle">Your highest trophy brawlers</p>
    `;
    
    // Clear and rebuild grid
    brawlersGrid.innerHTML = '';
    
    topBrawlers.forEach((brawler, index) => {
        const card = createBrawlerCard(brawler, index + 1);
        brawlersGrid.appendChild(card);
    });
    
    // Apply animations
    animateCards();
}

// Create Brawler Card
function createBrawlerCard(brawler, rank) {
    const card = document.createElement('div');
    card.className = 'brawler-card';
    
    // Determine rarity color
    const rarityColors = {
        'common': { bg: 'linear-gradient(135deg, #94A3B8, #64748B)', label: 'Common' },
        'rare': { bg: 'linear-gradient(135deg, #22C55E, #16A34A)', label: 'Rare' },
        'super_rare': { bg: 'linear-gradient(135deg, #3B82F6, #2563EB)', label: 'Super Rare' },
        'epic': { bg: 'linear-gradient(135deg, #A855F7, #9333EA)', label: 'Epic' },
        'mythic': { bg: 'linear-gradient(135deg, #EC4899, #DB2777)', label: 'Mythic' },
        'legendary': { bg: 'linear-gradient(135deg, #FBBF24, #F59E0B)', label: 'Legendary' },
        'chromatic': { bg: 'linear-gradient(135deg, #F97316, #EA580C)', label: 'Chromatic' }
    };
    
    // Try to determine rarity based on brawler name or use default
    const rarity = getBrawlerRarity(brawler.name) || 'rare';
    const rarityInfo = rarityColors[rarity] || rarityColors['rare'];
    
    card.innerHTML = `
        <div class="brawler-rank">#${rank}</div>
        <div class="brawler-image" style="background: ${rarityInfo.bg};">
            <span class="brawler-icon">${getBrawlerEmoji(brawler.name)}</span>
            <div class="brawler-trophies">
                <span class="trophy-icon">🏆</span>
                <span class="trophy-count">${brawler.trophies || 0}</span>
            </div>
        </div>
        <div class="brawler-info">
            <h3>${brawler.name}</h3>
            <span class="brawler-rarity ${rarity}">${rarityInfo.label}</span>
            <div class="brawler-stats">
                <div class="stat-item">
                    <span class="stat-label">Power</span>
                    <span class="stat-value">${brawler.power || 1}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Rank</span>
                    <span class="stat-value">${brawler.rank || 0}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Highest</span>
                    <span class="stat-value">${brawler.highestTrophies || 0}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add rank badge styles
    const rankDiv = card.querySelector('.brawler-rank');
    if (rank === 1) {
        rankDiv.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
        rankDiv.style.color = '#000';
    } else if (rank === 2) {
        rankDiv.style.background = 'linear-gradient(135deg, #C0C0C0, #808080)';
    } else if (rank === 3) {
        rankDiv.style.background = 'linear-gradient(135deg, #CD7F32, #8B4513)';
    }
    
    return card;
}

// Show default featured brawlers for guests
function showDefaultFeaturedBrawlers() {
    const brawlersSection = document.querySelector('.brawlers-section');
    const sectionHeader = brawlersSection.querySelector('.section-header');
    
    // Reset header for guests
    sectionHeader.innerHTML = `
        <h2 class="section-title">Featured Brawlers</h2>
        <p class="section-subtitle">Discover unique characters with special abilities</p>
    `;
    
    // The default brawlers are already in the HTML, just ensure they're visible
    animateCards();
}

// Helper function to get brawler emoji
function getBrawlerEmoji(name) {
    const emojiMap = {
        'Shelly': '🔫', 'Colt': '🔫', 'Bull': '🐂', 'Brock': '🚀',
        'Rico': '🤖', 'Spike': '🌵', 'Barley': '🍺', 'Jessie': '🔧',
        'Nita': '🐻', 'Dynamike': '💣', 'El Primo': '💪', 'Mortis': '🦇',
        'Crow': '🦅', 'Leon': '🦎', 'Sandy': '😴', 'Amber': '🔥',
        'Gale': '❄️', 'Surge': '⚡', 'Colette': '📖', 'Lou': '🍦',
        'Byron': '🧪', 'Edgar': '🗡️', 'Colonel Ruffs': '🐕', 'Stu': '🏍️',
        'Belle': '💰', 'Squeak': '💧', 'Grom': '🎃', 'Ash': '🗑️',
        'Meg': '🤖', 'Lola': '🎭', 'Fang': '👟', 'Eve': '👽',
        'Janet': '🎤', 'Bonnie': '💥', 'Otis': '🐙', 'Sam': '👊',
        'Gus': '👻', 'Buster': '🎬', 'Chester': '🎪', 'Gray': '🚪',
        'Mandy': '🍬', 'R-T': '📡', 'Willow': '🔮', 'Maisie': '🎯',
        'Hank': '🦐', 'Pearl': '🍪', 'Larry & Lawrie': '🎫', 'Angelo': '🐛',
        'Berry': '🍓', 'Draco': '🐉', 'Chuck': '🚂', 'Charlie': '🕷️',
        'Mico': '🎤', 'Kit': '🐱', 'Clancy': '🦀', 'Moe': '🐭',
        'Kenji': '⚔️', 'Lily': '🌸', 'Shade': '👤', 'Bo': '🏹',
        'Emz': '💜', 'Stu': '🏍️', '8-Bit': '🕹️', 'Rico': '🤖',
        'Darryl': '🛢️', 'Penny': '💰', 'Carl': '⛏️', 'Jacky': '🔨',
        'Piper': '☂️', 'Pam': '🔧', 'Frank': '🔨', 'Bibi': '⚾',
        'Bea': '🐝', 'Nani': '🤖', 'Gene': '🧞', 'Max': '⚡',
        'Mr. P': '🐧', 'Sprout': '🌱', 'Rosa': '🥊', 'Tick': '💣',
        'Poco': '🎸', 'Tara': '🔮', 'Buzz': '🦖', 'Griff': '💵'
    };
    
    return emojiMap[name] || '⭐';
}

// Helper function to determine brawler rarity
function getBrawlerRarity(name) {
    const rarities = {
        'common': ['Shelly'],
        'rare': ['Colt', 'Bull', 'Brock', 'El Primo', 'Barley', 'Poco', 'Rosa'],
        'super_rare': ['Rico', 'Darryl', 'Penny', 'Carl', 'Jacky', 'Gus'],
        'epic': ['Piper', 'Pam', 'Frank', 'Bibi', 'Bea', 'Nani', 'Edgar', 'Griff', 'Grom', 'Bonnie', 'Hank', 'Pearl', 'Angelo'],
        'mythic': ['Mortis', 'Tara', 'Gene', 'Max', 'Mr. P', 'Sprout', 'Byron', 'Squeak', 'Gray', 'Willow', 'Doug', 'Chuck', 'Charlie', 'Mico'],
        'legendary': ['Spike', 'Crow', 'Leon', 'Sandy', 'Amber', 'Meg', 'Chester', 'Cordelius', 'Kit', 'Draco'],
        'chromatic': ['Gale', 'Surge', 'Colette', 'Lou', 'Colonel Ruffs', 'Belle', 'Buzz', 'Ash', 'Lola', 'Fang', 'Eve', 'Janet', 'Otis', 'Sam', 'Buster', 'Mandy', 'R-T', 'Maisie', 'Lily', 'Berry', 'Clancy', 'Moe', 'Kenji', 'Shade']
    };
    
    for (const [rarity, brawlers] of Object.entries(rarities)) {
        if (brawlers.includes(name)) {
            return rarity;
        }
    }
    
    return 'rare'; // default
}

// Enhanced Load User Stats
async function loadUserStats() {
    const loginType = sessionStorage.getItem('loginType');
    const statsSubtitle = document.getElementById('statsSubtitle');
    const trophyCount = document.getElementById('trophyCount');
    const highestBrawler = document.getElementById('highestBrawler');
    const victoriesCount = document.getElementById('victoriesCount');

    if (loginType === 'guest') {
        statsSubtitle.textContent = 'Login with your tag to view your stats';
        trophyCount.textContent = 'Login Required';
        highestBrawler.textContent = 'Login Required';
        victoriesCount.textContent = 'Login Required';
        return null;
    }

    // If logged in with tag, fetch real data from API
    if (loginType === 'tag') {
        const brawlTag = sessionStorage.getItem('brawlTag');
        console.log('=== LOADING STATS FOR TAG:', brawlTag, '===');
        
        // Show loading state
        statsSubtitle.textContent = 'Loading your stats...';
        trophyCount.textContent = '⏳';
        highestBrawler.textContent = '⏳';
        victoriesCount.textContent = '⏳';

        try {
            // Force refresh to get latest data
            const playerData = await BrawlStarsAPI.getPlayerData(brawlTag, true);
            
            console.log('=== PLAYER DATA LOADED ===');
            console.log('Player:', playerData);
            
            // Update stats with proper formatting
            const displayName = playerData.name && playerData.name !== 'Unknown Player' 
                ? playerData.name 
                : `Player #${brawlTag}`;
            statsSubtitle.textContent = `${displayName}'s Performance`;
            
            // Update progress cards with more info
            updateProgressCards(playerData);
            
            // Store player data for use in other sections
            sessionStorage.setItem('playerData', JSON.stringify(playerData));
            
            return playerData;
            
        } catch (error) {
            console.error('❌ Error loading player stats:', error);
            statsSubtitle.textContent = 'Could not load stats';
            trophyCount.textContent = 'Error';
            highestBrawler.textContent = 'Error';
            victoriesCount.textContent = 'Error';
            return null;
        }
    }
    
    return null;
}

// Update Progress Cards with enhanced info
function updateProgressCards(playerData) {
    const statsGrid = document.querySelector('.stats-grid');
    
    // Create comprehensive stats display
    statsGrid.innerHTML = `
        <div class="progress-card">
            <div class="progress-icon">🏆</div>
            <div class="progress-info">
                <h3>Total Trophies</h3>
                <p class="progress-value">${(playerData.trophies || 0).toLocaleString()}</p>
                <p class="progress-detail">Highest: ${(playerData.highestTrophies || 0).toLocaleString()}</p>
            </div>
        </div>

        <div class="progress-card">
            <div class="progress-icon">⭐</div>
            <div class="progress-info">
                <h3>Experience Level</h3>
                <p class="progress-value">${playerData.expLevel || 1}</p>
                <p class="progress-detail">${(playerData.expPoints || 0).toLocaleString()} XP</p>
            </div>
        </div>

        <div class="progress-card">
            <div class="progress-icon">🎮</div>
            <div class="progress-info">
                <h3>Total Victories</h3>
                <p class="progress-value">${calculateTotalVictories(playerData).toLocaleString()}</p>
                <p class="progress-detail">Across all modes</p>
            </div>
        </div>

        <div class="progress-card">
            <div class="progress-icon">🥇</div>
            <div class="progress-info">
                <h3>Solo Showdown</h3>
                <p class="progress-value">${(playerData.soloShowdownWins || 0).toLocaleString()}</p>
                <p class="progress-detail">Wins</p>
            </div>
        </div>

        <div class="progress-card">
            <div class="progress-icon">🥈</div>
            <div class="progress-info">
                <h3>Duo Showdown</h3>
                <p class="progress-value">${(playerData.duoShowdownWins || 0).toLocaleString()}</p>
                <p class="progress-detail">Wins</p>
            </div>
        </div>

        <div class="progress-card">
            <div class="progress-icon">👥</div>
            <div class="progress-info">
                <h3>Brawlers Unlocked</h3>
                <p class="progress-value">${playerData.brawlers ? playerData.brawlers.length : 0}</p>
                <p class="progress-detail">Collection</p>
            </div>
        </div>
    `;
    
    // Apply animations to new cards
    animateCards();
}

// Calculate total victories
function calculateTotalVictories(playerData) {
    const soloWins = playerData.soloShowdownWins || 0;
    const duoWins = playerData.duoShowdownWins || 0;
    const squadWins = playerData.tripleShowdownWins || 0;
    return soloWins + duoWins + squadWins;
}

// Enhanced Load Game Modes with current rotation
async function loadGameModes() {
    const modesGrid = document.getElementById('modesGrid');
    if (!modesGrid) return;

    // Show loading state
    modesGrid.innerHTML = '<div class="modes-loading">Loading current game modes and maps...</div>';

    try {
        // Fetch rotation data
        const rotationData = await BrawlStarsAPI.getGameData('rotation');
        console.log('Rotation data:', rotationData);

        if (!rotationData) {
            throw new Error('No rotation data available');
        }

        // Parse the rotation data
        const events = BrawlStarsAPI.parseRotationData(rotationData);
        
        if (!events || events.length === 0) {
            throw new Error('No events in rotation');
        }

        // Clear loading state
        modesGrid.innerHTML = '';

        // Create cards for each event
        events.forEach(event => {
            const card = createGameModeCard(event);
            modesGrid.appendChild(card);
        });

        // Apply animations
        animateCards();
        
        console.log(`✅ Loaded ${events.length} game modes`);
        
    } catch (error) {
        console.error('Error loading game modes:', error);
        
        // Show fallback content
        modesGrid.innerHTML = `
            <div class="mode-card">
                <div class="mode-icon">💎</div>
                <h3>Gem Grab</h3>
                <p>Control the gem mine</p>
            </div>
            <div class="mode-card">
                <div class="mode-icon">⚡</div>
                <h3>Showdown</h3>
                <p>Battle royale madness</p>
            </div>
            <div class="mode-card">
                <div class="mode-icon">⚽</div>
                <h3>Brawl Ball</h3>
                <p>Score two goals to win</p>
            </div>
            <div class="mode-card">
                <div class="mode-icon">🏴</div>
                <h3>Heist</h3>
                <p>Crack the enemy safe</p>
            </div>
            <div class="mode-card">
                <div class="mode-icon">💥</div>
                <h3>Bounty</h3>
                <p>Collect stars from opponents</p>
            </div>
            <div class="mode-card">
                <div class="mode-icon">🎯</div>
                <h3>Siege</h3>
                <p>Build and destroy</p>
            </div>
        `;
        
        animateCards();
    }
}

// Create game mode card
function createGameModeCard(event) {
    const card = document.createElement('div');
    card.className = 'mode-card';
    
    // Get icon for game mode
    const modeIcon = getGameModeIcon(event.modeName);
    
    card.innerHTML = `
        <div class="mode-icon">${modeIcon}</div>
        <h3>${event.modeName}</h3>
        <p class="mode-map">${event.mapName}</p>
        ${event.raw && event.raw.startTime ? `
            <p class="mode-time">${formatTimeRemaining(event.raw.startTime, event.raw.endTime)}</p>
        ` : ''}
    `;
    
    return card;
}

// Get game mode icon
function getGameModeIcon(modeName) {
    const iconMap = {
        'Gem Grab': '💎',
        'Showdown': '⚡',
        'Solo Showdown': '⚡',
        'Duo Showdown': '👥',
        'Brawl Ball': '⚽',
        'Heist': '🏴',
        'Bounty': '💥',
        'Siege': '🎯',
        'Hot Zone': '🔥',
        'Knockout': '🥊',
        'Power League': '🏆',
        'Club League': '🎖️',
        'Big Game': '🦖',
        'Boss Fight': '🤖',
        'Robo Rumble': '🤖',
        'Super City Rampage': '👾',
        'Volleybrawl': '🏐',
        'Basket Brawl': '🏀',
        'Hold The Trophy': '🏆',
        'Trophy Thieves': '💰',
        'Wipeout': '💀',
        'Payload': '🚂',
        'Hunters': '🎯',
        'Last Stand': '🛡️'
    };
    
    return iconMap[modeName] || '🎮';
}

// Format time remaining
function formatTimeRemaining(startTime, endTime) {
    if (!endTime) return '';
    
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
        return `${days}d ${hours % 24}h remaining`;
    }
    return `${hours}h remaining`;
}

// Mobile Menu Functions (keeping existing code)
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', function() {
        closeMobileMenu();
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigation Active State (keeping existing code)
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navHeight = 70;
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    updateActiveLink(href);
                }
            }
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        if (current) {
            updateActiveLink(current);
        }
    });

    function updateActiveLink(href) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
}

// Enhanced animation function
function animateCards() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.brawler-card, .mode-card, .progress-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Handle window resize (keeping existing code)
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Prevent scrolling issues on iOS (keeping existing code)
document.addEventListener('touchmove', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('active')) {
        if (!e.target.closest('.mobile-menu')) {
            e.preventDefault();
        }
    }
}, { passive: false });