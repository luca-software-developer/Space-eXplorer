`use strict`;

/**
 * Space eXplorer Game
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/* Logging */
const log = (subject, message) => {
    console.log(`%c[${subject}] ${message}`, `font-style: italic; `);
}

/* Canvas, Context & GAME OVER Overlay */
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`, { willReadFrequently: true });
const startGame = document.getElementById(`start-game`);
const gameOverOverlay = document.getElementById(`gameover-overlay`);

/* GameObjects */
const spaceship = document.getElementById(`spaceship`);
const asteroid = document.getElementById(`asteroid`);
const explosion = document.getElementById(`explosion`);
const enemy = document.getElementById(`enemy`);
const playerBullet = document.getElementById(`playerbullet`);
const enemyBullet = document.getElementById(`enemybullet`);

/* Scene Background Color */
const BACKGROUND_COLOR = `#010b19`;
const STAR_COLOR = `#ffffff`;
const FADING_STAR_COLOR = `rgba(255, 255, 255, <alpha>)`;

/* Soundtrack & SFX */
const EXPLOSION_SFX_PATH = `audio/explosion.mp3`;
const GAMEOVER_SFX_PATH = `audio/gameover.mp3`;
const SCORE_SFX_PATH = `audio/score.mp3`;
const SOUNDTRACK_PATH = `audio/soundtrack.mp3`;

/* Player Constants */
const PLAYER_WIDTH = 300;
const PLAYER_HEIGHT = 92;
const PLAYER_FRAMES = 65;
const PLAYER_RELATIVE_POSITION_X = 3;
const PLAYER_ANIMATION_FRAMERATE = 15;

/* Asteroid Constants */
const ASTEROID_WIDTH = 100;
const ASTEROID_HEIGHT = 100;
const ASTEROID_FRAMES = 245;
const ASTEROID_ANIMATION_FRAMERATE = 15;
const ASTEROID_INTERVAL = 3000;
const ASTEROID_DELTA_X = 3;

/* Explosion Constants */
const EXPLOSION_WIDTH = 800;
const EXPLOSION_HEIGHT = 600;
const EXPLOSION_FRAMES = 60;

/* Enemy Constants */
const ENEMY_WIDTH = 150;
const ENEMY_HEIGHT = 72;
const ENEMY_INTERVAL = 3000;

/* PlayerBullet Constants */
const PLAYERBULLET_WIDTH = 50;
const PLAYERBULLET_HEIGHT = 29;
const PLAYERBULLET_DELTA_X = 6;
const PLAYERBULLET_RELATIVE_POSITION_Y = 3;

/* EnemyBullet Constants */
const ENEMYBULLET_WIDTH = 50;
const ENEMYBULLET_HEIGHT = 29;
const ENEMYBULLET_INTERVAL = 1000;

/* Score Constants */
const SCORE_LABEL_POSITION_X = 30;
const SCORE_LABEL_POSITION_Y = 30;
const SCORE_BLINKS = 6;
const SCORE_BLINK_INTERVAL = 500;
const SCORE_POSITION_X = 30;
const SCORE_POSITION_Y = 50;
const SCORE_LABEL_FONT = `12px "Arial"`;
const SCORE_LABEL_COLOR = `#eeeeee`;
const SCORE_LABEL_TEXTALIGN = `right`;
const SCORE_LABEL_BASELINE = `top`;
const SCORE_LABEL_TEXT = `SCORE`;
const SCORE_FONT = `25px "Press Start 2P"`;
const SCORE_COLOR = `#ffffff`;
const SCORE_TEXTALIGN = `right`;
const SCORE_BASELINE = `top`;

/* Canvas Sizing */
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

/* Initial Player Positioning */
let x = canvasWidth / 3 - PLAYER_WIDTH / 2;
let y = canvasHeight / 2 - PLAYER_HEIGHT / 2;

/* Game Variables */
let keys = [];
let score = 0;
let imageData = null;
let isRunning = false;

/* Score Variables */
let remainingScoreBlinks = 0;
let isScoreVisible = true;
let lastScoreBlink = Date.now();

/* Player Variables */
let playerFrame = 0;
let isPlayerAlive = true;
let lastPlayerFrame = Date.now();

