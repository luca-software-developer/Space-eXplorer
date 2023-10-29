
/**
 * Rappresenta il gioco.
 */
class Game {

    /**
     * Fotogrammi al secondo, un valore troppo elevato può ridurre le prestazioni.
     */
    static FRAMES_PER_SECOND = 60;

    /**
     * Intervallo tra una visualizzazione e l'altra dello score.
     */
    static SCORE_BLINK_INTERVAL = 250;

    /**
     * Definisce il percorso dell'effetto sonoro del punteggio.
     */
    static SCORE_SOUND_PATH = `assets/Score.mp3`;

    /**
     * Definisce il percorso dell'effetto sonoro del Game Over.
     */
    static GAMEOVER_SOUND_PATH = `assets/GameOver.mp3`;

    /**
     * Definisce il percorso della colonna sonora.
     */
    static SOUNDTRACK_PATH = `assets/Soundtrack.mp3`;

    /**
     * Costruttore della classe Game.
     */
    constructor() {
        this.canvas = document.getElementById('background-layer');
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });
        this.gameObjects = [];
        this.score = 0;
        this.running = true;
        log(`Initialization`, `Game object instantiated.`);
    }

    /**
     * Restituisce l'elemento <canvas>.
     * @returns Restituisce l'elemento <canvas>.
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Restituisce il contesto di rendering del <canvas>.
     * @returns Restituisce il contesto di rendering del <canvas>.
     */
    getContext() {
        return this.context;
    }

    /**
     * Restituisce l'array di game objects.
     * @returns Restituisce l'array di game objects.
     */
    getGameObjects() {
        return this.gameObjects;
    }

    /**
     * Restituisce il punteggio attuale.
     * @returns Restituisce il punteggio attuale.
     */
    getScore() {
        return this.score;
    }

    /**
     * Imposta il punteggio attuale.
     * @param {number} score Punteggio attuale.
     */
    setScore(score) {
        this.score = score;
        this.updateScore();
    }

    /**
     * Aggiorna il punteggio al livello UI.
     */
    updateScore() {
        let scoreElement = document.getElementById(`score`);
        scoreElement.innerText = this.getScore();
        if (this.getScore() % 1000 == 0) {
            new Audio(Game.SCORE_SOUND_PATH).play();
            let visibleCounter = 0;
            let blinkHandle = setInterval(
                () => {
                    if (visibleCounter % 2 == 0) {
                        scoreElement.style.visibility = `visible`;
                    } else {
                        scoreElement.style.visibility = `hidden`;
                    }
                    if (visibleCounter == 10) {
                        scoreElement.style.textShadow = `none`;
                        clearInterval(blinkHandle);
                    }
                    visibleCounter++;
                },
                Game.SCORE_BLINK_INTERVAL
            );
        }
    }

    /**
     * Restituisce se il gioco è in corso.
     * @returns Restituisce se il gioco è in corso.
     */
    isRunning() {
        return this.running;
    }

    /**
     * Imposta se il gioco è in corso.
     * @param {boolean} running true se il gioco è in corso, false altrimenti.
     */
    setRunning(running) {
        this.running = running;
    }

    /**
     * Restituisce il Player.
     * @returns Restituisce il Player.
     * @see Player
     */
    getPlayer() {
        return this.player;
    }

    /**
     * Genera la slice verticale di background alla coordinata specificata.
     * @param {number} x Coordinata orizzontale della slice di background.
     */
    generateBackgroundSlice(x) {
        if (Math.random() > .5) {
            let y = Math.random() * this.getCanvas().offsetHeight;
            this.getContext().fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
            this.getContext().fillRect(x, y, 2, 2);
        }
    }

    /**
     * Genera il background iniziale.
     */
    generateInitialBackground() {
        for (let x = 0; x < this.getContext().canvas.width; x += 2) {
            this.generateBackgroundSlice(x);
        }
    }

    /**
     * Genera dinamicamente il background.
     */
    generateBackground() {
        let imageData = this.getContext().getImageData(1, 0, this.getContext().canvas.width - 1, this.getContext().canvas.height);
        this.getContext().putImageData(imageData, 0, 0);
        this.getContext().clearRect(this.getContext().canvas.width - 1, 0, 1, this.getContext().canvas.height);
        this.generateBackgroundSlice(this.getContext().canvas.width - 2);
        requestAnimationFrame(() => this.generateBackground());
    }

    /**
     * Esegue il setup del Player.
     */
    initPlayer() {
        this.player = new Player({
            x: Math.round(this.getContext().canvas.width / 2),
            y: Math.round(this.getContext().canvas.height / 2),
        });
        this.getGameObjects().push(this.player);
    }

    /**
     * Esegue il setup dei controlli.
     */
    initControls() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case `ArrowUp`: {
                    this.getPlayer().setPosition({
                        x: this.getPlayer().getPosition().x,
                        y: this.getPlayer().getPosition().y - Player.DELTA_Y
                    });
                    break;
                }
                case `ArrowDown`: {
                    this.getPlayer().setPosition({
                        x: this.getPlayer().getPosition().x,
                        y: this.getPlayer().getPosition().y + Player.DELTA_Y
                    });
                    break;
                }
                default: {
                    break;
                }
            }
        };
        document.onmousemove = (event) => {
            this.getPlayer().setPosition({
                x: this.getPlayer().getPosition().x,
                y: event.clientY
            });
        };
    }

    /**
     * Esegue le procedure necessarie alla gestione di un Game Over.
     */
    gameOver() {
        new Audio(Game.GAMEOVER_SOUND_PATH).play();
        let gameOverLayer = document.getElementById(`game-over-layer`);
        let gameOver = document.getElementById(`game-over`);
        let gameReturn = document.getElementById(`game-return`);

        gameReturn.onclick = () => {
            location.reload();
        };

        gameOverLayer.style.display = `flex`;
        gameOver.style.display = `initial`;
        gameReturn.style.display = `initial`;
    }

    /**
     * Esegue il setup della generazione di oggetti Asteroid.
     */
    initAsteroidGeneration() {
        let asteroidSpeed = Asteroid.INITIAL_SPEED;
        for (let index = 0; index < Math.ceil(Math.cbrt(this.getScore()) / 10); index++) {
            let asteroid = new Asteroid();
            this.getGameObjects().push(asteroid);
            asteroid.setSpeed(asteroidSpeed + Math.random() * asteroidSpeed / 10);
            asteroidSpeed += 10;
            let verticalComponent = Math.random() * 2 - 1;
            asteroid.setPosition({
                x: this.getContext().canvas.width + Asteroid.SPRITE_WIDTH,
                y: Math.round(Math.random() * this.getContext().canvas.height)
            });
            let asteroidHandle = setInterval(
                () => {
                    if (asteroid.getPosition().x < 0) {
                        this.getGameObjects().splice(this.getGameObjects().indexOf(asteroid), 1);
                        asteroid.remove();
                    }
                    asteroid.setPosition({
                        x: asteroid.getPosition().x - Asteroid.DELTA_X,
                        y: asteroid.getPosition().y + Math.random() * verticalComponent
                    });
                    if (this.isRunning() && this.getPlayer().collidesWith(asteroid)) {
                        log(`Collision detection`, `Collision between Player and Asteroid.`);
                        let explosion = new Explosion();
                        explosion.setPosition({
                            x: this.getPlayer().getPosition().x,
                            y: this.getPlayer().getPosition().y
                        });
                        setTimeout(
                            () => {
                                explosion.remove();
                                this.gameOver();
                            },
                            Explosion.DURATION
                        );
                        this.getPlayer().remove();
                        this.setRunning(false);
                        asteroid.remove();
                        clearInterval(asteroidHandle);
                    }
                },
                Math.round(1000 / asteroid.getSpeed())
            );
        }
        setTimeout(
            () => {
                requestAnimationFrame(() => this.initAsteroidGeneration());
            },
            Asteroid.INTERVAL
        );
    }

    /**
     * Esegue il setup del punteggio.
     */
    initScore() {
        this.setScore(this.getScore() + 1);
        if (this.isRunning()) {
            requestAnimationFrame(() => this.initScore());
        }
    }

    /**
     * Routine di inizializzazione del gioco.
     */
    init() {
        log(`Initialization`, `Starting soundtrack.`);
        let audio = new Audio(Game.SOUNDTRACK_PATH);
        audio.loop = true;
        audio.play();

        log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.resize();

        log(`Initialization`, `Setting 'onresize' event listener.`);
        onresize = () => this.resize();

        log(`Initialization`, `Setting scene background.`);
        this.generateInitialBackground();
        requestAnimationFrame(() => this.generateBackground());

        log(`Initialization`, `Positioning player for ${window.innerWidth}x${window.innerHeight}.`);
        this.initPlayer();

        log(`Initialization`, `Initializing Player controls.`);
        this.initControls();

        log(`Initialization`, `Initializing Asteroid object generation.`);
        requestAnimationFrame(() => this.initAsteroidGeneration());

        log(`Initialization`, `Initializing score system.`);
        requestAnimationFrame(() => this.initScore());
    }

    /**
     * Aggiorna le dimensioni del canvas adattando il background.
     */
    resize() {
        log(`Resize`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.getContext().canvas.width = window.innerWidth;
        this.getContext().canvas.height = window.innerHeight;
        log(`Resize`, `Generating background for ${window.innerWidth}x${window.innerHeight}.`);
        this.generateInitialBackground();
        if (this.getPlayer()) {
            log(`Resize`, `Repositioning player for ${window.innerWidth}x${window.innerHeight}.`);
            this.getPlayer().setPosition({
                x: Math.round(this.getContext().canvas.width / 2),
                y: this.getPlayer().getPosition().y,
            });
        }
    }

}

/**
 * Punto di ingresso del programma.
 */
let main = () => {
    let game = new Game();
    log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
    game.resize();

    log(`Initialization`, `Setting 'onresize' event listener.`);
    onresize = () => game.resize();

    log(`Initialization`, `Setting scene background.`);
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
