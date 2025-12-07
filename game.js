const EVENTS = [
  { title: "Cloud Cover", desc: "Dark clouds roll over the lab!", light: -20 },
  { title: "Direct Sunbeam", desc: "Brilliant sunlight floods in!", light: 25, atp: 10 },
  { title: "DCPIP Spill", desc: "Oh no! The indicator spilled!", dcpip: -30 },
  { title: "Fresh DCPIP Added", desc: "Adam found a backup bottle!", dcpip: 20 },
  { title: "NADP⁺ Shipment Arrives", desc: "Perfect timing on the delivery!", nadp: 25 },
  { title: "NADP⁺ Contamination", desc: "The reagent bottle was left open!", nadp: -25 },
  { title: "Thylakoid Membrane Tear", desc: "The membrane structure is damaged!", thylakoids: -20, atp: -10 },
  { title: "Extra Thylakoids Isolated", desc: "Don's prep work paid off!", thylakoids: 25 },
  { title: "ATP Leak", desc: "Energy is escaping the system!", atp: -30 },
  { title: "Efficient ADP Rephosphorylation", desc: "The ATP synthase is humming!", atp: 20 },
  { title: "Shadow of Adam Matthews", desc: "Adam accidentally blocks the light!", light: -15 },
  { title: "Don Elmore Hits the Light Switch", desc: "Don bumped into the wall switch!", light: -30 },
  { title: "Spectrophotometer Calibration Error", desc: "The readings are all wrong!", dcpip: -10, nadp: -10 },
  { title: "Burst of O₂ Evolution", desc: "Oxygen bubbles everywhere!", atp: 15 },
  { title: "Heat Surge", desc: "The lab is getting too warm!", light: 10, dcpip: -15 },
  { title: "Cool Breeze", desc: "Someone opened the window!", atp: -10 },
  { title: "Magnesium Cofactor Boost", desc: "The Mg²⁺ is enhancing reactions!", atp: 10 },
  { title: "Pipette Misfire", desc: "A clumsy mistake affects something!", random: true },
  { title: "Perfect Mixing", desc: "Everything is perfectly homogeneous!", all: 5 },
  { title: "Photodamage to PSII", desc: "Too much light damaged the reaction center!", thylakoids: -10, atp: -10 }
];

let gameState = {
    light: 50,
    dcpip: 50,
    nadp: 50,
    thylakoids: 50,
    atp: 50,
    turn: 1,
    currentEvent: null
};

const clamp = (val) => Math.max(0, Math.min(100, val));