/* Asteroid Variables */
let asteroidsX = [];
let asteroidsY = [];
let asteroidFrame = 0;
let lastAsteroid = Date.now();
let lastAsteroidFrame = Date.now();

/* Enemy Variables */
let enemiesX = [];
let enemiesY = [];
let lastEnemy = Date.now();

/* Explosion Variables */
let explosionsX = [];
let explosionsY = [];
let explosionsFrames = [];

/* PlayerBullet Variables */
let playerBulletsX = [];
let playerBulletsY = [];

/* EnemyBullet Variables */
let enemyBulletsX = [];
let enemyBulletsY = [];
let lastEnemyBullets = [];

/* Canvas Initial Sizing */
canvas.setAttribute(`width`, innerWidth);
canvas.setAttribute(`height`, innerHeight);

/* Clear Canvas */
const clear = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    log(`Canvas`, `Cleared canvas.`);
};

/* Canvas Dynamic Resizing */
window.onresize = () => {
    canvas.setAttribute(`width`, innerWidth);
    canvas.setAttribute(`height`, innerHeight);
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    x = canvasWidth / PLAYER_RELATIVE_POSITION_X - PLAYER_WIDTH / 2;
    y = canvasHeight / 2 - PLAYER_HEIGHT / 2;
    clear();
    imageData = null;
    drawBackground();
    log(`Resize`, `Resized <canvas> for ${innerWidth}x${innerHeight} resolution.`);
};

/* Scene Background Drawing Routine (called at each frame) */
const drawBackground = () => {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = STAR_COLOR;
    if (imageData == null) {
        for (let x = 0; x <= canvasWidth; x += 2) {
            if (Math.random() > .5) {
                const y = Math.random() * canvasHeight;
                ctx.fillStyle = FADING_STAR_COLOR.replace(`<alpha>`, Math.random());
                ctx.fillRect(x, y, 2, 2);
            }
        }
    } else {
        ctx.putImageData(imageData, 0, 0);
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(canvasWidth - 2, 0, 2, canvasHeight);
        ctx.fillStyle = STAR_COLOR;
        if (Math.random() > .5) {
            const y = Math.random() * canvasHeight;
            ctx.fillStyle = FADING_STAR_COLOR.replace(`<alpha>`, Math.random());
            ctx.fillRect(canvasWidth - 2, y, 2, 2);
        }
    }
    imageData = ctx.getImageData(2, 0, canvasWidth - 2, canvasHeight);
    log(`Background`, `Scene Background Drawing Routine completed.`);
};

/* Player Drawing Routine */
const drawPlayer = () => {
    ctx.drawImage(spaceship, PLAYER_WIDTH * playerFrame, 0, PLAYER_WIDTH, PLAYER_HEIGHT, x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
    if (Date.now() - lastPlayerFrame > 1000 / PLAYER_ANIMATION_FRAMERATE) {
        playerFrame = (playerFrame + 1) % PLAYER_FRAMES;
        lastPlayerFrame = Date.now();
    }
    log(`Player`, `Player Drawing Routine completed.`);
};

/* Score Saving Routine */
const saveScore = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../save-score.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            log(`Score Saving`, `Score Saving Routine completed.`);
        }
    };
    xhr.send('score=' + score);
};

