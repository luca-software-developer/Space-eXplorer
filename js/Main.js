"use strict";

/**
 * Punto di ingresso del programma.
 */
const main = () => {
    const game = new Game();
    Logger.log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
    game.resize();

    Logger.log(`Initialization`, `Setting 'onresize' event listener.`);
    onresize = () => game.resize();

    Logger.log(`Initialization`, `Setting scene background.`);
    game.generateInitialBackground();
    requestAnimationFrame(() => game.generateBackground());

    const gameStart = document.getElementById(`game-start`);
    const startGameLayer = document.getElementById(`start-game-layer`);
    const scoreContainer = document.getElementById(`score-container`);
    const scoreElement = document.getElementById(`score`);
    gameStart.onclick = () => {
        startGameLayer.style.display = `none`;
        scoreContainer.style.visibility = `visible`;
        scoreElement.style.visibility = `visible`;
        game.init();
    };
};

main();
