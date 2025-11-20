// Brawler Data - Stats at Power Level 11
const brawlersData = [
    // STARTER BRAWLERS
    {
        name: "Shelly",
        image: "Brawler Portraits/shelly_portrait.png",
        rarity: "starter",
        health: 4200,
        damage: "360 x5",
        range: "Medium (7 tiles)",
        reload: "1.5s",
        speed: "Normal",
        class: "Fighter",
        description: "Shelly's boomstick blasts the other team with buckshot. Her Super destroys cover and keeps her opponents at a distance!",
        super: "Shelly's Super shoots a bunch of shells dealing massive damage. The main purpose of this Super is to destroy cover and to push back enemies."
    },
    {
        name: "Colt",
        image: "Brawler Portraits/colt_portrait.png",
        rarity: "rare",
        health: 2800,
        damage: "360 x6",
        range: "Long (9 tiles)",
        reload: "1.4s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Colt fires an accurate burst of bullets from his dual revolvers. His Super shreds cover and extends the bullet barrage!",
        super: "Colt rattles off a massive burst of 12 bullets that shoot extra far and destroy cover."
    },
    {
        name: "Nita",
        image: "Brawler Portraits/nita_portrait.png",
        rarity: "rare",
        health: 4200,
        damage: "980",
        range: "Medium (7.66 tiles)",
        reload: "1.25s",
        speed: "Normal",
        class: "Fighter",
        description: "Nita strikes her enemies with a tremor and can summon a massive bear to maul them!",
        super: "Nita summons the spawn of Bruce, a big bear with high health that attacks enemies."
    },
    {
        name: "Bull",
        image: "Brawler Portraits/bull_portrait.png",
        rarity: "rare",
        health: 7000,
        damage: "420 x5",
        range: "Short (7 tiles)",
        reload: "1.6s",
        speed: "Normal",
        class: "Tank",
        description: "Bull deals massive damage up close with his shotgun. His Super is a reckless charging ram!",
        super: "Bull charges a long distance, destroying obstacles and damaging enemies in his path."
    },
    {
        name: "Brock",
        image: "Brawler Portraits/brock_portrait.png",
        rarity: "rare",
        health: 2800,
        damage: "1540",
        range: "Very Long (10 tiles)",
        reload: "2.0s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Brock fires a rocket from a custom launcher. His Super is a rocket barrage that demolishes cover!",
        super: "Brock fires a barrage of rockets that demolish cover and damage enemies caught in the area."
    },
    {
        name: "El Primo",
        image: "Brawler Portraits/el_primo_portrait.png",
        rarity: "rare",
        health: 7800,
        damage: "460 x4",
        range: "Melee",
        reload: "0.8s",
        speed: "Fast",
        class: "Tank",
        description: "El Primo throws punches with his fists of fury! His Super is a leaping elbow drop that destroys cover and deals damage.",
        super: "El Primo jumps into the air and crashes down on enemies, dealing damage to nearby opponents."
    },
    {
        name: "Barley",
        image: "Brawler Portraits/barley_portrait.png",
        rarity: "rare",
        health: 2800,
        damage: "1120",
        range: "Medium-Long",
        reload: "2.1s",
        speed: "Normal",
        class: "Thrower",
        description: "Barley lobs bottles that leave a puddle of damaging liquid. His Super is a big barrage of burning bottles!",
        super: "Barley throws a barrage of fiery bottles, creating a large area of burning liquid."
    },
    {
        name: "Poco",
        image: "Brawler Portraits/poco_portrait.png",
        rarity: "rare",
        health: 4200,
        damage: "840",
        range: "Medium",
        reload: "1.3s",
        speed: "Normal",
        class: "Support",
        description: "Poco fires damaging sound waves at enemies. His Super can heal both himself and nearby teammates!",
        super: "Poco plays a healing melody that heals himself and teammates in a large area."
    },
    {
        name: "Rosa",
        image: "Brawler Portraits/rosa_portrait.png",
        rarity: "rare",
        health: 5600,
        damage: "560 x3",
        range: "Melee",
        reload: "1.2s",
        speed: "Normal",
        class: "Tank",
        description: "Rosa throws a powerful one-two punch. Her Super shields her while she gets in your face!",
        super: "Rosa's Super provides her with tough, damage-reducing shield."
    },
    
    // SUPER RARE BRAWLERS
    {
        name: "Jessie",
        image: "Brawler Portraits/jessie_portrait.png",
        rarity: "super-rare",
        health: 3600,
        damage: "1120",
        range: "Long",
        reload: "1.4s",
        speed: "Normal",
        class: "Artillery",
        description: "Jessie's attack can bounce between enemies, and her turret shoots wherever she shoots!",
        super: "Jessie summons a gun turret that automatically locks onto enemies."
    },
    {
        name: "Dynamike",
        image: "Brawler Portraits/dynamike_portrait.png",
        rarity: "super-rare",
        health: 3200,
        damage: "1260 x2",
        range: "Medium-Long",
        reload: "1.8s",
        speed: "Normal",
        class: "Thrower",
        description: "Dynamike lobs two explosive sticks of dynamite. His Super is a barrel full of dynamite that blows up cover!",
        super: "Dynamike lobs a barrel full of TNT that explodes and destroys cover in a large area."
    },
    {
        name: "Penny",
        image: "Brawler Portraits/penny_portrait.png",
        rarity: "super-rare",
        health: 3600,
        damage: "1120",
        range: "Long",
        reload: "1.4s",
        speed: "Normal",
        class: "Artillery",
        description: "Penny's cannon shoots bags of coins. Her Super deploys a cannon that shoots at enemies!",
        super: "Penny sets up a cannon that automatically fires cannonballs at enemies."
    },
    {
        name: "Rico",
        image: "Brawler Portraits/rico_portrait.png",
        rarity: "super-rare",
        health: 3000,
        damage: "448 x5",
        range: "Long",
        reload: "1.5s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Rico's bullets bounce off walls, gaining range. His Super is a long burst of bouncy bullets!",
        super: "Rico fires a long burst of bouncy bullets that ricochet off walls."
    },
    {
        name: "Darryl",
        image: "Brawler Portraits/darryl_portrait.png",
        rarity: "super-rare",
        health: 6400,
        damage: "280 x10",
        range: "Short",
        reload: "1.7s",
        speed: "Normal",
        class: "Tank",
        description: "Darryl's double shotgun attacks deal massive damage up close. His Super is a reckless roll inside a bouncing barrel!",
        super: "Darryl rolls forward in his barrel, gaining temporary shield after rolling."
    },
    {
        name: "Carl",
        image: "Brawler Portraits/carl_portrait.png",
        rarity: "super-rare",
        health: 4400,
        damage: "840",
        range: "Medium-Long",
        reload: "1.2s",
        speed: "Normal",
        class: "Damage Dealer",
        description: "Carl throws his pickaxe like a boomerang. His Super is a bouncing spin where he throws his pickaxe multiple times!",
        super: "Carl throws his pickaxe and spins around, dealing massive damage to nearby enemies."
    },
    {
        name: "Jacky",
        image: "Brawler Portraits/jacky_portrait.png",
        rarity: "super-rare",
        health: 6000,
        damage: "1680",
        range: "Very Short",
        reload: "1.8s",
        speed: "Fast",
        class: "Tank",
        description: "Jacky's drill strikes a massive area and pulls enemies towards her. Her Super sends out shock waves!",
        super: "Jacky sends out seismic shockwaves that pull enemies towards her and disrupt their movement."
    },

    // EPIC BRAWLERS
    {
        name: "Piper",
        image: "Brawler Portraits/piper_portrait.png",
        rarity: "epic",
        health: 2800,
        damage: "2128 (max range)",
        range: "Very Long (10 tiles)",
        reload: "2.3s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Piper fires a sniper shot with incredible range. Her Super drops grenades at her feet as she leaps away!",
        super: "Piper hops away leaving a burst of grenades behind to deal damage."
    },
    {
        name: "Pam",
        image: "Brawler Portraits/pam_portrait.png",
        rarity: "epic",
        health: 5600,
        damage: "280 x9",
        range: "Long",
        reload: "1.4s",
        speed: "Normal",
        class: "Support",
        description: "Mama's got a brand new bag! Pam's scrapstorm can hit multiple enemies. Her Super is a healing turret!",
        super: "Pam deploys a healing station that restores health to teammates over time."
    },
    {
        name: "Frank",
        image: "Brawler Portraits/frank_portrait.png",
        rarity: "epic",
        health: 8400,
        damage: "1680",
        range: "Medium",
        reload: "1.5s",
        speed: "Slow",
        class: "Tank",
        description: "Frank swings his hammer dealing massive damage with a wind-up. His Super stuns enemies caught in a huge area!",
        super: "Frank smashes the ground, dealing damage and stunning all enemies in a massive area."
    },
    {
        name: "Bibi",
        image: "Brawler Portraits/bibi_portrait.png",
        rarity: "epic",
        health: 5200,
        damage: "1400",
        range: "Short",
        reload: "0.9s",
        speed: "Very Fast",
        class: "Fighter",
        description: "Bibi swings her bat for a home run! Her Super is a bouncing bubble that knocks back enemies.",
        super: "Bibi hits a bouncing bubble that knocks back enemies on contact."
    },
    {
        name: "Bea",
        image: "Brawler Portraits/bea_portrait.png",
        rarity: "epic",
        health: 2800,
        damage: "1120 / 2240 (charged)",
        range: "Very Long (10 tiles)",
        reload: "0.9s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Bea fires a long-range shot that gains a huge damage boost when hitting an enemy!",
        super: "Bea throws her nest that slows down enemies caught in the area."
    },
    {
        name: "Nani",
        image: "Brawler Portraits/nani_portrait.png",
        rarity: "epic",
        health: 2800,
        damage: "560 x3",
        range: "Long",
        reload: "1.6s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Nani shoots 3 orbs that deal more damage the farther they travel. Her Super is a remote-controlled robot!",
        super: "Nani controls Peep, a remote-controlled robot that explodes on contact or command."
    },
    {
        name: "8-Bit",
        image: "Brawler Portraits/8-bit_portrait.png",
        rarity: "epic",
        health: 6000,
        damage: "448 x6",
        range: "Long",
        reload: "1.5s",
        speed: "Very Slow",
        class: "Sharpshooter",
        description: "8-Bit shoots a burst of Blaster Beams. His Super deploys a turret that boosts teammates' damage!",
        super: "8-Bit deploys a damage-boosting turret that increases all teammates' damage output in its range."
    },
    {
        name: "Emz",
        image: "Brawler Portraits/emz_portrait.png",
        rarity: "epic",
        health: 4200,
        damage: "520 x5 (lingering)",
        range: "Long",
        reload: "1.8s",
        speed: "Normal",
        class: "Fighter",
        description: "Emz sprays hairspray that deals damage over time. Her Super pushes away and damages nearby enemies!",
        super: "Emz pushes enemies away with a burst of hairspray and slows them down."
    },
    {
        name: "Stu",
        image: "Brawler Portraits/stu_portrait.png",
        rarity: "epic",
        health: 3200,
        damage: "560 x2",
        range: "Medium-Long",
        reload: "1.3s",
        speed: "Very Fast",
        class: "Assassin",
        description: "Stu shoots two bullets that can light enemies on fire. His Super is a nitro-boost dash!",
        super: "Stu dashes forward leaving a trail of fire, charging his Super automatically with hits."
    },
    {
        name: "Colette",
        image: "Brawler Portraits/colette_portrait.png",
        rarity: "epic",
        health: 3600,
        damage: "37% enemy HP",
        range: "Long",
        reload: "1.2s",
        speed: "Normal",
        class: "Damage Dealer",
        description: "Colette taxes her opponents by dealing damage based on their current health. Her Super dashes through enemies twice!",
        super: "Colette dashes through enemies, dealing percentage-based damage on the way forward and back."
    },
    {
        name: "Belle",
        image: "Brawler Portraits/belle_portrait.png",
        rarity: "epic",
        health: 3600,
        damage: "1120 (bounces)",
        range: "Very Long",
        reload: "1.7s",
        speed: "Normal",
        class: "Sharpshooter",
        description: "Belle shoots an electro-bolt that bounces between enemies. Her Super marks enemies for extra damage!",
        super: "Belle marks an enemy, making them take additional damage from all sources."
    },

    // MYTHIC BRAWLERS
    {
        name: "Mortis",
        image: "Brawler Portraits/mortis_portrait.png",
        rarity: "mythic",
        health: 4800,
        damage: "1400",
        range: "Melee (dash)",
        reload: "2.5s",
        speed: "Very Fast",
        class: "Assassin",
        description: "Mortis dashes forward with each attack, swinging his shovel. His Super sends out bats that drain life!",
        super: "Mortis sends out a swarm of vampire bats that damage enemies and heal him."
    },
    {
        name: "Tara",
        image: "Brawler Portraits/tara_portrait.png",
        rarity: "mythic",
        health: 3800,
        damage: "560 x3",
        range: "Medium",
        reload: "1.8s",
        speed: "Normal",
        class: "Skirmisher",
        description: "Tara throws tarot cards at enemies. Her Super pulls them into a black hole!",
        super: "Tara summons a black hole that pulls enemies towards the center and deals damage."
    },
    {
        name: "Gene",
        image: "Brawler Portraits/gene_portrait.png",
        rarity: "mythic",
        health: 3800,
        damage: "1120",
        range: "Long",
        reload: "1.6s",
        speed: "Normal",
        class: "Support",
        description: "Gene uses his magic lamp to split projectiles. His Super pulls enemies across the battlefield!",
        super: "Gene's Magic Hand grabs the first enemy it hits and pulls them towards Gene."
    },
    {
        name: "Max",
        image: "Brawler Portraits/max_portrait.png",
        rarity: "mythic",
        health: 3600,
        damage: "320 x4",
        range: "Long",
        reload: "1.5s",
        speed: "Very Fast",
        class: "Support",
        description: "Max fires a quick burst of shots from her blasters. Her Super speeds up her and all nearby teammates!",
        super: "Max boosts her and teammates' movement speed for a short duration."
    },
    {
        name: "Byron",
        image: "Brawler Portraits/byron_portrait.png",
        rarity: "mythic",
        health: 2800,
        damage: "560 x3",
        range: "Very Long",
        reload: "1.2s",
        speed: "Normal",
        class: "Support",
        description: "Byron throws vials that heal teammates and damage enemies! His Super shoots out a massive dart!",
        super: "Byron shoots a large shot that deals high damage to enemies or healing to allies."
    },
    {
        name: "Squeak",
        image: "Brawler Portraits/squeak_portrait.png",
        rarity: "mythic",
        health: 3600,
        damage: "1400",
        range: "Long",
        reload: "1.8s",
        speed: "Normal",
        class: "Artillery",
        description: "Squeak lobs sticky blobs that stick to enemies and explode! His Super is a huge sticky bomb!",
        super: "Squeak throws a big blob that sticks to the ground and explodes after a delay, dealing massive damage."
    },
    {
        name: "Surge",
        image: "Brawler Portraits/surge_portrait.png",
        rarity: "mythic",
        health: 3600,
        damage: "1260",
        range: "Long",
        reload: "1.6s",
        speed: "Normal",
        class: "Assassin",
        description: "Surge splits his shots and upgrades himself up to 3 stages with each Super!",
        super: "Surge teleports and upgrades himself, gaining new abilities at each stage."
    },

    // LEGENDARY BRAWLERS
    {
        name: "Spike",
        image: "Brawler Portraits/spike_portrait.png",
        rarity: "legendary",
        health: 3200,
        damage: "560 x6",
        range: "Long",
        reload: "1.8s",
        speed: "Normal",
        class: "Damage Dealer",
        description: "Spike throws cactus grenades that explode and shoot needles. His Super slows down enemies!",
        super: "Spike lobs a cactus grenade that slows down all enemies within its area."
    },
    {
        name: "Crow",
        image: "Brawler Portraits/crow_portrait.png",
        rarity: "legendary",
        health: 3200,
        damage: "480 x3 (+poison)",
        range: "Long",
        reload: "1.4s",
        speed: "Very Fast",
        class: "Assassin",
        description: "Crow throws poisoned daggers at his enemies. His Super is a jump with poison bombs!",
        super: "Crow leaps into the air, throwing daggers on the way down and landing with poisonous bombs."
    },
    {
        name: "Leon",
        image: "Brawler Portraits/leon_portrait.png",
        rarity: "legendary",
        health: 3600,
        damage: "520 x4",
        range: "Short-Long",
        reload: "1.7s",
        speed: "Very Fast",
        class: "Assassin",
        description: "Leon shoots a quick salvo of blades. His Super trick is a smoke bomb that makes him invisible!",
        super: "Leon uses a smoke bomb to become invisible for a short duration."
    },
    {
        name: "Sandy",
        image: "Brawler Portraits/sandy_portrait.png",
        rarity: "legendary",
        health: 3600,
        damage: "840 x3",
        range: "Medium-Long",
        reload: "1.4s",
        speed: "Normal",
        class: "Support",
        description: "Sandy shoots a piercing sand wave. His Super hides teammates in a sandstorm!",
        super: "Sandy creates a sandstorm that hides him and teammates from enemies."
    },
    {
        name: "Amber",
        image: "Brawler Portraits/amber_portrait.png",
        rarity: "legendary",
        health: 3400,
        damage: "360 (continuous)",
        range: "Long",
        reload: "Continuous",
        speed: "Normal",
        class: "Damage Dealer",
        description: "Amber has always been a firebug. She loves to light up the world and any opponents that come at her!",
        super: "Amber throws a torch that leaves a flaming area, damaging enemies over time."
    },
    {
        name: "Meg",
        image: "Brawler Portraits/meg_portrait.png",
        rarity: "legendary",
        health: "3200 / 5600 (Mecha)",
        damage: "560 / 1120 (Mecha)",
        range: "Long",
        reload: "1.3s / 1.8s",
        speed: "Normal",
        class: "Damage Dealer",
        description: "Meg starts in her Mecha suit. When destroyed, she returns to basic form but can use her Super to get back in!",
        super: "Meg calls in her Mecha suit, dramatically increasing her health and damage output."
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    initMobileMenu();
    loadBrawlers();
    initializeFilters();
    initializeSearch();
});

