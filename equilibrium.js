const EQUILIBRIUM_SCENARIOS = [
  {
    reaction: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat",
    context: "Haber process: H₂ and N₂ are fine, NH₃ is toxic and pungent!",
    situation: "Prof. Matthews drops his chocolate bar in shock as ammonia fills the beaker!",
    options: [
      { action: "Blast it with a heat gun", desc: "MAXIMUM HEAT!", toxicity: 1, feedback: "Good! Heating shifts the exothermic reaction left, away from toxic NH₃!" },
      { action: "Cool the beaker in ice", desc: "Lower the temperature", toxicity: 15, feedback: "No!! Exothermic forward! MORE ammonia! Elmore: 'My periodic table mug is fogging up!'" },
      { action: "Add H₂ gas", desc: "Pump in hydrogen", toxicity: 15, feedback: "No! Excess reactant shifts right toward NH₃!" },
      { action: "Compress the system", desc: "Increase pressure", toxicity: 15, feedback: "No! Fewer moles on right = MORE ammonia! Matthews: 'This is basic Le Chatelier!'" }
    ]
  },
  {
    reaction: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat",
    context: "Haber process again! NH₃ is the toxic one!",
    situation: "The ammonia smell is overwhelming! Elmore's coffee mug is steaming ominously!",
    options: [
      { action: "Add Cl₂ gas through the hole", desc: "Chlorine injection!", toxicity: 1, feedback: "Good! Cl₂ reacts with H₂, removing reactant and shifting left!" },
      { action: "Cool with liquid nitrogen", desc: "EXTREME COOLING!", toxicity: 15, feedback: "No!! Reaction shifts to ammonia! Matthews's photographic memory will remember this mistake forever!" },
      { action: "Add Ar gas", desc: "Dilute with argon", toxicity: 15, feedback: "No! Inert gas doesn't shift equilibrium! Not the best option, and time is wasting!" },
      { action: "Add N₂ gas", desc: "More nitrogen!", toxicity: 15, feedback: "No! More reactant drives it toward toxic NH₃! Elmore: 'Did you learn NOTHING?!'" }
    ]
  },
  {
    reaction: "2O₃(g) ⇌ 3O₂(g)",
    context: "O₃ (ozone) is toxic and reactive! O₂ is what we breathe. Reaction is endothermic.",
    situation: "Ozone is forming! Matthews's tennis serve arm is getting weak from the fumes!",
    options: [
      { action: "Add more O₃", desc: "Add ozone", toxicity: 1, feedback: "Good! Adding reactant shifts right toward safe O₂! Counterintuitive but chemistry!" },
      { action: "Add argon gas", desc: "Inert gas dilution", toxicity: 15, feedback: "No! Inert gas does nothing to shift equilibrium! Elmore's clutching his 3D-printed green beaker in despair!" },
      { action: "Cool the beaker in ice", desc: "Lower temperature", toxicity: 15, feedback: "No! Cooling an endothermic reaction shifts LEFT toward toxic O₃!" },
      { action: "Remove O₂", desc: "Extract oxygen", toxicity: 2, feedback: "Product removal helps but you're removing the SAFE gas! There was a better option!" }
    ]
  },
  {
    reaction: "CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)",
    context: "CO is toxic! CO₂ and H₂ are safe. The reaction is exothermic.",
    situation: "Carbon monoxide building up! Elmore's poetic soul is fading!",
    options: [
      { action: "Remove H₂ gas", desc: "Vent the hydrogen", toxicity: 1, feedback: "Good! Product removal shifts right toward CO₂ and H₂, away from toxic CO!" },
      { action: "Add heat", desc: "Heat it up", toxicity: 15, feedback: "No! Heating shifts exothermic reaction LEFT toward toxic CO! Matthews: 'My daughters would be ashamed!'" },
      { action: "Add CO₂", desc: "Pump in carbon dioxide", toxicity: 15, feedback: "No! Adding product shifts LEFT toward toxic CO!" },
      { action: "Compress the system", desc: "Increase pressure", toxicity: 15, feedback: "No! Equal moles on both sides = pressure has no effect! There was a better choice!" }
    ]
  },
  {
    reaction: "CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)",
    context: "CO is deadly toxic! The silent killer! Reaction is exothermic.",
    situation: "CO levels rising! Matthews's memories of Hawaii are flashing before his eyes!",
    options: [
      { action: "Add CO gas", desc: "More carbon monoxide?!", toxicity: 1, feedback: "Good! Wait, WHAT?! Adding reactant shifts RIGHT away from CO toward products! Brilliant reverse psychology!" },
      { action: "Remove H₂O vapor", desc: "Dry it out", toxicity: 15, feedback: "No! Removing reactant shifts LEFT toward toxic CO! Elmore's live music concerts are flashing before his eyes!" },
      { action: "Add heat", desc: "Blast with heat", toxicity: 15, feedback: "No! Shifts LEFT toward CO! Matthews: 'I can't remember if I said goodbye to my Newfoundland!'" },
      { action: "Add argon", desc: "Inert gas", toxicity: 2, feedback: "Inert gas barely helps. There were much better options! Elmore: 'Even English literature couldn't describe this mediocrity!'" }
    ]
  },
  {
    reaction: "CO(g) + 2H₂(g) ⇌ CH₃OH(g)",
    context: "CO is toxic! CH₃OH (methanol) is less harmful. This makes the fuel methanol!",
    situation: "CO building up! Prof. Matthews' immunology background isn't helping with chemistry!",
    options: [
      { action: "Pump in extra H₂", desc: "Add hydrogen through hole", toxicity: 1, feedback: "Le Chatelier saves the day! Excess reactant shifts RIGHT toward safe methanol!" },
      { action: "Remove CH₃OH with syringe", desc: "Extract methanol", toxicity: 1, feedback: "Nice! Product removal shifts equilibrium forward away from CO!" },
      { action: "Compress the system", desc: "Increase pressure", toxicity: 2, feedback: "Good! 3 moles left → 1 mole right, pressure favors fewer moles!" },
      { action: "Open hole for H₂ escape", desc: "Let hydrogen vent", toxicity: 15, feedback: "No! Removing reactant shifts LEFT toward toxic CO! Elmore's hiking boots won't save him now!" }
    ]
  },
  {
    reaction: "4HCl(g) + O₂(g) ⇌ 2Cl₂(g) + 2H₂O(g)",
    context: "Both HCl and Cl₂ are toxic, but Cl₂ (green gas) is MUCH worse! Reaction is exothermic.",
    situation: "Green chlorine gas appearing! Matthews's baking skills can't help him now!",
    options: [
      { action: "Remove O₂", desc: "Eliminate oxygen", toxicity: 1, feedback: "Nice! Removing reactant drives LEFT away from deadly Cl₂!" },
      { action: "Add heat", desc: "Blast with heat gun", toxicity: 1, feedback: "Nice! Heating exothermic reaction shifts LEFT away from Cl₂!" },
      { action: "Remove H₂O vapor", desc: "Trap the water", toxicity: 15, feedback: "No! Product removal drives RIGHT = MORE Cl₂ formed! Elmore: 'This is poetry... tragic poetry!'" },
      { action: "Add argon gas", desc: "Inert dilution", toxicity: 2, feedback: "Not the best choice! No change in equilibrium, but at least you didn't make it worse!" },
      { action: "Increase pressure", desc: "Compress everything", toxicity: 15, feedback: "No! 5 moles left → 4 moles right = more Cl₂! Matthews's photographic memory will haunt him with this!" }
    ]
  },
  {
    reaction: "N₂O₄(g) ⇌ 2NO₂(g)",
    context: "NO₂ is toxic brown gas! N₂O₄ is colorless and less harmful. Reaction is endothermic.",
    situation: "Brown nitrogen dioxide fumes! Elmore's periodic table mug can't contain this nightmare!",
    options: [
      { action: "Cool with ice bath", desc: "Lower temperature", toxicity: 1, feedback: "Good! Cooling endothermic reaction shifts LEFT toward colorless N₂O₄!" },
      { action: "Heat the beaker", desc: "Apply heat", toxicity: 15, feedback: "No! Heating shifts RIGHT toward toxic brown NO₂! Matthews: 'My tennis elbow hurts less than watching this!'" },
      { action: "Increase pressure", desc: "Compress the system", toxicity: 1, feedback: "Good! 2 moles right → 1 mole left favors N₂O₄!" },
      { action: "Decrease pressure", desc: "Give it space", toxicity: 15, feedback: "No! Favors 2 moles = MORE toxic NO₂! Elmore's love of hiking won't save him from this!" }
    ]
  },
  {
    reaction: "CaCO₃(s) + heat ⇌ CaO(s) + CO₂(g)",
    context: "CaCO₃ is limestone (safe), but the high CO₂ concentration is suffocating!",
    situation: "CO₂ levels skyrocketing! Prof. Matthews can barely breathe!",
    options: [
      { action: "Cool the beaker", desc: "Lower temperature", toxicity: 1, feedback: "Good! Cooling shifts the endothermic decomposition LEFT, reducing CO₂!" },
      { action: "Heat the beaker", desc: "Add more heat", toxicity: 15, feedback: "No! Heat drives decomposition RIGHT = MORE CO₂! Matthews: 'My chocolate is melting AND I'm suffocating!'" },
      { action: "Remove CO₂", desc: "Trap the gas", toxicity: 15, feedback: "No! Product removal shifts RIGHT = makes MORE CO₂ faster than you remove it!" },
      { action: "Increase pressure", desc: "Compress it", toxicity: 2, feedback: "Modest help! Higher pressure slightly opposes gas formation, but cooling was better!" }
    ]
  },
  {
    reaction: "H₂(g) + Cl₂(g) ⇌ 2HCl(g) + heat",
    context: "Cl₂ is toxic green gas! HCl is corrosive but less immediately deadly. Exothermic reaction.",
    situation: "Chlorine gas swirling! Elmore's 3D-printed beaker would be proud if it could see this!",
    options: [
      { action: "Add heat", desc: "Heat it up", toxicity: 1, feedback: "Good! Heating shifts exothermic reaction LEFT away from HCl, consuming Cl₂!" },
      { action: "Cool with ice", desc: "Lower temperature", toxicity: 2, feedback: "Cooling shifts RIGHT, consuming toxic Cl₂ but making corrosive HCl. Moderate trade-off!" },
      { action: "Add H₂ gas", desc: "Pump in hydrogen", toxicity: 2, feedback: "Decent! Shifts right, consuming Cl₂, though you make more HCl. Better than nothing!" },
      { action: "Remove HCl", desc: "Trap hydrogen chloride", toxicity: 15, feedback: "No! Product removal shifts RIGHT, but you're consuming Cl₂ slower than new HCl forms! Matthews: 'This is taking forever!'" }
    ]
  }
];

