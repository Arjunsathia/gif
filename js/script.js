const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const overlay = document.getElementById('celebrationOverlay');
const closeBtn = document.getElementById('closeOverlay');
const bgDecor = document.getElementById('bgDecor');
const clickSound = document.getElementById('clickSound');

let count = 0;
const messages = [
    "Eeeeh eeh! 😳",
    "Wait, sherikum? 😿",
    "Onoodi aloichok? 😿",
    "Ente mogathek nokkye! 🥺",
    "Orapano, last chance 😠",
    "avasana Chance, okay? 😤",
    "Aah eni ith amarthikoo.. YES! 😒"
];

const catMemes = [
    "https://media1.tenor.com/m/islKHV6ibh0AAAAC/kitty-cat.gif",           // Initial
    "https://media1.tenor.com/m/w0ousLLlLeIAAAAC/cat-scared.gif",           // 1st No
    "https://media1.tenor.com/m/cmR2VwcQclMAAAAd/screaming-cat.gif",       // 2nd No
    "https://media1.tenor.com/m/cxTH4XWKUVIAAAAC/cat.gif",                 // 3rd No
    "https://media1.tenor.com/m/t7_iTN0iYekAAAAC/sad-sad-cat.gif",         // 4th No
    "https://media1.tenor.com/m/KBf8ZTTqli0AAAAC/enojado-gato.gif",         // 5th No (LAST WARNING)
    "https://media1.tenor.com/m/JGPRP5tFGb0AAAAC/that%E2%80%99s-it-last-chance.gif", // 6th No (Last Chance)
    "https://media1.tenor.com/m/j9Fj-PzH_f4AAAAC/thinking-cat.gif"         // Final
];

// Initialize Background Decoration
function initBackground() {
    const heartIcons = ['❤️', '💖', '💝', '💕'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'decor-heart';
        heart.innerHTML = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        bgDecor.appendChild(heart);
    }
}

function updateMeme(index) {
    const container = document.querySelector('.meme-container');
    const memeIndex = Math.min(index, catMemes.length - 1);
    const memeUrl = catMemes[memeIndex];

    container.style.opacity = 0;

    setTimeout(() => {
        container.innerHTML = `<img id="cat-meme" src="${memeUrl}" alt="Cat meme">`;
        container.style.opacity = 1;
    }, 200);
}

function createHeart(x, y, scale = 1, isCelebration = false) {
    const heart = document.createElement('div');
    const symbols = isCelebration 
        ? ['❤️', '💖', '💝', '💕', '🌹', '🦋', '✨', '😻', '🌷'] 
        : ['❤️', '💖', '💝', '💕', '🌹'];
    
    heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    heart.className = 'heart-particle';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = (Math.random() * 10 + 22) * scale + 'px';
    
    // Spread based on screen width to prevent overflow issues
    const maxX = window.innerWidth * 0.8;
    const spreadX = isCelebration ? maxX : 300;
    const spreadY = isCelebration ? 800 : 300;
    
    const tx = (Math.random() - 0.5) * spreadX;
    const ty = -Math.random() * spreadY - (isCelebration ? 150 : 100);
    const tr = (Math.random() - 0.5) * 720; 
    
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.setProperty('--tr', `${tr}deg`);
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
}

function startRainShow() {
    const duration = 5000;
    const end = Date.now() + duration;

    const symbols = ['❤️', '💖', '💝', '💕', '🌹', '🦋', '✨', '🌸', '🌷', '🎀'];

    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        const heart = document.createElement('div');
        heart.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        heart.className = 'heart-particle rain';
        
        const startX = Math.random() * window.innerWidth;
        heart.style.left = startX + 'px';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        const drift = (Math.random() - 0.5) * 400;
        const fallDuration = Math.random() * 2 + 1.5; // Faster: 1.5-3.5 seconds
        const rotation = (Math.random() - 0.5) * 1080;
        
        heart.style.setProperty('--drift', `${drift}px`);
        heart.style.setProperty('--fall-duration', `${fallDuration}s`);
        heart.style.setProperty('--tr', `${rotation}deg`);
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), fallDuration * 1000);
    }, 80); // More frequent: one every 80ms
}

function playSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {}); // Catch if browser blocks audio
    }
}

noBtn.addEventListener('click', (e) => {
    count++;
    playSound();
    
    // Shake the card
    const card = document.querySelector('.card');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 500);
    
    // Update YES button - Cap the scale more strictly on mobile
    const isMobile = window.innerWidth <= 480;
    const scaleFactor = isMobile ? 0.12 : 0.2;
    const maxScale = isMobile ? 1.8 : 4;
    
    const scale = Math.min(1 + count * scaleFactor, maxScale);
    yesBtn.style.transform = `scale(${scale})`;
    
    const msgIndex = Math.min(count - 1, messages.length - 1);
    yesBtn.innerText = messages[msgIndex];

    // Update NO button (fade and shrink) - Keep it visible until the final message
    const isLastMessage = count >= messages.length;
    const shrink = isLastMessage ? 0 : Math.max(0.3, 1 - count * 0.12);
    
    noBtn.style.transform = `scale(${shrink})`;
    noBtn.style.opacity = shrink;
    
    if (isLastMessage) {
        noBtn.style.pointerEvents = 'none';
        noBtn.style.visibility = 'hidden';
    }

    // Update Cat
    updateMeme(count);

    // Particles
    for (let i = 0; i < 8; i++) {
        createHeart(e.clientX, e.clientY);
    }
});

yesBtn.addEventListener('click', (e) => {
    playSound();
    overlay.classList.add('active');

    // Add sarcasm based on how many 'No' attempts were made
    const celebTitle = document.getElementById('celebrationTitle');
    const celebText = document.getElementById('celebrationText');
    
    if (count > 0) {
        celebTitle.innerText = "Avasanam! ❤️";
        celebText.innerText = "it's Ook... I love you too! ❤️";
    } else {
        celebTitle.innerText = "wooo! ❤️";
        celebText.innerText = "You're the one! LOVE U😊❤️✨";
    }
    
    // Confetti effect / heart burst - Optimized for mobile
    const rect = yesBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const isMobile = window.innerWidth <= 480;
    const heartCount = isMobile ? 40 : 100; // Increased for extra love
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart(
                centerX + (Math.random() - 0.5) * 60, 
                centerY + (Math.random() - 0.5) * 60,
                isMobile ? 1.4 : 2,
                true // Special celebration symbols
            );
        }, i * (isMobile ? 15 : 10));
    }

    // Start a background rain show
    startRainShow();
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
    
    // Reset state to initial
    count = 0;
    
    // Reset YES button
    yesBtn.style.transform = 'scale(1)';
    yesBtn.innerText = 'YES';
    
    // Reset NO button
    noBtn.style.transform = 'scale(1)';
    noBtn.style.opacity = '1';
    noBtn.style.pointerEvents = 'auto';
    noBtn.style.visibility = 'visible';
    
    // Reset Meme
    updateMeme(0);
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('active');
    }
});

// Keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('active');
});

// Initialize
initBackground();