// Authentication
function checkAuthentication() {
    const loginType = sessionStorage.getItem('loginType');
    const profileName = document.getElementById('profileName');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!loginType) {
        window.location.href = 'index.html';
        return;
    }

    if (loginType === 'tag') {
        const brawlTag = sessionStorage.getItem('brawlTag');
        profileName.textContent = `#${brawlTag}`;
    } else {
        profileName.textContent = 'Guest';
    }

    logoutBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        closeMobileMenu();
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => closeMobileMenu());
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Load Brawlers
function loadBrawlers(filterRarity = 'all', searchQuery = '') {
    const grid = document.getElementById('brawlersGrid');
    const noResults = document.getElementById('noResults');
    grid.innerHTML = '';

    let filteredBrawlers = brawlersData;

    // Filter by rarity
    if (filterRarity !== 'all') {
        filteredBrawlers = filteredBrawlers.filter(b => b.rarity === filterRarity);
    }

    // Filter by search
    if (searchQuery) {
        filteredBrawlers = filteredBrawlers.filter(b => 
            b.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Update count
    document.getElementById('brawlerCount').textContent = filteredBrawlers.length;

    // Show/hide no results
    if (filteredBrawlers.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    // Create cards
    filteredBrawlers.forEach((brawler, index) => {
        const card = createBrawlerCard(brawler, index);
        grid.appendChild(card);
    });
}

// Create Brawler Card
function createBrawlerCard(brawler, index) {
    const card = document.createElement('div');
    card.className = 'brawler-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    const rarityColors = {
        'starter': '#22C55E',
        'rare': '#22C55E',
        'super-rare': '#3B82F6',
        'epic': '#A855F7',
        'mythic': '#EC4899',
        'legendary': '#FBBF24'
    };

    card.innerHTML = `
        <div class="brawler-portrait">
            <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='https://via.placeholder.com/150?text=${brawler.name}'">
        </div>
        <div class="brawler-info">
            <h3>${brawler.name}</h3>
            <span class="brawler-rarity ${brawler.rarity}" style="background: ${rarityColors[brawler.rarity]}22; color: ${rarityColors[brawler.rarity]}">
                ${brawler.rarity.replace('-', ' ').toUpperCase()}
            </span>
            <div class="brawler-stats-preview">
                <div class="stat-item">
                    <span class="stat-icon">❤️</span>
                    <span class="stat-value">${brawler.health}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">⚔️</span>
                    <span class="stat-value">${brawler.damage}</span>
                </div>
            </div>
        </div>
        <div class="card-hover-overlay">
            <button class="view-details-btn" onclick="openBrawlerModal('${brawler.name}')">
                View Details
            </button>
        </div>
    `;

    return card;
}

// Initialize Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const rarity = this.dataset.rarity;
            const searchQuery = document.getElementById('searchInput').value;
            loadBrawlers(rarity, searchQuery);
        });
    });
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function(e) {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.rarity;
        loadBrawlers(activeFilter, e.target.value);
    });
}

