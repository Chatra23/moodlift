// ======================== MOOD TRACKING & HISTORY ========================
let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

function saveMoodToHistory(mood) {
    moodHistory.unshift({ mood: mood, timestamp: new Date().toLocaleTimeString() });
    if (moodHistory.length > 12) moodHistory.pop();
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    renderMoodHistory();
}

function renderMoodHistory() {
    const historyContainer = document.getElementById('historyList');
    if (!historyContainer) return;
    if (moodHistory.length === 0) {
        historyContainer.innerHTML = '<li style="opacity:0.7;">No entries yet — tap a mood ✨</li>';
        return;
    }
    historyContainer.innerHTML = moodHistory.map(entry => 
        `<li>${entry.mood}  •  ${entry.timestamp}</li>`
    ).join('');
}

// Mood selection and feedback
const moodButtons = document.querySelectorAll('.mood-btn');
const responseDiv = document.getElementById('response');

function selectMood(mood) {
    let feedbackMsg = '';
    if (mood === 'happy') {
        feedbackMsg = 'That\'s amazing! Keep smiling 😊✨';
    } else if (mood === 'okay') {
        feedbackMsg = 'You\'re doing fine. Keep going 💪🌼';
    } else if (mood === 'low') {
        feedbackMsg = 'It\'s okay to feel low. You\'re not alone 💜 Take a deep breath.';
    }
    responseDiv.innerText = feedbackMsg;
    saveMoodToHistory(mood);
}

moodButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const mood = btn.getAttribute('data-mood');
        if (mood) selectMood(mood);
    });
});

// ======================== POSITIVE MESSAGES (TABS) ========================
const quotesList = [
    "“You are stronger than you think.”",
    "“This too shall pass.”",
    "“Every day may not be good, but there is something good in every day.”",
    "“Believe you can and you're halfway there.”"
];
const selfCareTips = [
    "🌿 Take a deep breath, drink water, and stretch.",
    "🌸 Go for a short walk outside.",
    "🕯️ Light a candle and listen to calm music.",
    "💆‍♀️ Give yourself a moment of silence."
];
const affirmationsList = [
    "I am enough. I am strong. I am capable 💜",
    "I deserve peace and happiness.",
    "I am in charge of how I feel, and today I choose positivity.",
    "My challenges help me grow."
];

let activeTab = 'quotes';
const messageContentDiv = document.getElementById('messageContent');
const tabBtns = document.querySelectorAll('.tab-btn');

function updateMessageContent() {
    if (activeTab === 'quotes') {
        const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
        messageContentDiv.innerText = randomQuote;
    } else if (activeTab === 'selfcare') {
        const randomCare = selfCareTips[Math.floor(Math.random() * selfCareTips.length)];
        messageContentDiv.innerText = randomCare;
    } else if (activeTab === 'affirm') {
        const randomAffirm = affirmationsList[Math.floor(Math.random() * affirmationsList.length)];
        messageContentDiv.innerText = randomAffirm;
    }
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTab = btn.getAttribute('data-tab');
        updateMessageContent();
    });
});

// ======================== DARK MODE ========================
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    darkToggle.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    darkToggle.innerText = '☀️ Light Mode';
} else {
    darkToggle.innerText = '🌙 Dark Mode';
}

// ======================== MUSIC PLAYER ========================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        music.pause();
        musicBtn.innerHTML = '🎵 Play Music';
        isMusicPlaying = false;
    } else {
        music.play().catch(e => console.log("autoplay blocked, user interaction needed"));
        musicBtn.innerHTML = '🔇 Pause Music';
        isMusicPlaying = true;
    }
});

// ======================== BREATHING EXERCISE ========================
const startBreathingBtn = document.getElementById('startBreathingBtn');
const breathingStatus = document.getElementById('breathingStatus');
let breathingInterval = null;

function stopBreathingExercise() {
    if (breathingInterval) {
        clearInterval(breathingInterval);
        breathingInterval = null;
    }
    startBreathingBtn.classList.remove('breathe-active');
    startBreathingBtn.innerText = '🌬️ Start Breathing';
    if (breathingStatus) breathingStatus.innerText = '';
}

function startBreathingExercise() {
    stopBreathingExercise();
    let step = 0;
    const steps = ['🌬️ Breathe IN... 4 sec', '💨 Hold... 4 sec', '🍃 Breathe OUT... 6 sec', '😌 Relax... 2 sec'];
    let durations = [4000, 4000, 6000, 2000];
    
    startBreathingBtn.classList.add('breathe-active');
    startBreathingBtn.innerText = '🌀 Breathing...';
    
    function runStep() {
        if (step >= steps.length) step = 0;
        breathingStatus.innerText = steps[step];
        const timeout = durations[step];
        step++;
        breathingInterval = setTimeout(() => {
            runStep();
        }, timeout);
    }
    runStep();
    // store reference as interval-like
    const originalInterval = breathingInterval;
    breathingInterval = { _clear: () => clearTimeout(originalInterval), _timeout: originalInterval };
    // override so stop works
    const timerId = originalInterval;
    breathingInterval = timerId;
}