/* Player Collision Routine, spawns Explosion GameObject */
const checkForPlayerCollision = () => {
    let isInCollision = false;
    for (let index = 0; index < asteroidsX.length; index++) {
        const isInHorizontalCollision = x + PLAYER_WIDTH / 2 < asteroidsX[index] + ASTEROID_WIDTH && x + PLAYER_WIDTH > asteroidsX[index];
        const isInVerticalCollision = y < asteroidsY[index] + ASTEROID_HEIGHT && y + PLAYER_HEIGHT > asteroidsY[index];
        isInCollision = isInHorizontalCollision && isInVerticalCollision;
        if (isInCollision) {
            log(`Collision Detection`, `Collision between Player and Asteroid.`);
            asteroidsX.splice(index, 1);
            asteroidsY.splice(index, 1);
            spawnExplosion(x + PLAYER_WIDTH / 2, y + PLAYER_HEIGHT / 2);
            isPlayerAlive = false;
            new Audio(GAMEOVER_SFX_PATH).play();
            gameOverOverlay.style.display = `flex`;
            saveScore();
            return isInCollision;
        }
    }
    for (let index = 0; index < enemiesX.length; index++) {
        const isInHorizontalCollision = x + PLAYER_WIDTH / 2 < enemiesX[index] + ENEMY_WIDTH && x + PLAYER_WIDTH > enemiesX[index];
        const isInVerticalCollision = y < enemiesY[index] + ENEMY_HEIGHT && y + PLAYER_HEIGHT > enemiesY[index];
        isInCollision = isInHorizontalCollision && isInVerticalCollision;
        if (isInCollision) {
            log(`Collision Detection`, `Collision between Player and Enemy.`);
            enemiesX.splice(index, 1);
            enemiesY.splice(index, 1);
            spawnExplosion(x + PLAYER_WIDTH / 2, y + PLAYER_HEIGHT / 2);
            isPlayerAlive = false;
            new Audio(GAMEOVER_SFX_PATH).play();
            gameOverOverlay.style.display = `flex`;
            saveScore();
            return isInCollision;
        }
    }
    for (let index = 0; index < enemyBulletsX.length; index++) {
        const isInHorizontalCollision = x + PLAYER_WIDTH / 2 < enemyBulletsX[index] + ENEMYBULLET_WIDTH && x + PLAYER_WIDTH > enemyBulletsX[index];
        const isInVerticalCollision = y < enemyBulletsY[index] + ENEMYBULLET_HEIGHT && y + PLAYER_HEIGHT > enemyBulletsY[index];
        isInCollision = isInHorizontalCollision && isInVerticalCollision;
        if (isInCollision) {
            log(`Collision Detection`, `Collision between Player and EnemyBullet.`);
            enemyBulletsX.splice(index, 1);
            enemyBulletsY.splice(index, 1);
            spawnExplosion(x + PLAYER_WIDTH / 2, y + PLAYER_HEIGHT / 2);
            isPlayerAlive = false;
            new Audio(GAMEOVER_SFX_PATH).play();
            gameOverOverlay.style.display = `flex`;
            saveScore();
            return isInCollision;
        }
    }
    log(`Collision Detection`, `Player Collision Detection Routine completed.`);
    return isInCollision;
};

/* Asteroid Drawing Routine */
const drawAsteroid = (x, y) => {
    ctx.drawImage(asteroid, ASTEROID_WIDTH * asteroidFrame, 0, ASTEROID_WIDTH, ASTEROID_HEIGHT, x, y, ASTEROID_WIDTH, ASTEROID_HEIGHT);
    if (Date.now() - lastAsteroidFrame > 1000 / ASTEROID_ANIMATION_FRAMERATE) {
        asteroidFrame = (asteroidFrame + 1) % ASTEROID_FRAMES;
        lastAsteroidFrame = Date.now();
    }
    log(`Asteroid`, `Asteroid Drawing Routine completed.`);
};

/* Asteroids Updating Routine (called at each frame) */
const updateAsteroids = () => {
    for (let index = 0; index < asteroidsX.length; index++) {
        if (asteroidsX[index] < -ASTEROID_WIDTH) {
            asteroidsX.splice(index, 1);
            asteroidsY.splice(index, 1);
        }
    }
    for (let index = 0; index < asteroidsX.length; index++) {
        drawAsteroid(asteroidsX[index], asteroidsY[index]);
        asteroidsX[index] -= ASTEROID_DELTA_X;
    }
    log(`Asteroid`, `Asteroids Updating Routine completed.`);
};

/* Asteroid Automatic Spawning Routine (called at each frame) */
const spawnAsteroid = () => {
    if (Date.now() - lastAsteroid > ASTEROID_INTERVAL) {
        asteroidsX.push(canvasWidth + ASTEROID_WIDTH / 2);
        asteroidsY.push((Math.random() * (canvasHeight - 2 * ASTEROID_HEIGHT)) + ASTEROID_HEIGHT);
        lastAsteroid = Date.now();
    }
    log(`Asteroid`, `Asteroid Automatic Spawning Routine completed.`);
};

