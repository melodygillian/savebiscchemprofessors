const EQUILIBRIUM_SCENARIOS = [
  {
    reaction: "2NO₂(g) ⇌ N₂O₄(g)",
    context: "Brown toxic nitrogen dioxide vs colorless dinitrogen tetroxide",
    situation: "The beaker is turning brown! NO₂ is the toxic one!",
    options: [
      { action: "Spray liquid nitrogen on the beaker", desc: "Cool it down dramatically!", toxicity: 2, feedback: "Exothermic forward! Less NO₂!" },
      { action: "Blast it with a heat gun", desc: "MAXIMUM HEAT!", toxicity: 25, feedback: "You madman! Endothermic reverse = MORE brown toxic gas!" },
      { action: "Increase pressure with a clamp", desc: "Squeeze the beaker!", toxicity: 3, feedback: "Fewer moles on right! Good thinking!" },
      { action: "Do nothing and panic", desc: "Freeze in terror", toxicity: 8, feedback: "Adam: 'DOING NOTHING IS STILL A CHOICE, HELP US!'" }
    ]
  },
  {
    reaction: "CO(g) + 2H₂(g) ⇌ CH₃OH(g)",
    context: "Toxic carbon monoxide vs methanol",
    situation: "CO levels rising! Your professors are turning pale!",
    options: [
      { action: "Pump in extra H₂ through the hole", desc: "More hydrogen gas!", toxicity: 1, feedback: "Le Chatelier saves the day! Shift right!" },
      { action: "Remove some CH₃OH with a syringe", desc: "Extract the product", toxicity: 2, feedback: "Product removal shifts equilibrium forward!" },
      { action: "Add a CO catalyst", desc: "Speed up CO reactions!", toxicity: 18, feedback: "Catalysts don't shift equilibrium, just reach it FASTER = faster poisoning!" },
      { action: "Open the hole wider", desc: "Let gases escape!", toxicity: 20, feedback: "CO escapes but also all the good stuff! Net: bad!" }
    ]
  },
  {
    reaction: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat",
    context: "Haber process - ammonia is pungent but N₂ and H₂ are relatively safe",
    situation: "Don: 'The ammonia smell is overwhelming!'",
    options: [
      { action: "Cool the beaker in ice", desc: "Lower the temperature", toxicity: 15, feedback: "Exothermic forward! MORE ammonia! Wrong way!" },
      { action: "Heat the beaker gently", desc: "Warm it up", toxicity: 3, feedback: "Endothermic reverse! Less ammonia!" },
      { action: "Increase pressure", desc: "Compress everything", toxicity: 16, feedback: "Fewer moles right = MORE ammonia! Oops!" },
      { action: "Decrease pressure", desc: "Release some pressure", toxicity: 4, feedback: "More moles left favored! Less ammonia!" }
    ]
  },
  {
    reaction: "H₂(g) + I₂(g) ⇌ 2HI(g)",
    context: "Iodine vapor (purple and irritating) vs hydrogen iodide",
    situation: "Purple iodine vapor swirling! Adam is coughing!",
    options: [
      { action: "Add more H₂ gas", desc: "Pump in hydrogen", toxicity: 2, feedback: "Excess reactant shifts right! Less I₂!" },
      { action: "Remove HI with a cold trap", desc: "Freeze out the product", toxicity: 1, feedback: "Product removal! Equilibrium shifts forward!" },
      { action: "Shake the beaker vigorously", desc: "Mix everything!", toxicity: 10, feedback: "Shaking doesn't change equilibrium! I₂ still toxic!" },
      { action: "Add argon gas", desc: "Dilute with inert gas", toxicity: 8, feedback: "Inert gas doesn't shift equilibrium at constant volume!" }
    ]
  },
  {
    reaction: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
    context: "All are toxic but Cl₂ is EXTREMELY toxic (greenish gas)",
    situation: "Green chlorine gas forming! This is really bad!",
    options: [
      { action: "Decrease volume/increase pressure", desc: "Compress the system", toxicity: 3, feedback: "Fewer moles left! Less Cl₂ formation!" },
      { action: "Increase volume/decrease pressure", desc: "Give it more space", toxicity: 22, feedback: "More moles right! WAY more Cl₂! Don: 'WHY?!'" },
      { action: "Cool everything down", desc: "Apply cold", toxicity: 7, feedback: "Temperature effect unclear here, modest help" },
      { action: "Add more PCl₅", desc: "Add more reactant", toxicity: 18, feedback: "You're making MORE of everything including Cl₂!" }
    ]
  },
  {
    reaction: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + heat",
    context: "SO₂ is toxic (sharp smell), SO₃ reacts with water to make acid",
    situation: "Choking on SO₂! The classic sulfur smell!",
    options: [
      { action: "Add pure O₂", desc: "Oxygen to the rescue!", toxicity: 2, feedback: "Excess O₂ drives forward! Less SO₂!" },
      { action: "Heat the beaker", desc: "Increase temperature", toxicity: 19, feedback: "Endothermic reverse! MORE SO₂! Adam: 'NO NO NO!'" },
      { action: "Cool the beaker", desc: "Use ice bath", toxicity: 3, feedback: "Exothermic forward! Less SO₂!" },
      { action: "Remove SO₃ vapor", desc: "Trap the product", toxicity: 1, feedback: "Product removal = equilibrium shift forward! Perfect!" }
    ]
  },
  {
    reaction: "CO₂(g) + H₂(g) ⇌ CO(g) + H₂O(g) + heat",
    context: "CO is super toxic, CO₂ is relatively safe",
    situation: "Carbon monoxide forming! The silent killer!",
    options: [
      { action: "Cool the system", desc: "Lower temperature", toxicity: 2, feedback: "Exothermic forward consumes CO!" },
      { action: "Heat the system", desc: "Raise temperature", toxicity: 20, feedback: "Endothermic reverse makes MORE CO! Don: 'TERRIBLE CHOICE!'" },
      { action: "Add more CO₂", desc: "Pump in carbon dioxide", toxicity: 4, feedback: "Shifts forward but also makes some CO. Mediocre." },
      { action: "Remove water vapor", desc: "Dry out the system", toxicity: 16, feedback: "Product removal but wrong product! Still favor CO formation!" }
    ]
  },
  {
    reaction: "2H₂S(g) + O₂(g) ⇌ 2S(s) + 2H₂O(g)",
    context: "H₂S is toxic (rotten egg smell), sulfur and water are safe",
    situation: "Rotten egg gas everywhere! Don: 'This is the worst one yet!'",
    options: [
      { action: "Pump in oxygen", desc: "Add O₂ through the hole", toxicity: 1, feedback: "Drives equilibrium right! Brilliant!" },
      { action: "Remove solid sulfur", desc: "Scrape it out somehow", toxicity: 3, feedback: "Product removal shifts right! Creative!" },
      { action: "Heat it up", desc: "Apply heat", toxicity: 12, feedback: "Helps kinetics but doesn't favor either side much. Meh." },
      { action: "Dilute with nitrogen", desc: "Add N₂ gas", toxicity: 9, feedback: "Inert gas won't help! Still toxic!" }
    ]
  },
  {
    reaction: "CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)",
    context: "CO is the toxic product here!",
    situation: "Carbon monoxide production accelerating!",
    options: [
      { action: "Remove CO as it forms", desc: "Trap it chemically", toxicity: 18, feedback: "Product removal shifts RIGHT = makes MORE CO! Wrong product!" },
      { action: "Remove H₂ as it forms", desc: "Vent the hydrogen", toxicity: 2, feedback: "This product removal drives forward, making CO, but H₂ removal is faster!" },
      { action: "Add more CH₄", desc: "More methane!", toxicity: 16, feedback: "You're feeding the toxic reaction!" },
      { action: "Add more H₂O", desc: "Steam injection!", toxicity: 14, feedback: "Also feeding the forward reaction! Don: 'STOP HELPING!'" }
    ]
  },
  {
    reaction: "4HCl(g) + O₂(g) ⇌ 2Cl₂(g) + 2H₂O(g)",
    context: "HCl is corrosive, Cl₂ is super toxic green gas",
    situation: "Green chlorine gas! Adam: 'I can taste it! NOT GOOD!'",
    options: [
      { action: "Remove Cl₂ immediately", desc: "Trap the chlorine", toxicity: 25, feedback: "Product removal drives equilibrium RIGHT = MORE Cl₂ formed! Infinite loop!" },
      { action: "Remove water vapor", desc: "Dry it out", toxicity: 23, feedback: "Also drives right! You're making it worse!" },
      { action: "Remove O₂", desc: "Eliminate oxygen", toxicity: 3, feedback: "Reactant removal shifts LEFT! Smart!" },
      { action: "Increase pressure", desc: "Compress it", toxicity: 5, feedback: "Fewer moles right, modest help" }
    ]
  },
  {
    reaction: "⚠️ CATASTROPHIC LEAK: Multiple equilibria!",
    context: "The beaker cracked slightly! Every reaction is happening at once!",
    situation: "CHAOS! Every toxic gas is forming simultaneously!",
    options: [
      { action: "Seal with epoxy immediately", desc: "Emergency repair!", toxicity: 5, feedback: "Quick thinking! Bought time!" },
      { action: "Dunk in ice water", desc: "EMERGENCY COOLING!", toxicity: 8, feedback: "Helps some, hurts others! Net: okay!" },
      { action: "Pressurize with nitrogen", desc: "Blast inert gas in!", toxicity: 15, feedback: "Doesn't help equilibria! Adam: 'SCIENCE HAS FAILED US!'" },
      { action: "Run away screaming", desc: "Abandon your professors", toxicity: 30, feedback: "Don: 'WE CAN SEE YOU THROUGH THE GLASS!'" }
    ]
  }
];