function showIntro() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen">
            <h1>🔬 The Chloroplast Incident 🔬</h1>
            
            <div class="story-text">
                <p>It was just another Tuesday morning in <strong>BISC/CHEM 116</strong> when disaster struck.</p>
                
                <p><strong>Professor Don Elmore</strong> and <strong>Professor Adam Matthews</strong> were demonstrating the Hill reaction—showing students how isolated chloroplasts can reduce DCPIP when exposed to light. Everything was going perfectly.</p>
                
                <p>Then Adam said, "Hey Don, what does this big red button do?"</p>
                
                <p>Don replied, "Oh that? That's the—<strong>WAIT, DON'T PRESS—</strong>"</p>
                
                <p class="highlight">💥 ZZZZAAAAPPPPP! 💥</p>
                
                <p>In a flash of green light, both professors were <strong>shrunk down and transported INSIDE a chloroplast</strong>! Now they're trapped in the thylakoid lumen, surrounded by swirling electrons and ATP synthase complexes.</p>
                
                <div class="professor-images">
                    <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                    <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
                </div>
                
                <p>The only way to escape is to <strong>keep the light reactions running for 10 turns</strong> without letting any critical resource drop to zero. If the chloroplast collapses, they'll be stuck forever!</p>
                
                <p style="text-align: center; font-size: 1.3em; font-weight: bold; color: #15803d; margin-top: 30px;">
                    Can you save Professors Elmore and Matthews?
                </p>
            </div>
            
            <button onclick="startGame()">🚀 Start the Rescue Mission!</button>
        </div>
    `;
}

function startGame() {
    gameState = {
        light: 50,
        dcpip: 50,
        nadp: 50,
        thylakoids: 50,
        atp: 50,
        turn: 1,
        currentEvent: null
    };
    nextTurn();
}

function nextTurn() {
    // Check win condition
    if (gameState.turn > 10) {
        showVictory();
        return;
    }
    
    // Check game over
    if (gameState.light <= 0 || gameState.dcpip <= 0 || gameState.nadp <= 0 || 
        gameState.thylakoids <= 0 || gameState.atp <= 0) {
        showGameOver();
        return;
    }
    
    // Trigger random event
    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    gameState.currentEvent = event;
    
    // Apply event effects
    if (event.random) {
        const resources = ['light', 'dcpip', 'nadp', 'thylakoids', 'atp'];
        const randomResource = resources[Math.floor(Math.random() * resources.length)];
        gameState[randomResource] = clamp(gameState[randomResource] - 15);
    } else if (event.all) {
        gameState.light = clamp(gameState.light + event.all);
        gameState.dcpip = clamp(gameState.dcpip + event.all);
        gameState.nadp = clamp(gameState.nadp + event.all);
        gameState.thylakoids = clamp(gameState.thylakoids + event.all);
        gameState.atp = clamp(gameState.atp + event.all);
    } else {
        if (event.light) gameState.light = clamp(gameState.light + event.light);
        if (event.dcpip) gameState.dcpip = clamp(gameState.dcpip + event.dcpip);
        if (event.nadp) gameState.nadp = clamp(gameState.nadp + event.nadp);
        if (event.thylakoids) gameState.thylakoids = clamp(gameState.thylakoids + event.thylakoids);
        if (event.atp) gameState.atp = clamp(gameState.atp + event.atp);
    }
    
    showGameScreen();
}

function showGameScreen() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen">
            <div class="game-header">
                <h1>Chloroplast Rescue</h1>
                <div class="turn-counter">
                    <div class="turn-label">Turn</div>
                    <div class="turn-number">${gameState.turn}/10</div>
                </div>
            </div>
            
            <div class="event-box">
                <div class="event-title">⚡ ${gameState.currentEvent.title}</div>
                <div class="event-desc">${gameState.currentEvent.desc}</div>
            </div>
            
            <div class="resources-panel">
                <h3 style="margin-bottom: 20px; color: #1f2937; font-size: 1.3em;">Resource Levels</h3>
                ${renderResource('☀️', 'Light', gameState.light, 'light')}
                ${renderResource('💧', 'DCPIP', gameState.dcpip, 'dcpip')}
                ${renderResource('⚛️', 'NADP⁺', gameState.nadp, 'nadp')}
                ${renderResource('🧬', 'Thylakoids', gameState.thylakoids, 'thylakoids')}
                ${renderResource('🔋', 'ATP', gameState.atp, 'atp')}
            </div>
            
            <div class="actions-panel">
                <h3 class="actions-title">Choose Your Action</h3>
                <div class="action-buttons">
                    <button class="action-btn btn-light" onclick="takeAction('light')">☀️ Add Light</button>
                    <button class="action-btn btn-dcpip" onclick="takeAction('dcpip')">💧 Add DCPIP</button>
                    <button class="action-btn btn-nadp" onclick="takeAction('nadp')">⚛️ Add NADP⁺</button>
                    <button class="action-btn btn-thylakoids" onclick="takeAction('thylakoids')">🧬 Add Thylakoids</button>
                    <button class="action-btn btn-atp" onclick="takeAction('atp')">🔋 Add ATP</button>
                    <button class="action-btn btn-rest" onclick="takeAction('rest')">⏸️ Rest</button>
                </div>
            </div>
        </div>
    `;
}

function renderResource(icon, label, value, type) {
    return `
        <div class="resource-item">
            <div class="resource-header">
                <div class="resource-label">
                    <span class="resource-icon">${icon}</span>
                    <span>${label}</span>
                </div>
                <span class="resource-value">${value}%</span>
            </div>
            <div class="resource-bar-container">
                <div class="resource-bar bar-${type}" style="width: ${value}%"></div>
            </div>
        </div>
    `;
}

function takeAction(type) {
    if (type !== 'rest') {
        gameState[type] = clamp(gameState[type] + 15);
    }
    
    gameState.turn++;
    
    setTimeout(() => {
        nextTurn();
    }, 300);
}

function showVictory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen victory-screen">
            <h1 class="victory-title">🎉 MISSION SUCCESS! 🎉</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You saved Professors Elmore and Matthews!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                The chloroplast stabilized and a reverse beam brought them back to the lab. 
                They promise to label that button properly now.
            </p>
            <div class="victory-emoji">👨‍🔬✨👨‍🔬</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 20px 0;">
                "Thanks for keeping the light reactions going! We owe you one!" - Don & Adam
            </p>
            <button onclick="startGame()">Play Again</button>
        </div>
    `;
}

function showGameOver() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen gameover-screen">
            <h1 class="gameover-title">💥 CHLOROPLAST COLLAPSE! 💥</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">The light reactions have stopped!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                Without balanced resources, the chloroplast destabilized. 
                Professors Elmore and Matthews are now stuck in the quantum void between photosystems...
            </p>
            <div class="gameover-emoji">😰👨‍🔬👨‍🔬😰</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 20px 0;">
                "We should have labeled that button..." - Don & Adam, faintly echoing from the thylakoid membrane
            </p>
            <button onclick="startGame()">Try Again</button>
        </div>
    `;
}

// Initialize game on page load
window.onload = showIntro;
