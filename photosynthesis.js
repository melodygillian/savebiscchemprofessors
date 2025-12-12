const PHOTOSYNTHESIS_EVENTS = [
  { 
    title: "Membrane depolarization by Elmore Lab!", 
    desc: "Professor Elmore had an antimicrobial peptide in his pocket and it disrupted the membrane! Protons are flowing all over the place, the proton motive force is decreasing, and ATP synthase is slowing down!", 
    atp: -20,
    correctActions: ['thylakoids']
  },
  { 
    title: "DCPIP running low!", 
    desc: "Almost all of the DCPIP is used up! Photosynthesis is slowing down!", 
    dcpip: -25,
    correctActions: ['dcpip']
  },
  { 
    title: "Gotta fill up water bottles at Leaky Beaker…", 
    desc: "The professors breathed too much and there's not much water left - PSII slows down!", 
    water: -20,
    atp: -10,
    correctActions: ['water']
  },
  { 
    title: "Hey Bro, Chill!", 
    desc: "It is Boston's winter, what are you expecting?? Kinetics slow down at low temperatures!", 
    atp: -15,
    correctActions: ['heat']
  },
  { 
    title: "PSII damage from shiny personality", 
    desc: "The bright light from Prof. Elmore and Matthews' shiny personalities damage the PSII reaction center!", 
    atp: -15,
    thylakoids: -10,
    correctActions: ['transcription']
  },
  { 
    title: "Help the Poor Chloroplast!", 
    desc: "Chlorophyll degrading under the stress of BISC/CHEM Final!", 
    thylakoids: -20,
    correctActions: ['thylakoids']
  },
  { 
    title: "He Clogged ATP synthase!!!!!", 
    desc: "Prof Matthews was mistaken for a proton and got swept up into ATP synthase!", 
    atp: -25,
    correctActions: ['transcription']
  },
  { 
    title: "THE Sweet Hawaii Dream", 
    desc: "Prof. Matthews reminisces about Hawaii, suddenly the light intensity increases!", 
    water: -15,
    dcpip: -15,
    correctActions: ['water', 'dcpip']
  },
  { 
    title: "OMG it's 116 Student Office Hour Time", 
    desc: "Too many students pile into the chloroplast at once.", 
    atp: 10,
    dcpip: -15,
    water: -15,
    correctActions: ['thylakoids', 'water', 'dcpip']
  },
  { 
    title: "See?! Caffeine is NOT good for you!", 
    desc: "Prof. Elmore brought his periodic table coffee cup with him, trips on some water molecules and spills his coffee everywhere! The caffeine accepts the surrounding protons and decreases the proton motive force.", 
    atp: -30,
    correctActions: ['water']
  }
];

let gameState = {
    dcpip: 50,
    water: 50,
    thylakoids: 50,
    atp: 50,
    turn: 1,
    currentEvent: null,
    eventQueue: [],
    lastActionCorrect: null
};

const clamp = (val) => Math.max(0, Math.min(100, val));

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function calculateStability() {
    const avg = (gameState.dcpip + gameState.water + gameState.thylakoids + gameState.atp) / 4;
    const minResource = Math.min(gameState.dcpip, gameState.water, gameState.thylakoids, gameState.atp);
    return Math.floor((avg * 0.4) + (minResource * 0.6));
}

function getResourceHints() {
    const hints = [];
    
    if (gameState.dcpip < 30) hints.push("💧 DCPIP levels are critically low!");
    else if (gameState.dcpip > 80) hints.push("💧 Plenty of oxidized DCPIP available!");
    
    if (gameState.water < 30) hints.push("💦 Water shortage detected!");
    else if (gameState.water > 80) hints.push("💦 Water levels are good!");
    
    if (gameState.thylakoids < 30) hints.push("🧬 Membrane integrity compromised!");
    else if (gameState.thylakoids > 80) hints.push("🧬 Thylakoid membranes looking healthy!");
    
    if (gameState.atp < 30) hints.push("🔋 Energy levels critically low!");
    else if (gameState.atp > 80) hints.push("🔋 ATP production is strong!");
    
    if (hints.length === 0) hints.push("⚖️ Systems appear balanced...");
    
    return hints;
}