let gameState = {
    toxicity: 0,
    round: 1,
    currentScenario: null,
    lastFeedback: ''
};

function showIntro() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen">
            <h1 style="color: #7c2d12;">🧪 The Beaker Incident 🧪</h1>
            
            <div class="story-text">
                <p style="font-size: 1.3em; color: #dc2626; font-weight: bold; text-align: center; margin-bottom: 20px;">
                    "Nonono, I see you need to work harder on Chemistry!" 
                </p>
                
                <p>It was another day in <strong>CHEM 116</strong> when catastrophe struck... again.</p>
                
                <p><strong>Professor Don Elmore</strong> and <strong>Professor Adam Matthews</strong> were demonstrating chemical equilibrium to the class. Don had just finished saying, "And remember, Le Chatelier's principle states that—"</p>
                
                <p>Adam interrupted: "Hey Don, should this beaker be sealed THIS tight?"</p>
                
                <p class="highlight">💨 FFFFFFFFFSSSSSSHHHHH! 💨</p>
                
                <p>The demonstration beaker's seal <strong>malfunctioned and clamped shut with them inside!</strong> The tiny hole on top is just big enough to add chemicals, but not big enough for them to escape.</p>
                
                <p>Worse: <strong>The equilibrium reaction inside produces TOXIC gases!</strong></p>
                
                <div class="professor-images">
                    <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                    <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
                </div>
                
                <p>Don (muffled from inside): "The... the forward reaction makes poison!"</p>
                
                <p>Adam (panicking): "Find something to cut us out!"</p>
                
                <p>Your classmate Melody and Lucy run off to find tools, but it'll take <strong>10 rounds</strong> before she returns. You need to manipulate the equilibrium to minimize toxic product formation!</p>
                
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
        lastFeedback: ''
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
    
    showGameScreen();
}