/* Explosion Drawing Routine */
const drawExplosion = (x, y, explosionFrame) => {
    x = x - EXPLOSION_WIDTH / 2;
    y = y - EXPLOSION_HEIGHT / 2;
    ctx.drawImage(explosion, EXPLOSION_WIDTH * explosionFrame, 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, x, y, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);
    log(`Explosion`, `Explosion Drawing Routine completed.`);
};

/* Explosions Updating Routine (called at each frame) */
const updateExplosions = () => {
    for (let index = 0; index < explosionsX.length; index++) {
        drawExplosion(explosionsX[index], explosionsY[index], explosionsFrames[index]);
        explosionsFrames[index]++;
        if (explosionsFrames[index] == EXPLOSION_FRAMES) {
            explosionsX.splice(index, 1);
            explosionsY.splice(index, 1);
            explosionsFrames.splice(index, 1);
        }
    }
    log(`Explosion`, `Explosions Updating Routine completed.`);
};

/* Explosion Spawning Routine */
const spawnExplosion = (x, y) => {
    explosionsX.push(x);
    explosionsY.push(y);
    explosionsFrames.push(0);
    new Audio(EXPLOSION_SFX_PATH).play();
    log(`Explosion`, `Explosion Spawning Routine completed.`);
};

/* Enemy Drawing Routine */
const drawEnemy = (x, y) => {
    ctx.drawImage(enemy, 0, 0, ENEMY_WIDTH, ENEMY_HEIGHT, x, y, ENEMY_WIDTH, ENEMY_HEIGHT);
    log(`Enemy`, `Enemy Drawing Routine completed.`);
};

/* Enemies Updating Routine (called at each frame) */
const updateEnemies = () => {
    for (let index = 0; index < enemiesX.length; index++) {
        if (enemiesX[index] < -ENEMY_WIDTH) {
            enemiesX.splice(index, 1);
            enemiesY.splice(index, 1);
            lastEnemyBullets.splice(index, 1);
        }
    }
    for (let index = 0; index < enemiesX.length; index++) {
        drawEnemy(enemiesX[index], enemiesY[index]);
        enemiesX[index] -= 4;
    }
    log(`Enemy`, `Enemies Updating Routine completed.`);
};

/* Enemy Spawning Routine (called at each frame) */
const spawnEnemy = () => {
    if (Date.now() - lastEnemy > ENEMY_INTERVAL) {
        enemiesX.push(canvasWidth + ENEMY_WIDTH / 2);
        enemiesY.push((Math.random() * (canvasHeight - 2 * ENEMY_HEIGHT)) + ENEMY_HEIGHT);
        lastEnemyBullets.push(Date.now());
        lastEnemy = Date.now();
    }
    log(`Enemy`, `Enemy Spawning Routine completed.`);
};

/* PlayerBullet Drawing Routine */
const drawPlayerBullet = (x, y) => {
    ctx.drawImage(playerBullet, 0, 0, PLAYERBULLET_WIDTH, PLAYERBULLET_HEIGHT, x, y, PLAYERBULLET_WIDTH, PLAYERBULLET_HEIGHT);
    log(`PlayerBullet`, `PlayerBullet Drawing Routine completed.`);
};

/* PlayerBullets Updating Routine (called at each frame) */
const updatePlayerBullets = () => {
    for (let index = 0; index < playerBulletsX.length; index++) {
        if (playerBulletsX[index] > canvasWidth + PLAYERBULLET_WIDTH) {
            playerBulletsX.splice(index, 1);
            playerBulletsY.splice(index, 1);
        }
    }
    for (let index = 0; index < playerBulletsX.length; index++) {
        drawPlayerBullet(playerBulletsX[index], playerBulletsY[index]);
        playerBulletsX[index] += PLAYERBULLET_DELTA_X;
    }
    log(`PlayerBullet`, `PlayerBullets Updating Routine completed.`);
};

/* PlayerBullet Spawning Routine */
const spawnPlayerBullet = () => {
    playerBulletsX.push(x + PLAYER_WIDTH);
    playerBulletsY.push(y + PLAYER_HEIGHT / PLAYERBULLET_RELATIVE_POSITION_Y);
    log(`PlayerBullet`, `PlayerBullet Spawning Routine completed.`);
};