function showIntro() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen">
            <h1 style="color: #dc2626;">🔬 The Chloroplast Incident 🔬</h1>
            
            <div class="story-text">
                <p style="font-size: 1.3em; color: #16a34a; font-weight: bold; text-align: center; margin-bottom: 20px;">
                    "Nonono, I see you need to work harder on Biology!" 
                </p>
                
                <p>It was a Tuesday morning in <strong>BISC/CHEM 116</strong> when disaster struck.</p>
                
                <p><strong>Professor Don Elmore</strong> and <strong>Professor Adam Matthews</strong> were demonstrating the Hill reaction—showing students how isolated chloroplasts can reduce DCPIP when exposed to light. Everything was going perfectly.</p>
                
                <p>Then Prof. Matthews said, "Hey Don, what does this big red button do?"</p>
                
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
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
        </div>
    `;
}

function startGame() {
    // Shuffle events and create queue
    const shuffledEvents = shuffleArray(PHOTOSYNTHESIS_EVENTS);
    
    gameState = {
        dcpip: 50,
        water: 50,
        thylakoids: 50,
        atp: 50,
        turn: 1,
        currentEvent: null,
        eventQueue: shuffledEvents,
        lastActionCorrect: null
    };
    nextTurn();
}

function nextTurn() {
    if (gameState.dcpip <= 0 || gameState.water <= 0 || 
        gameState.thylakoids <= 0 || gameState.atp <= 0) {
        showGameOver();
        return;
    }
    
    if (gameState.turn > 10) {
        showRescueChoice();
        return;
    }
    
    // Get next event from queue
    const event = gameState.eventQueue[gameState.turn - 1];
    gameState.currentEvent = event;
    
    // Reset last action feedback
    gameState.lastActionCorrect = null;
    
    showGameScreen();
}

function showGameScreen() {
    const container = document.getElementById('game-container');
    const stability = calculateStability();
    const hints = getResourceHints();
    
    let stabilityColor = '#22c55e';
    let stabilityText = 'STABLE';
    if (stability < 30) {
        stabilityColor = '#ef4444';
        stabilityText = 'CRITICAL';
    } else if (stability < 50) {
        stabilityColor = '#f97316';
        stabilityText = 'UNSTABLE';
    } else if (stability < 70) {
        stabilityColor = '#eab308';
        stabilityText = 'MODERATE';
    }
    
    const feedbackHtml = gameState.lastActionCorrect === true 
        ? '<div style="background: #d1fae5; border: 2px solid #10b981; padding: 15px; border-radius: 10px; margin-bottom: 20px; animation: fadeIn 0.5s;"><span style="font-size: 1.5em;">✅</span> <strong style="color: #065f46;">OH YEA! Here's our BISC/CHEM 116 genius out here</strong></div>'
        : gameState.lastActionCorrect === false
        ? '<div style="background: #fee2e2; border: 2px solid #ef4444; padding: 15px; border-radius: 10px; margin-bottom: 20px; animation: fadeIn 0.5s;"><span style="font-size: 1.5em;">❌</span> <strong style="color: #991b1b;">What... How many times were you sleeping in lecture...</strong></div>'
        : '';
    
    container.innerHTML = `
        <div class="screen">
            <div class="game-header">
                <h1>Chloroplast Rescue</h1>
                <div class="turn-counter">
                    <div class="turn-label">Turn</div>
                    <div class="turn-number">${gameState.turn}/10</div>
                </div>
            </div>
            
            ${feedbackHtml}
            
            <div class="event-box">
                <div class="event-title">⚡ ${gameState.currentEvent.title}</div>
                <div class="event-desc">${gameState.currentEvent.desc}</div>
            </div>
            
            <div class="resources-panel">
                <h3 style="margin-bottom: 20px; color: #1f2937; font-size: 1.3em;">Chloroplast Status</h3>
                
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-weight: 600; color: #374151;">Overall Stability</span>
                        <span style="font-weight: bold; color: ${stabilityColor}; font-size: 1.2em;">${stabilityText}</span>
                    </div>
                    <div class="resource-bar-container">
                        <div class="resource-bar" style="width: ${stability}%; background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e);"></div>
                    </div>
                </div>
                
                <div style="background: #f9fafb; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h4 style="color: #1e40af; margin-bottom: 10px; font-size: 1.1em;">📊 System Observations:</h4>
                    ${hints.map(hint => `<div style="margin: 8px 0; color: #374151;">• ${hint}</div>`).join('')}
                </div>
                
                <div style="margin-top: 15px; padding: 10px; background: #fef3c7; border-radius: 8px; font-size: 0.9em; color: #92400e;">
                    💡 <strong>Tip:</strong> Read the event carefully and think about what got affected!
                </div>
            </div>
            
            <div class="actions-panel">
                <h3 class="actions-title">Choose Your Action</h3>
                <div class="action-buttons">
                    <button class="action-btn btn-dcpip" onclick="takeAction('dcpip')">💧 Add DCPIP</button>
                    <button class="action-btn btn-light" onclick="takeAction('water')">💦 Add H₂O</button>
                    <button class="action-btn btn-rest" onclick="takeAction('heat')">🔥 Add Heat</button>
                    <button class="action-btn btn-thylakoids" onclick="takeAction('thylakoids')">🧬 Add Thylakoids</button>
                    <button class="action-btn btn-nadp" onclick="takeAction('transcription')">📝 Add Transcription Factors</button>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
        </div>
    `;
}

function takeAction(type) {
    // Check if correct action
    const correctActions = gameState.currentEvent.correctActions;
    gameState.lastActionCorrect = correctActions.includes(type);
    
    // Apply bonus if correct (bigger bonus to counteract event damage)
    const bonus = gameState.lastActionCorrect ? 30 : 20;
    
    // Apply the action FIRST (before event consequences shown in next turn)
    if (type === 'dcpip') {
        gameState.dcpip = clamp(gameState.dcpip + bonus);
    } else if (type === 'water') {
        gameState.water = clamp(gameState.water + bonus);
    } else if (type === 'heat') {
        gameState.atp = clamp(gameState.atp + bonus);
    } else if (type === 'thylakoids') {
        gameState.thylakoids = clamp(gameState.thylakoids + bonus);
    } else if (type === 'transcription') {
        gameState.thylakoids = clamp(gameState.thylakoids + bonus/2);
        gameState.atp = clamp(gameState.atp + bonus/2);
    }
    
    // NOW apply the event consequences
    const event = gameState.currentEvent;
    if (event.dcpip) gameState.dcpip = clamp(gameState.dcpip + event.dcpip);
    if (event.water) gameState.water = clamp(gameState.water + event.water);
    if (event.thylakoids) gameState.thylakoids = clamp(gameState.thylakoids + event.thylakoids);
    if (event.atp) gameState.atp = clamp(gameState.atp + event.atp);
    
    gameState.turn++;
    
    setTimeout(() => {
        nextTurn();
    }, 300);
}

function showRescueChoice() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen choice-screen">
            <h1 style="color: #1e40af; margin-bottom: 30px;">⚡ CRITICAL DECISION ⚡</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px; font-weight: bold;">The chloroplast has stabilized!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                You've successfully maintained the light reactions for 10 turns. 
                The system is stable enough to activate the reverse transport beam...
            </p>
            <div style="font-size: 4em; margin: 30px 0;">👨‍🔬❓👨‍🔬</div>
            <p style="font-size: 1.3em; font-weight: bold; color: #1f2937; margin-bottom: 30px;">
                Do you want to rescue Professors Elmore and Matthews?
            </p>
            <div class="choice-buttons">
                <button class="choice-btn" style="background: #16a34a;" onclick="rescueProfessors(true)">
                    ✅ YES - Rescue Them!
                </button>
                <button class="choice-btn" style="background: #dc2626;" onclick="rescueProfessors(false)">
                    ❌ NO - Leave Them
                </button>
            </div>
            <p style="font-size: 0.8em; color: #6b7280; margin-top: 20px; font-style: italic;">
                (Seriously though, who would choose no? What kind of INSANE CRAZY person are you?)
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
        </div>
    `;
}