let gameState = {
    toxicity: 0,
    round: 1,
    currentScenario: null,
    lastFeedback: '',
    timerInterval: null,
    timeRemaining: 10
};

function showIntro() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen">
            <h1 style="color: #7c2d12;">🧪 The Beaker Incident 🧪</h1>
            
            <div class="story-text">
                <p style="font-size: 1.3em; color: #dc2626; font-weight: bold; text-align: center; margin-bottom: 20px;">
                    "Nonono no biology for you, I see you need to work harder on Chemistry!" 
                </p>
                
                <p>It was a Monday in <strong>BISC/CHEM 116</strong> when an incident struck...</p>
                
                <p><strong>Professor Don Elmore</strong> and <strong>Professor Adam Matthews</strong> were demonstrating chemical equilibrium to the class. Prof. Elmore had just finished saying, "And remember, Le Chatelier's principle states that—"</p>
                
                <p>Prof. Matthews interrupted: "Hey Don, should this beaker actually be sealed THIS tight???????????"</p>
                
                <p class="highlight">💨 FFFFFFFFFSSSSSSHHHHH! 💨</p>
                
                <p>The demonstration beaker's seal <strong>malfunctioned and clamped shut with them inside!</strong> The tiny hole on top is just big enough to add chemicals, but not big enough for them to escape.</p>
                
                <p>Worse: <strong>The equilibrium reaction inside produces TOXIC gases!</strong></p>
                
                <div class="professor-images">
                    <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                    <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
                </div>
                
                <p>Prof. Elmore (muffled from inside): "The... the reaction makes poison!"</p>
                
                <p>Prof. Matthews (panicking): "Find something to cut us out!"</p>
                
                <p>Your <strong>dear, lovely, and smart classmates Melody and Lucy</strong> run off to find tools, but it'll take <strong>10 rounds</strong> before they return. You need to manipulate the equilibrium to minimize toxic product formation <strong style="color: #dc2626;">within 10 seconds</strong> after each equilibrium reaction happens!</p>
                
                <p style="text-align: center; font-size: 1.3em; font-weight: bold; color: #7c2d12; margin-top: 30px;">
                    Keep their toxicity below 70% until rescue arrives!
                </p>
            </div>
            
            <button onclick="startGame()" style="background: #7c2d12;">🚀 Start Chemical Rescue!</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