/* PlayerBullet Collision Routine, spawns Explosion GameObject */
const checkForPlayerBulletCollision = () => {
    let isInCollision = false;
    for (let i = 0; i < playerBulletsX.length; i++) {
        for (let index = 0; index < asteroidsX.length; index++) {
            const isInHorizontalCollision = playerBulletsX[i] + PLAYERBULLET_WIDTH / 2 < asteroidsX[index] + ASTEROID_WIDTH && playerBulletsX[i] + PLAYERBULLET_WIDTH > asteroidsX[index];
            const isInVerticalCollision = playerBulletsY[i] < asteroidsY[index] + ASTEROID_HEIGHT && playerBulletsY[i] + PLAYERBULLET_HEIGHT > asteroidsY[index];
            isInCollision = isInHorizontalCollision && isInVerticalCollision;
            if (isInCollision) {
                log(`Collision Detection`, `Collision between PlayerBullet and Asteroid.`);
                asteroidsX.splice(index, 1);
                asteroidsY.splice(index, 1);
                spawnExplosion(playerBulletsX[i], playerBulletsY[i]);
                playerBulletsX.splice(i, 1);
                playerBulletsY.splice(i, 1);
                return isInCollision;
            }
        }
        for (let index = 0; index < enemiesX.length; index++) {
            const isInHorizontalCollision = playerBulletsX[i] + PLAYERBULLET_WIDTH / 2 < enemiesX[index] + ENEMY_WIDTH && playerBulletsX[i] + PLAYERBULLET_WIDTH > enemiesX[index];
            const isInVerticalCollision = playerBulletsY[i] < enemiesY[index] + ENEMY_HEIGHT && playerBulletsY[i] + PLAYERBULLET_HEIGHT > enemiesY[index];
            isInCollision = isInHorizontalCollision && isInVerticalCollision;
            if (isInCollision) {
                log(`Collision Detection`, `Collision between PlayerBullet and Enemy.`);
                enemiesX.splice(index, 1);
                enemiesY.splice(index, 1);
                spawnExplosion(playerBulletsX[i], playerBulletsY[i]);
                playerBulletsX.splice(i, 1);
                playerBulletsY.splice(i, 1);
                return isInCollision;
            }
        }
    }
    log(`Collision Detection`, `PlayerBullet Collision Detection Routine completed.`);
    return isInCollision;
};

/* EnemyBullet Drawing Routine */
const drawEnemyBullet = (x, y) => {
    ctx.drawImage(enemyBullet, 0, 0, ENEMYBULLET_WIDTH, ENEMYBULLET_HEIGHT, x, y, ENEMYBULLET_WIDTH, ENEMYBULLET_HEIGHT);
    log(`EnemyBullet`, `EnemyBullet Drawing Routine completed.`);
};

/* EnemyBullets Updating Routine (called at each frame) */
const updateEnemyBullets = () => {
    for (let index = 0; index < enemyBulletsX.length; index++) {
        if (enemyBulletsX[index] < -ENEMYBULLET_WIDTH) {
            enemyBulletsX.splice(index, 1);
            enemyBulletsY.splice(index, 1);
        }
    }
    for (let index = 0; index < enemyBulletsX.length; index++) {
        drawEnemyBullet(enemyBulletsX[index], enemyBulletsY[index]);
        enemyBulletsX[index] -= 6;
    }
    log(`EnemyBullet`, `EnemyBullets Updating Routine completed.`);
};

/* EnemyBullets Spawning Routine (called at each frame) */
const spawnEnemyBullets = () => {
    for (let index = 0; index < enemiesX.length; index++) {
        if (Date.now() - lastEnemyBullets[index] > ENEMYBULLET_INTERVAL) {
            enemyBulletsX.push(enemiesX[index] - ENEMYBULLET_WIDTH);
            enemyBulletsY.push(enemiesY[index] + ENEMY_HEIGHT / 2);
            lastEnemyBullets[index] = Date.now();
        }
    }
    log(`EnemyBullet`, `EnemyBullets Spawning Routine completed.`);
};

