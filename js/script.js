const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const overlay = document.getElementById('celebrationOverlay');
const closeBtn = document.getElementById('closeOverlay');

let count = 0;
const messages = [
    "Wait, really?😳",
    "What?! You can’t be serious 😿",
    "You're joking, right? 😿",
    "But look at my face 🥺",
    "LAST WARNING 😠",
    "Last Chance, okay?😤",
    "Just say YES!😒"
];

const catMemes = [
    "https://media1.tenor.com/m/islKHV6ibh0AAAAC/kitty-cat.gif",           // Initial (In Love)
    "https://media1.tenor.com/m/w0ousLLlLeIAAAAC/cat-scared.gif",           // 1st No
    "https://media1.tenor.com/m/cmR2VwcQclMAAAAd/screaming-cat.gif",       // 2nd No
    "https://media1.tenor.com/m/cxTH4XWKUVIAAAAC/cat.gif",                 // 3rd No
    "https://media1.tenor.com/m/t7_iTN0iYekAAAAC/sad-sad-cat.gif",         // 4th No
    "https://media1.tenor.com/m/KBf8ZTTqli0AAAAC/enojado-gato.gif",         // 5th No (LAST WARNING)
    "https://media1.tenor.com/m/JGPRP5tFGb0AAAAC/that%E2%80%99s-it-last-chance.gif", // 6th No (Last Chance)
    "https://media1.tenor.com/m/j9Fj-PzH_f4AAAAC/thinking-cat.gif"         // Final (Just say YES)
];

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

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '💖', '💝', '💕', '🌹'][Math.floor(Math.random() * 5)];
    heart.className = 'heart-particle';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 300;
    const ty = -Math.random() * 300 - 50;
    const tr = (Math.random() - 0.5) * 360;
    
    heart.style.setProperty('--tx', `${tx}px`);
    heart.style.setProperty('--ty', `${ty}px`);
    heart.style.setProperty('--tr', `${tr}deg`);
    
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
}

noBtn.addEventListener('click', (e) => {
    count++;
    
    // Update YES button
    const scale = Math.min(1 + count * 0.15, 3.5);
    yesBtn.style.transform = `scale(${scale})`;
    
    // Fix: Use count - 1 so the first message ("No") isn't skipped
    const msgIndex = Math.min(count - 1, messages.length - 1);
    yesBtn.innerText = messages[msgIndex];

    // Update NO button (fade and shrink)
    const shrink = Math.max(0, 1 - count * 0.12);
    noBtn.style.transform = `scale(${shrink})`;
    noBtn.style.opacity = shrink;
    
    if (shrink <= 0.1) {
        noBtn.style.pointerEvents = 'none';
        noBtn.style.visibility = 'hidden';
    }

    // Update Cat
    updateMeme(count);

    // Particles
    for (let i = 0; i < 6; i++) {
        createHeart(e.clientX, e.clientY);
    }
});

yesBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    
    // Hide initial GIF if still present - removed as cat-meme is updated directly
    
    // Confetti effect / massive heart burst
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createHeart(window.innerWidth / 2 + (Math.random() - 0.5) * 200, 
                        window.innerHeight / 2 + (Math.random() - 0.5) * 200);
        }, i * 20);
    }
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('active');
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