function startGame() {
    gameState = {
        toxicity: 0,
        round: 1,
        currentScenario: null,
        lastFeedback: '',
        timerInterval: null,
        timeRemaining: 10
    };
    nextScenario();
}

function nextScenario() {
    if (gameState.toxicity >= 100) {
        showDeath();
        return;
    }
    
    if (gameState.round > 10) {
        if (gameState.toxicity >= 70) {
            showSick();
        } else {
            showRescueChoice();
        }
        return;
    }
    
    const scenario = EQUILIBRIUM_SCENARIOS[Math.floor(Math.random() * EQUILIBRIUM_SCENARIOS.length)];
    gameState.currentScenario = scenario;
    gameState.lastFeedback = '';
    gameState.timeRemaining = 10;
    
    showGameScreen();
    startTimer();
}

function startTimer() {
    // Clear any existing timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    gameState.timerInterval = setInterval(() => {
        gameState.timeRemaining--;
        updateTimerDisplay();
        
        if (gameState.timeRemaining <= 0) {
            clearInterval(gameState.timerInterval);
            timeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer-display');
    const container = document.getElementById('game-container');
    
    if (timerElement) {
        timerElement.textContent = gameState.timeRemaining;
        
        // Update timer color based on urgency
        if (gameState.timeRemaining <= 3) {
            timerElement.style.color = '#dc2626';
            timerElement.style.animation = 'pulse 0.5s ease-in-out infinite';
        } else if (gameState.timeRemaining <= 5) {
            timerElement.style.color = '#ea580c';
        }
    }
    
    // Change background color in last 5 seconds for dramatic effect
    if (gameState.timeRemaining <= 5 && gameState.timeRemaining > 3) {
        container.style.background = 'linear-gradient(135deg, #fef3c7, #fed7aa)';
        container.style.transition = 'background 0.3s ease';
    } else if (gameState.timeRemaining <= 3) {
        container.style.background = 'linear-gradient(135deg, #fecaca, #fca5a5)';
        container.style.transition = 'background 0.3s ease';
    }
}

function timeOut() {
    // Auto-select a random wrong answer (high toxicity)
    const wrongOptions = gameState.currentScenario.options
        .map((opt, idx) => ({ opt, idx }))
        .filter(item => item.opt.toxicity >= 10);
    
    if (wrongOptions.length > 0) {
        const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        gameState.lastFeedback = `⏰ TIME'S UP! You panicked and ${randomWrong.opt.action}! ${randomWrong.opt.feedback}`;
        gameState.toxicity = Math.min(100, gameState.toxicity + randomWrong.opt.toxicity);
    } else {
        // If somehow all options are good, just pick the first one
        const firstOption = gameState.currentScenario.options[0];
        gameState.lastFeedback = `⏰ TIME'S UP! You defaulted to: ${firstOption.action}. ${firstOption.feedback}`;
        gameState.toxicity = Math.min(100, gameState.toxicity + firstOption.toxicity);
    }
    
    showGameScreen();
    
    setTimeout(() => {
        if (gameState.toxicity >= 100) {
            showDeath();
            return;
        }
        
        gameState.round++;
        setTimeout(() => {
            nextScenario();
        }, 500);
    }, 2500);
}

function showGameScreen() {
    const container = document.getElementById('game-container');
    const isCatastrophic = gameState.currentScenario.reaction.includes('⚠️');
    
    // Reset background if showing feedback
    if (gameState.lastFeedback) {
        container.style.background = '';
    }
    
    container.innerHTML = `
        <div class="screen">
            <div class="game-header">
                <h1 style="color: #7c2d12;">Beaker Rescue</h1>
                <div class="round-counter">
                    <div class="round-label">Round</div>
                    <div class="round-number" style="color: #7c2d12;">${gameState.round}/10</div>
                </div>
            </div>
            
            ${!gameState.lastFeedback ? `
                <div class="timer-container" style="text-align: center; margin: 20px 0;">
                    <div style="font-size: 1.2em; color: #374151; margin-bottom: 10px;">⏰ Time Remaining</div>
                    <div id="timer-display" style="font-size: 4em; font-weight: bold; color: #16a34a;">${gameState.timeRemaining}</div>
                    <div style="font-size: 0.9em; color: #6b7280; margin-top: 5px;">Make your choice before time runs out!</div>
                </div>
            ` : ''}
            
            <div class="scenario-box ${isCatastrophic ? 'catastrophic' : ''}">
                <div class="scenario-title ${isCatastrophic ? 'catastrophic' : ''}">${isCatastrophic ? '🚨' : '⚗️'} Chemical Equilibrium Challenge</div>
                <div class="scenario-reaction">${gameState.currentScenario.reaction}</div>
                <div class="scenario-context">${gameState.currentScenario.context}</div>
                <div class="scenario-situation">${gameState.currentScenario.situation}</div>
            </div>
            
            <div class="toxicity-panel">
                <h3 style="margin-bottom: 15px; color: #991b1b; font-size: 1.3em;">☠️ Toxicity Level</h3>
                <div class="toxicity-item">
                    <div class="toxicity-header">
                        <span class="toxicity-label">Professors' Toxicity</span>
                        <span class="toxicity-value">${gameState.toxicity}%</span>
                    </div>
                    <div class="toxicity-bar-container">
                        <div class="toxicity-bar ${gameState.toxicity >= 70 ? 'danger' : ''}" style="width: ${gameState.toxicity}%"></div>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.9em; color: #7f1d1d;">
                        ${gameState.toxicity < 30 ? '✅ Healthy' : gameState.toxicity < 50 ? '⚠️ Mild poisoning' : gameState.toxicity < 70 ? '🔶 Moderate poisoning' : gameState.toxicity < 100 ? '🚨 SEVERE poisoning!' : '💀 FATAL!'}
                    </div>
                </div>
            </div>
            
            ${gameState.lastFeedback ? `
                <div class="feedback-box">
                    💬 ${gameState.lastFeedback}
                </div>
            ` : ''}
            
            <div class="options-panel">
                <h3 class="options-title">What do you do?</h3>
                <div class="option-buttons">
                    ${gameState.currentScenario.options.map((opt, idx) => `
                        <button class="option-btn" onclick="takeAction(${idx})" ${gameState.lastFeedback ? 'disabled' : ''}>
                            <div class="option-action">${opt.action}</div>
                            <div class="option-desc">${opt.desc}</div>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <style>
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        </style>
    `;
}

function takeAction(optionIndex) {
    // Stop the timer
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    // Reset background
    const container = document.getElementById('game-container');
    container.style.background = '';
    
    const option = gameState.currentScenario.options[optionIndex];
    gameState.toxicity = Math.min(100, gameState.toxicity + option.toxicity);
    gameState.lastFeedback = option.feedback;
    
    showGameScreen();
    
    setTimeout(() => {
        if (gameState.toxicity >= 100) {
            showDeath();
            return;
        }
        
        gameState.round++;
        setTimeout(() => {
            nextScenario();
        }, 500);
    }, 2500);
}

function showRescueChoice() {
    const container = document.getElementById('game-container');
    container.style.background = '';
    container.innerHTML = `
        <div class="screen choice-screen">
            <h1 style="color: #1e40af; margin-bottom: 30px;">🔧 MELODY AND LUCY! THEY ARE BACK! 🔧</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px; font-weight: bold;">They found the glass cutter!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                You kept their toxicity at only ${gameState.toxicity}% - they're in relatively good shape! 
                Melody and Lucy can cut them free now...
            </p>
            <div style="font-size: 4em; margin: 30px 0;">👨‍🔬❓👨‍🔬</div>
            <p style="font-size: 1.3em; font-weight: bold; color: #1f2937; margin-bottom: 30px;">
                Do you want to let her rescue them?
            </p>
            <div class="choice-buttons">
                <button class="choice-btn" style="background: #16a34a;" onclick="rescueProfessors(true)">
                    ✅ YES - Cut them free!
                </button>
                <button class="choice-btn" style="background: #dc2626;" onclick="rescueProfessors(false)">
                    ❌ NO - They stay
                </button>
            </div>
            <p style="font-size: 0.8em; color: #6b7280; margin-top: 20px; font-style: italic;">
                (Why would you even consider choosing no? What's wrong with you?)
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
    container.style.background = '';
    container.innerHTML = `
        <div class="screen victory-screen">
            <h1 class="victory-title">🎉 PERFECT RESCUE! 🎉</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You mastered equilibrium!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                With only ${gameState.toxicity}% toxicity, Professors Elmore and Matthews are perfectly fine! 
                They immediately remove the equilibrium content from the BISC/CHEM final and will add 10 points to everyone's final!
            </p>
            <div style="font-size: 5em; margin: 20px 0;">👨‍🔬✨👨‍🔬</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                Prof. Elmore: "Here is the queen of equilibrium! We will offer a tenure track position for you right now."
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Prof. Matthews: "Seriously, have you considered a chemistry major?"
            </p>
            <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 10px; padding: 15px; margin: 20px 0;">
                <p style="font-weight: bold; color: #065f46;">Final Toxicity: ${gameState.toxicity}%</p>
                <p style="font-size: 0.9em; color: #047857;">⭐ Excellent! Under 70%!</p>
            </div>
            <button onclick="startGame()" style="background: #16a34a;">Play Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

function showAbandoned() {
    const container = document.getElementById('game-container');
    container.style.background = '';
    container.innerHTML = `
        <div class="screen abandoned-screen">
            <h1 style="color: #6b21a8; font-size: 3em; margin-bottom: 20px;">😱 YOU MONSTER! 😱</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You told Melody and Lucy to leave them?!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                Professors Elmore and Matthews remain sealed in the beaker forever, 
                eternally shifting between reactants and products, 
                their consciousness trapped in an equilibrium state between life and un-life...
            </p>
            <div style="font-size: 5em; margin: 20px 0;">👻🧪👻</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                Prof. Elmore (crying from inside the glass): "This violates... every principle... I've ever taught..."
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Prof. Matthews (also trapped): "Why is the equilibrium not equilibriuming... Why is my student not studenting..."
            </p>
            <p style="font-size: 0.9em; color: #dc2626; font-weight: bold; margin: 20px 0;">
                (Somewhere, Le Chatelier is rolling in his grave. And it's YOUR fault. The Honor Code is fully disappointed in you.)
            </p>
            <button onclick="startGame()" style="background: #7c3aed;">Fix Your Horrible Mistake</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

function showSick() {
    const container = document.getElementById('game-container');
    container.style.background = '';
    container.innerHTML = `
        <div class="screen" style="background: linear-gradient(135deg, #fef3c7, #fed7aa); text-align: center;">
            <h1 style="color: #c2410c; font-size: 3em; margin-bottom: 20px;">🤢 SEVERELY POISONED 🤢</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">They're alive... barely!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                Melody and Lucy cut them free just in time, but with ${gameState.toxicity}% toxicity, 
                Professors Elmore and Matthews spent the next three weeks in the hospital. 
                Maybe this means no final for BISC/CHEM 116, but this is NOT the optimal way to keep you A grade.
                </p>
            <div style="font-size: 5em; margin: 20px 0;">🤮👨‍🔬👨‍🔬🤮</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                Prof. Matthews (from hospital bed): "Never... use... equilibrium... in your life... again..."
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Prof. ELmore (also hospitalized): "Consider dropping the pre-med track... DONT BE MY DOCTOR."
            </p>
            <div style="background: #fed7aa; border: 2px solid #ea580c; border-radius: 10px; padding: 15px; margin: 20px 0;">
                <p style="font-weight: bold; color: #9a3412;">Final Toxicity: ${gameState.toxicity}%</p>
                <p style="font-size: 0.9em; color: #c2410c;">⚠️ Threshold was 70%</p>
            </div>
            <button onclick="startGame()" style="background: #ea580c;">Better Luck Next Time</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

function showDeath() {
    const container = document.getElementById('game-container');
    container.style.background = '';
    container.innerHTML = `
        <div class="screen" style="background: linear-gradient(135deg, #1f2937, #374151); text-align: center;">
            <h1 style="color: #fca5a5; font-size: 3em; margin-bottom: 20px;">☠️ FATAL TOXICITY ☠️</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px; color: #fca5a5;">Toxicity reached 100%!</p>
            <p style="font-size: 1.1em; color: #d1d5db; margin-bottom: 20px;">
                The equilibrium shifted too far toward the toxic products. 
                Professors Elmore and Matthews succumbed to chemical poisoning before Melody and Lucy could cut them free...
            </p>
            <div style="font-size: 5em; margin: 20px 0;">💀🧪💀</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" style="filter: grayscale(100%);" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #d1d5db; margin: 20px 0;">
                "I told Don you're not ready for 116... I told him you are not suited for the class... Consider another major..." - Prof Matthew's last words
            </p>
            <div style="background: #7f1d1d; border: 2px solid #991b1b; border-radius: 10px; padding: 15px; margin: 20px 0;">
                <p style="font-weight: bold; color: #fca5a5;">Final Toxicity: ${gameState.toxicity}%</p>
            </div>
            <button onclick="startGame()" style="background: #dc2626;">Try Again</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

window.onload = showIntro;