// Reset Filters
function resetFilters() {
    document.querySelector('.filter-btn[data-rarity="all"]').click();
    document.getElementById('searchInput').value = '';
}

// Open Brawler Modal
function openBrawlerModal(name) {
    const brawler = brawlersData.find(b => b.name === name);
    if (!brawler) return;

    const modal = document.getElementById('brawlerModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div class="modal-header">
            <div class="modal-portrait">
                <img src="${brawler.image}" alt="${brawler.name}" onerror="this.src='https://via.placeholder.com/200?text=${brawler.name}'">
            </div>
            <div class="modal-title">
                <h2>${brawler.name}</h2>
                <span class="brawler-rarity ${brawler.rarity}">${brawler.rarity.replace('-', ' ').toUpperCase()}</span>
                <p class="brawler-class">${brawler.class}</p>
            </div>
        </div>
        
        <div class="modal-description">
            <p>${brawler.description}</p>
        </div>

        <div class="modal-stats">
            <h3>Stats (Power Level 11)</h3>
            <div class="stats-grid">
                <div class="stat-box">
                    <span class="stat-label">Health</span>
                    <span class="stat-value">❤️ ${brawler.health}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Damage</span>
                    <span class="stat-value">⚔️ ${brawler.damage}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Range</span>
                    <span class="stat-value">📏 ${brawler.range}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Reload Speed</span>
                    <span class="stat-value">⏱️ ${brawler.reload}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Movement Speed</span>
                    <span class="stat-value">🏃 ${brawler.speed}</span>
                </div>
                <div class="stat-box">
                    <span class="stat-label">Class</span>
                    <span class="stat-value">🎯 ${brawler.class}</span>
                </div>
            </div>
        </div>

        <div class="modal-super">
            <h3>Super Ability</h3>
            <p>${brawler.super}</p>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);

function closeModal() {
    document.getElementById('brawlerModal').classList.remove('active');
    document.body.style.overflow = '';
}