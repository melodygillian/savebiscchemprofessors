const PHOTOSYNTHESIS_EVENTS = [
  { title: "PSII Excitation Spike", desc: "A burst of sunlight excites chlorophyll molecules in PSII!", light: 20 },
  { title: "Water Splitting Surge", desc: "PSII splits water faster than usual!", nadp: 10, atp: 10 },
  { title: "Water Limitation", desc: "Water levels drop — PSII slows dramatically.", atp: -10, nadp: -10 },
  { title: "ETC Backup", desc: "Electrons accumulate — not enough NADP⁺ to accept them.", nadp: -20, atp: -5 },
  { title: "Efficient ETC Through Cytochrome Complex", desc: "The proton pump is working optimally!", atp: 20 },
  { title: "Proton Gradient Leak", desc: "Thylakoid membrane temporarily leaks protons!", atp: -25 },
  { title: "ATP Synthase Acceleration", desc: "High PMF (proton motive force) increases ATP production!", atp: 20 },
  { title: "ATP Synthase Inhibition", desc: "A transient inhibitor binds ATP synthase!", atp: -20 },
  { title: "PSI Overexcitation", desc: "PSI reduces NADP⁺ to NADPH at maximum rate!", nadp: 20 },
  { title: "Cyclic Photophosphorylation Mode", desc: "PSI switches to cyclic flow (no NADPH produced).", atp: 15, nadp: -10 },
  { title: "Thylakoid Membrane Tear", desc: "Structural damage compromises the membrane!", thylakoids: -20, atp: -15 },
  { title: "Pigment Bleaching", desc: "Chlorophyll is degrading under stress!", light: -15 },
  { title: "Pigment Repair Mechanism", desc: "Dynamic pigment turnover restores function!", light: 10 },
  { title: "DCPIP Reduction Faster Than Expected", desc: "The dye accepts electrons rapidly!", dcpip: -15, nadp: 10 },
  { title: "DCPIP Oxidized Addition", desc: "Fresh oxidized dye is added to the system!", dcpip: 20 },
  { title: "Heat Stress to Thylakoids", desc: "Rising temperature denatures PSII/PSI proteins!", thylakoids: -10, atp: -10 },
  { title: "Cold Slowdown", desc: "Enzyme kinetics slow dramatically at low temperature!", atp: -15, nadp: -5 },
  { title: "NADP⁺ Surge", desc: "A fresh supply of electron acceptors arrives!", nadp: 20 },
  { title: "NADP⁺ Consumption Spike", desc: "Calvin Cycle activity pulls electrons out faster!", nadp: -20 },
  { title: "PSII Damage from Excess Light", desc: "High light intensity damages the PSII reaction center!", thylakoids: -10, light: -10 },
  { title: "⚠️ CATASTROPHIC SYSTEM FAILURE", desc: "Multiple systems are failing simultaneously!", all: -15, isCatastrophic: true },
  { title: "⚠️ MEMBRANE DEPOLARIZATION", desc: "Sudden proton leakage across all membranes!", atp: -30, thylakoids: -15, isCatastrophic: true },
  { title: "⚠️ REACTIVE OXYGEN SPECIES BURST", desc: "Free radicals are damaging everything!", light: -20, thylakoids: -15, nadp: -10, isCatastrophic: true }
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
            <h1 style="color: #dc2626;">🔬 The Chloroplast Incident 🔬</h1>
            
            <div class="story-text">
                <p style="font-size: 1.3em; color: #16a34a; font-weight: bold; text-align: center; margin-bottom: 20px;">
                    "Nonono, I see you need to work harder on Biology!" 
                </p>
                
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
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
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
    if (gameState.light <= 0 || gameState.dcpip <= 0 || gameState.nadp <= 0 || 
        gameState.thylakoids <= 0 || gameState.atp <= 0) {
        showGameOver();
        return;
    }
    
    if (gameState.turn > 10) {
        showRescueChoice();
        return;
    }
    
    const event = PHOTOSYNTHESIS_EVENTS[Math.floor(Math.random() * PHOTOSYNTHESIS_EVENTS.length)];
    gameState.currentEvent = event;
    
    if (event.all) {
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
    const catastrophicClass = gameState.currentEvent.isCatastrophic ? 'catastrophic' : '';
    
    container.innerHTML = `
        <div class="screen">
            <div class="game-header">
                <h1>Chloroplast Rescue</h1>
                <div class="turn-counter">
                    <div class="turn-label">Turn</div>
                    <div class="turn-number">${gameState.turn}/10</div>
                </div>
            </div>
            
            <div class="event-box ${catastrophicClass}">
                <div class="event-title ${catastrophicClass}">${gameState.currentEvent.isCatastrophic ? '🚨' : '⚡'} ${gameState.currentEvent.title}</div>
                <div class="event-desc ${catastrophicClass}">${gameState.currentEvent.desc}</div>
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
                (Seriously though, who would choose no? What kind of person are you?)
            </p>
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
                "You saved us from the quantum void! Thank you!" - Don & Adam
            </p>
            <button onclick="startGame()">Play Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
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
                "We... we thought you cared about photosynthesis..." - Don & Adam, echoing through the thylakoid membrane
            </p>
            <p style="font-size: 0.9em; color: #dc2626; font-weight: bold; margin: 20px 0;">
                (You monster. They had families. They had dreams. They had a 2pm lecture to teach.)
            </p>
            <button onclick="startGame()" style="background: #7c3aed;">Undo Your Terrible Decision</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
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
                "We should have labeled that button..." - Don & Adam, faintly echoing from the thylakoid membrane
            </p>
            <button onclick="startGame()">Try Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

window.onload = showIntro;
