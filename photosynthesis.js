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
    
    // KEEP last action feedback for display
    // Don't reset it here anymore
    
    showGameScreen();
}
