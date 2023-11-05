"use strict";

/**
 * Punto di ingresso del programma.
 */
let main = () => {
    let game = new Game();
    Logger.log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
    game.resize();

    Logger.log(`Initialization`, `Setting 'onresize' event listener.`);
    onresize = () => game.resize();

    Logger.log(`Initialization`, `Setting scene background.`);
    game.generateInitialBackground();
    requestAnimationFrame(() => game.generateBackground());

    let gameStart = document.getElementById(`game-start`);
    let startGameLayer = document.getElementById(`start-game-layer`);
    let scoreContainer = document.getElementById(`score-container`);
    let scoreElement = document.getElementById(`score`);
    gameStart.onclick = () => {
        startGameLayer.style.display = `none`;
        scoreContainer.style.visibility = `visible`;
        scoreElement.style.visibility = `visible`;
        game.init();
    };
};

main();