/* Score Updating Routine (called at each frame) */
const updateScore = () => {
    ctx.font = SCORE_LABEL_FONT;
    ctx.fillStyle = SCORE_LABEL_COLOR;
    ctx.textAlign = SCORE_LABEL_TEXTALIGN;
    ctx.textBaseline = SCORE_LABEL_BASELINE;
    ctx.fillText(SCORE_LABEL_TEXT, canvasWidth - SCORE_LABEL_POSITION_X, SCORE_LABEL_POSITION_Y);
    ctx.font = SCORE_FONT;
    ctx.fillStyle = SCORE_COLOR;
    ctx.textAlign = SCORE_TEXTALIGN;
    ctx.textBaseline = SCORE_BASELINE;
    if (remainingScoreBlinks > 0) {
        if (Date.now() - lastScoreBlink > SCORE_BLINK_INTERVAL) {
            if (isScoreVisible) {
                isScoreVisible = false;
            } else {
                ctx.fillText(score, canvasWidth - SCORE_POSITION_X, SCORE_POSITION_Y);
                isScoreVisible = true;
            }
            remainingScoreBlinks--;
            lastScoreBlink = Date.now();
        } else {
            if (isScoreVisible) {
                ctx.fillText(score, canvasWidth - SCORE_POSITION_X, SCORE_POSITION_Y);
            }
        }
    } else {
        ctx.fillText(score, canvasWidth - SCORE_POSITION_X, SCORE_POSITION_Y);
    }
    if (score % 1000 == 0) {
        new Audio(SCORE_SFX_PATH).play();
        remainingScoreBlinks = SCORE_BLINKS;
    }
    log(`Score`, `Score Updating Routine completed.`);
};

/* Main Updating Routine (called at each frame) */
const update = () => {
    drawBackground();

    if (isRunning) {
        spawnAsteroid();
        updateAsteroids();

        spawnEnemy();
        updateEnemies();

        updateExplosions();

        updatePlayerBullets();
        checkForPlayerBulletCollision();

        spawnEnemyBullets();
        updateEnemyBullets();

        if (isPlayerAlive) {
            drawPlayer();
            checkForPlayerCollision();
            score++;
        }

        updateScore();
    }

    log(`Update`, `Main Updating Routine completed.`);
    requestAnimationFrame(update)
};

/* Player Position Updating Routine */
const updatePosition = () => {
    if (!isPlayerAlive) {
        return;
    }
    if (keys.includes(`Enter`)) {
        spawnPlayerBullet();
    }
    log(`Controls`, `Player Position Updating Routine completed.`);
};

/* Start Game Button Handler */
startGame.onclick = () => {
    const startOverlay = document.getElementById(`start-overlay`);
    startOverlay.style.display = `none`;
    const audio = new Audio(SOUNDTRACK_PATH);
    audio.loop = true;
    audio.play();
    isRunning = true;
    log(`Start Game`, `Start Game Button Handler completed.`);
};

/* Game Controls */
document.onkeydown = (event) => {
    if (!keys.includes(event.key)) {
        keys.push(event.key);
    }
    updatePosition();
    log(`Controls`, `Key [${event.key}] down.`);
};

document.onkeyup = (event) => {
    keys.splice(keys.indexOf(event.key), 1);
    updatePosition();
    log(`Controls`, `Key [${event.key}] up.`);
};

document.onmousemove = (event) => {
    if (!isPlayerAlive) {
        return;
    }
    if (event.clientY < PLAYER_HEIGHT / 2) {
        y = 0;
        return;
    }
    if (event.clientY > canvasHeight - PLAYER_HEIGHT / 2) {
        y = canvasHeight - PLAYER_HEIGHT;
        return;
    }
    y = event.clientY - PLAYER_HEIGHT / 2;
    log(`Controls`, `Mouse at (${event.clientX}, ${event.clientY}).`);
};

document.ontouchmove = (event) => {
    if (!isPlayerAlive) {
        return;
    }
    y = event.changedTouches[0].clientY - PLAYER_HEIGHT / 2;
    log(`Controls`, `Touch at (${event.changedTouches[0].clientX}, ${event.changedTouches[0].clientY}).`);
};

window.onload = () => {
    log(`Loading`, `Game Loading completed.`);
    requestAnimationFrame(update);
};

canvas.onclick = (event) => {
    log(`Controls`, `Click at (${event.clientX}, ${event.clientY}).`);
    spawnPlayerBullet();
};