function rescueProfessors(rescue) {
    if (rescue) {
        showVictory();
    } else {
        showAbandoned();
    }
}

function showVictory() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen victory-screen">
            <h1 class="victory-title">🎉 PROFESSORS RESCUED! 🎉</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You chose to save them!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                The chloroplast stabilized and a reverse beam brought them back to the lab. 
                They promise to label that button properly now... and maybe give you extra credit!
            </p>
            <div style="font-size: 5em; margin: 20px 0;">👨‍🔬✨👨‍🔬</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 20px 0;">
                "You saved us from the quantum void! Thank you!" - Prof. Elmore & Matthews
            </p>
            <button onclick="startGame()">Play Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
        </div>
    `;
}

function showAbandoned() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen abandoned-screen">
            <h1 style="color: #6b21a8; font-size: 3em; margin-bottom: 20px;">😱 PROFESSORS ABANDONED! 😱</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You chose... not to rescue them?!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                Professors Elmore and Matthews remain trapped in the chloroplast forever, 
                eternally cycling between Photosystem II and Photosystem I, 
                their consciousness fragmented across the electron transport chain...
            </p>
            <div style="font-size: 5em; margin: 20px 0;">👻👨‍🔬👨‍🔬👻</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                "We... we thought you cared about photosynthesis..." - Prof. Elmore & Matthews, echoing through the thylakoid membrane
            </p>
            <p style="font-size: 0.9em; color: #dc2626; font-weight: bold; margin: 20px 0;">
                (You monster. They had families. They had dreams. They had 8:30 am lectures to teach and post-labs to grade.)
            </p>
            <button onclick="startGame()" style="background: #7c3aed;">Undo Your Terrible Decision</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
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
            <div style="font-size: 5em; margin: 20px 0;">😰👨‍🔬👨‍🔬😰</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 20px 0;">
                "Remeber to water us and DONT LEAVE US HERE FOR WINTER BREAK..." - Prof Elmore & Matthews, faintly echoing from the thylakoid membrane
            </p>
            <button onclick="startGame()">Try Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 0.9em;">
                Created by Melody L, Lucy W 2025: Learn your Photosynthesis BISC/CHEMers! 🌿
            </div>
        </div>
    `;
}

window.onload = showIntro;
