// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthentication();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize navigation
    initNavigation();
    
    // Load user stats if logged in
    loadUserStats();
});

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

// Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Open mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        closeMobileMenu();
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const navHeight = 70; // Height of fixed navbar
                    const targetPosition = target.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update active state
                    updateActiveLink(href);
                }
            }
        });
    });

    // Update active link on scroll
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

// Load User Stats
function loadUserStats() {
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
        return;
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

        // Fetch player data from API - ALWAYS force refresh
        BrawlStarsAPI.getPlayerData(brawlTag, true)
            .then(playerData => {
                console.log('=== STATS LOADED ===');
                console.log('Is Real Data:', playerData.isRealData);
                console.log('Player Name:', playerData.name);
                console.log('Full Player Data:', playerData);
                
                // Update stats with proper formatting
                statsSubtitle.textContent = `${playerData.name}'s Performance`;
                
                // Display trophies
                trophyCount.textContent = playerData.trophies.toLocaleString();
                console.log('Set trophies to:', playerData.trophies);
                
                // Get highest trophy brawler
                if (playerData.brawlers && playerData.brawlers.length > 0) {
                    // Sort brawlers by trophies and get the top one
                    const sortedBrawlers = [...playerData.brawlers].sort((a, b) => 
                        (b.trophies || 0) - (a.trophies || 0)
                    );
                    const topBrawler = sortedBrawlers[0];
                    
                    highestBrawler.textContent = `${topBrawler.name} (${topBrawler.trophies || 0} 🏆)`;
                    console.log('Set highest brawler to:', topBrawler);
                } else {
                    highestBrawler.textContent = 'No brawlers unlocked';
                    console.log('No brawlers available');
                }
                
                // Calculate total victories from showdown wins
                const soloWins = playerData.soloShowdownWins || 0;
                const duoWins = playerData.duoShowdownWins || 0;
                const squadWins = playerData.tripleShowdownWins || 0;
                const totalVictories = soloWins + duoWins + squadWins;
                
                console.log('Victory breakdown - Solo:', soloWins, 'Duo:', duoWins, 'Squad:', squadWins, 'Total:', totalVictories);
                victoriesCount.textContent = totalVictories.toLocaleString();

                // Store player data for use in other sections
                sessionStorage.setItem('playerData', JSON.stringify(playerData));
                
                // Display data status
                if (playerData.isRealData) {
                    console.log('✅ DISPLAYING REAL API DATA');
                } else {
                    console.warn('⚠️ DISPLAYING MOCK DATA (API call may have failed)');
                }
            })
            .catch(error => {
                console.error('Error loading player stats:', error);
                statsSubtitle.textContent = 'Could not load stats. Check browser console for details.';
                trophyCount.textContent = 'Error';
                highestBrawler.textContent = 'Error';
                victoriesCount.textContent = 'Error';
            });
    }
}

// Card Animations on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
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

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Close mobile menu if screen becomes large
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
});

// Prevent scrolling issues on iOS
document.addEventListener('touchmove', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.classList.contains('active')) {
        if (!e.target.closest('.mobile-menu')) {
            e.preventDefault();
        }
    }
}, { passive: false });