function showGameScreen() {
    const container = document.getElementById('game-container');
    const isCatastrophic = gameState.currentScenario.reaction.includes('⚠️');
    
    container.innerHTML = `
        <div class="screen">
            <div class="game-header">
                <h1 style="color: #7c2d12;">Beaker Rescue</h1>
                <div class="round-counter">
                    <div class="round-label">Round</div>
                    <div class="round-number" style="color: #7c2d12;">${gameState.round}/10</div>
                </div>
            </div>
            
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
    `;
}

function takeAction(optionIndex) {
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
    container.innerHTML = `
        <div class="screen choice-screen">
            <h1 style="color: #1e40af; margin-bottom: 30px;">🔧 MELODY AND LUCY! THEY ARE BACK! 🔧</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px; font-weight: bold;">She found the glass cutter!</p>
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
    container.innerHTML = `
        <div class="screen victory-screen">
            <h1 class="victory-title">🎉 PERFECT RESCUE! 🎉</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">You mastered equilibrium!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                With only ${gameState.toxicity}% toxicity, Professors Elmore and Matthews are perfectly fine! 
                They immediately started planning next semester's syllabus. 
                (Though they're removing the "sealed beaker" demonstration.)
            </p>
            <div style="font-size: 5em; margin: 20px 0;">👨‍🔬✨👨‍🔬</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                Don: "You understand Le Chatelier better than most grad students!"
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Adam: "Seriously, have you considered a chemistry major?"
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
                Don (from inside the glass): "K = [Products]/[Reactants]... but our K... is now... zero..."
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Adam (also trapped): "This violates... every principle... I ever taught..."
            </p>
            <p style="font-size: 0.9em; color: #dc2626; font-weight: bold; margin: 20px 0;">
                (Somewhere, Le Chatelier is rolling in his grave. And it's YOUR fault.)
            </p>
            <button onclick="startGame()" style="background: #7c3aed;">Fix Your Horrible Mistake</button>
            <a href="index.html" style="text-decoration: none;"><button style="background: #6b7280; margin-top: 10px;">← Back to Menu</button></a>
        </div>
    `;
}

function showSick() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="screen" style="background: linear-gradient(135deg, #fef3c7, #fed7aa); text-align: center;">
            <h1 style="color: #c2410c; font-size: 3em; margin-bottom: 20px;">🤢 SEVERELY POISONED 🤢</h1>
            <p style="font-size: 1.5em; margin-bottom: 15px;">They're alive... barely!</p>
            <p style="font-size: 1.1em; color: #374151; margin-bottom: 20px;">
                Melody and Lucy cut them free just in time, but with ${gameState.toxicity}% toxicity, 
                Professors Elmore and Matthews spent the next three weeks in the hospital. 
                They're permanently banned from handling sealed glassware.
            </p>
            <div style="font-size: 5em; margin: 20px 0;">🤮👨‍🔬👨‍🔬🤮</div>
            <div class="professor-images">
                <img src="elmore.png" alt="Professor Elmore" class="professor-img" onerror="this.style.display='none'">
                <img src="matthews.png" alt="Professor Matthews" class="professor-img" onerror="this.style.display='none'">
            </div>
            <p style="font-style: italic; color: #6b7280; margin: 15px 0;">
                Adam (from hospital bed): "Never... using... equilibrium... in class... again..."
            </p>
            <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">
                Don (also hospitalized): "My liver hates you."
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
                "Le Chatelier... would be... disappointed..." - Don's last words
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
