"use strict";

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
    static SCORE_SOUND_PATH = `assets/Audio/SFX/Score.mp3`;

    /**
     * Definisce il percorso dell'effetto sonoro del Game Over.
     */
    static GAMEOVER_SOUND_PATH = `assets/Audio/SFX/GameOver.mp3`;

    /**
     * Definisce il percorso della colonna sonora.
     */
    static SOUNDTRACK_PATH = `assets/Audio/Music/Soundtrack.mp3`;

    /**
     * Costruttore della classe Game.
     */
    constructor() {
        this.canvas = document.getElementById('background-layer');
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });
        this.gameObjects = [];
        this.score = 0;
        this.running = true;
        Logger.log(`Initialization`, `Game object instantiated.`);
    }

    /**
     * Restituisce l'elemento <canvas>.
     * 
     * @returns Restituisce l'elemento <canvas>.
     */
    getCanvas() {
        return this.canvas;
    }

    /**
     * Restituisce il contesto di rendering del <canvas>.
     * 
     * @returns Restituisce il contesto di rendering del <canvas>.
     */
    getContext() {
        return this.context;
    }

    /**
     * Restituisce l'array di GameObject.
     * 
     * @returns Restituisce l'array di GameObject.
     */
    getGameObjects() {
        return this.gameObjects;
    }

    /**
     * Restituisce il punteggio attuale.
     * 
     * @returns Restituisce il punteggio attuale.
     */
    getScore() {
        return this.score;
    }

    /**
     * Imposta il punteggio attuale.
     * 
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
        const scoreElement = document.getElementById(`score`);
        scoreElement.innerText = this.getScore();
        if (this.getScore() % 1000 == 0) {
            new Audio(Game.SCORE_SOUND_PATH).play();
            let visibleCounter = 0;
            const blinkHandle = setInterval(
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
     * 
     * @returns Restituisce se il gioco è in corso.
     */
    isRunning() {
        return this.running;
    }

    /**
     * Imposta se il gioco è in corso.
     * 
     * @param {boolean} running true se il gioco è in corso, false altrimenti.
     */
    setRunning(running) {
        this.running = running;
    }

    /**
     * Restituisce il Player.
     * 
     * @returns Restituisce il Player.
     * @see Player
     */
    getPlayer() {
        return this.player;
    }

    /**
     * Genera la slice verticale di background alla coordinata specificata.
     * 
     * @param {number} x Coordinata orizzontale della slice di background.
     */
    generateBackgroundSlice(x) {
        if (Math.random() > .5) {
            const y = Math.random() * this.getCanvas().offsetHeight;
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
        const imageData = this.getContext().getImageData(1, 0, this.getContext().canvas.width - 1, this.getContext().canvas.height);
        this.getContext().putImageData(imageData, 0, 0);
        this.getContext().clearRect(this.getContext().canvas.width - 1, 0, 1, this.getContext().canvas.height);
        this.generateBackgroundSlice(this.getContext().canvas.width - 2);
        requestAnimationFrame(() => this.generateBackground());
    }

    /**
     * Esegue il setup del Player.
     */
    initPlayer() {
        this.player = new Player(new Position(
            Math.round(this.getContext().canvas.width / 3),
            Math.round(this.getContext().canvas.height / 2)
        ));
        this.getGameObjects().push(this.getPlayer());
    }

    /**
     * Esegue il setup dei controlli.
     */
    initControls() {
        document.onkeydown = (event) => {
            event.preventDefault();
            switch (event.key) {
                case `ArrowUp`: {
                    this.getPlayer().setPosition(new Position(
                        this.getPlayer().getPosition().getX(),
                        this.getPlayer().getPosition().getY() - Player.DELTA_Y
                    ));
                    break;
                }
                case `ArrowDown`: {
                    this.getPlayer().setPosition(new Position(
                        this.getPlayer().getPosition().getX(),
                        this.getPlayer().getPosition().getY() + Player.DELTA_Y
                    ));
                    break;
                }
                case `Enter`: {
                    this.getPlayer().getSprite().click();
                    break;
                }
                default: {
                    break;
                }
            }
        };
        document.onmousemove = (event) => {
            event.preventDefault();
            this.getPlayer().setPosition(new Position(
                this.getPlayer().getPosition().getX(),
                event.clientY
            ));
        };
        document.ontouchmove = (event) => {
            event.preventDefault();
            this.getPlayer().setPosition(new Position(
                this.getPlayer().getPosition().getX(),
                event.changedTouches[0].clientY
            ));
        };
        this.getPlayer().getSprite().onclick = () => {
            this.getPlayer().generateBullet(this, this.getGameObjects());
        }
    }

    /**
     * Esegue le procedure necessarie alla gestione di un Game Over.
     */
    gameOver() {
        new Audio(Game.GAMEOVER_SOUND_PATH).play();
        const gameOverLayer = document.getElementById(`game-over-layer`);
        const gameOver = document.getElementById(`game-over`);
        const gameReturn = document.getElementById(`game-return`);

        gameReturn.onclick = () => {
            location.reload();
        };

        gameOverLayer.style.display = `flex`;
        gameOver.style.display = `initial`;
        gameReturn.style.display = `initial`;
    }

    /**
     * Esegue il setup della generazione di oggetti.
     */
    initObjectGeneration() {
        let objectSpeed = Math.min(Asteroid.INITIAL_SPEED, Enemy.INITIAL_SPEED);
        for (let index = 0; index < Math.ceil(Math.cbrt(this.getScore()) / 10); index++) {
            let object = null;
            if (Math.random() > .5) {
                object = new Asteroid();
            } else {
                object = new Enemy(this, this.getPlayer());
            }
            this.getGameObjects().push(object);
            object.setSpeed(objectSpeed + Math.random() * objectSpeed / 10);
            objectSpeed += 0.1;
            object.setPosition(new Position(
                this.getContext().canvas.width + object.getSize().getWidth(),
                Math.round(Math.random() * this.getContext().canvas.height)
            ));
            const objectHandle = setInterval(
                () => {
                    if (object.getPosition().getX() + object.getSize().getWidth() < 0 || object.getPosition().getY() + object.getSize().getHeight() < 0) {
                        this.getGameObjects().splice(this.getGameObjects().indexOf(object), 1);
                        object.remove();
                    }
                    object.setPosition(new Position(
                        object.getPosition().getX() - 1,
                        object.getPosition().getY()
                    ));
                    if (this.isRunning() && this.getPlayer().collidesWith(object)) {
                        Logger.log(`Collision detection`, `Collision between Player and Object.`);
                        const explosion = new Explosion();
                        explosion.setPosition(new Position(
                            this.getPlayer().getPosition().getX(),
                            this.getPlayer().getPosition().getY()
                        ));
                        setTimeout(
                            () => {
                                explosion.remove();
                                this.gameOver();
                            },
                            Explosion.DURATION
                        );
                        this.getPlayer().remove();
                        this.setRunning(false);
                        object.remove();
                        clearInterval(objectHandle);
                    }
                },
                Math.round(1000 / Game.FRAMES_PER_SECOND / object.getSpeed())
            );
        }
        setTimeout(
            () => {
                requestAnimationFrame(() => this.initObjectGeneration());
            },
            Math.min(Asteroid.INTERVAL, Enemy.INTERVAL)
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
        Logger.log(`Initialization`, `Starting soundtrack.`);
        const audio = new Audio(Game.SOUNDTRACK_PATH);
        audio.loop = true;
        audio.play();

        Logger.log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.resize();

        Logger.log(`Initialization`, `Setting 'onresize' event listener.`);
        onresize = () => this.resize();

        Logger.log(`Initialization`, `Setting scene background.`);
        this.generateInitialBackground();
        requestAnimationFrame(() => this.generateBackground());

        Logger.log(`Initialization`, `Positioning player for ${window.innerWidth}x${window.innerHeight}.`);
        this.initPlayer();

        Logger.log(`Initialization`, `Initializing Player controls.`);
        this.initControls();

        Logger.log(`Initialization`, `Initializing Object generation.`);
        requestAnimationFrame(() => this.initObjectGeneration());

        Logger.log(`Initialization`, `Initializing score system.`);
        requestAnimationFrame(() => this.initScore());
    }

    /**
     * Aggiorna le dimensioni del canvas adattando il background.
     */
    resize() {
        Logger.log(`Resize`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.getContext().canvas.width = window.innerWidth;
        this.getContext().canvas.height = window.innerHeight;
        Logger.log(`Resize`, `Generating background for ${window.innerWidth}x${window.innerHeight}.`);
        this.generateInitialBackground();
        if (this.getPlayer()) {
            Logger.log(`Resize`, `Repositioning player for ${window.innerWidth}x${window.innerHeight}.`);
            this.getPlayer().setPosition(new Position(
                Math.round(this.getContext().canvas.width / 3),
                this.getPlayer().getPosition().getY(),
            ));
        }
    }

}