startBreathingBtn.addEventListener('click', () => {
    if (breathingInterval) {
        clearTimeout(breathingInterval);
        breathingInterval = null;
        stopBreathingExercise();
    } else {
        startBreathingExercise();
    }
});

// ======================== SMILE BOOSTER: JOKES + FUN FACTS ========================
const jokes = [
    "Why don’t scientists trust atoms? Because they make up everything! 😆",
    "What do you call a fake noodle? An impasta! 🍝",
    "Why did the scarecrow win an award? Because he was outstanding in his field! 🌾",
    "What’s the best thing about Switzerland? I don’t know, but the flag is a big plus! 🇨🇭"
];
const funFacts = [
    "🐘 Elephants are the only mammals that can’t jump.",
    "🍍 Pineapples take about two years to grow.",
    "🌊 The ocean has over 20 million tons of gold dissolved in it.",
    "😴 Humans are the only animals that blush.",
    "🐱 A group of cats is called a clowder."
];

let smileMode = 'joke';
const smileBtns = document.querySelectorAll('.smile-btn');
const smileContentDiv = document.getElementById('smileContent');
const tellMeBtn = document.getElementById('tellMeBtn');

function updateSmileContent() {
    if (smileMode === 'joke') {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        smileContentDiv.innerText = randomJoke;
    } else {
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        smileContentDiv.innerText = randomFact;
    }
}

smileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        smileBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        smileMode = btn.getAttribute('data-smile');
        updateSmileContent();
    });
});

tellMeBtn.addEventListener('click', updateSmileContent);

// ======================== GRATITUDE JOURNAL ========================
let gratitudeEntries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
const gratitudeInput = document.getElementById('gratitudeInput');
const saveGratitudeBtn = document.getElementById('saveGratitudeBtn');
const gratitudeListDiv = document.getElementById('gratitudeList');

function renderGratitude() {
    if (!gratitudeListDiv) return;
    if (gratitudeEntries.length === 0) {
        gratitudeListDiv.innerHTML = '<em>No notes yet — start with one small thing</em>';
        return;
    }
    gratitudeListDiv.innerHTML = gratitudeEntries.map((entry, idx) => 
        `<div style="background:rgba(200,180,250,0.3); padding:8px 12px; margin-bottom:6px; border-radius:30px;">✨ ${escapeHtml(entry)}</div>`
    ).join('');
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

saveGratitudeBtn.addEventListener('click', () => {
    let newEntry = gratitudeInput.value.trim();
    if (newEntry === "") {
        alert("Write something you're grateful for :)");
        return;
    }
    gratitudeEntries.unshift(newEntry);
    if (gratitudeEntries.length > 8) gratitudeEntries.pop();
    localStorage.setItem('gratitudeEntries', JSON.stringify(gratitudeEntries));
    gratitudeInput.value = '';
    renderGratitude();
});

// ======================== CHATBOT ========================
const userInput = document.getElementById('userInput');
const sendChatBtn = document.getElementById('sendChatBtn');
const chatResponseDiv = document.getElementById('chatResponse');

function chatbotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes('sad') || msg.includes('depress') || msg.includes('unhappy')) {
        return "💜 I'm really sorry you're feeling that way. You matter, and it's okay to ask for support. Breathe with me? 🌿";
    } else if (msg.includes('happy') || msg.includes('great') || msg.includes('good')) {
        return "😊 That’s wonderful! Spread that joy — you deserve it!";
    } else if (msg.includes('stress') || msg.includes('anxious') || msg.includes('worried')) {
        return "🌬️ Take a slow deep breath. In… and out. You've handled tough moments before, you can do it again.";
    } else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! 🌸 I'm here to uplift you. How can I help?";
    } else if (msg.includes('thank')) {
        return "You're so welcome! 💖 Keep taking care of yourself.";
    } else if (msg.includes('joke')) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        return `😄 Here's a joke: ${randomJoke}`;
    } else {
        return "💬 I'm here to listen. Want to share more, or maybe try a breathing exercise? You're doing great.";
    }
}

function handleChat() {
    const userText = userInput.value.trim();
    if (userText === "") return;
    const reply = chatbotReply(userText);
    chatResponseDiv.innerHTML = `🤖 ${reply}`;
    userInput.value = '';
}

sendChatBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
});

// ======================== INITIAL LOADS ========================
renderMoodHistory();
updateMessageContent();     // random quote at start
updateSmileContent();      // initial joke
renderGratitude();

// Prevent breathing interval memory if page refresh cleanup
window.addEventListener('beforeunload', () => {
    if (breathingInterval && typeof breathingInterval === 'number') clearTimeout(breathingInterval);
});