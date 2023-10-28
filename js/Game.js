
/**
 * Rappresenta il gioco.
 */
class Game {

    /**
     * Fotogrammi al secondo, un valore troppo elevato può ridurre le prestazioni.
     */
    static FRAMES_PER_SECOND = 60;

    /**
     * Velocità di movimento del background.
     */
    static BACKGROUND_SPEED = 2000;

    /**
     * Attesa prima del reload della pagina.
     */
    static RELOAD_TIMEOUT = 1000;

    /**
     * Intervallo tra una visualizzazione e l'altra dello score.
     */
    static SCORE_BLINK_INTERVAL = 250;

    /**
     * Costruttore della classe Game.
     */
    constructor() {
        this.canvas = document.getElementById('background-layer');
        this.context = this.canvas.getContext('2d', { willReadFrequently: true });
        self.backgroundSpeed = Game.BACKGROUND_SPEED;
        this.gameObjects = [this.player];
        this.score = 0;
        this.running = true;
        log(`Initialization`, `Game object instantiated.`);
        this.init();
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
     * Restituisce la velocità attuale del background.
     * @returns Restituisce la velocità attuale del background.
     */
    getBackgroundSpeed() {
        return self.backgroundSpeed;
    }

    /**
     * Imposta la velocità attuale del background.
     * @param {number} backgroundSpeed Velocità attuale del background.
     */
    setBackgroundSpeed(backgroundSpeed) {
        self.backgroundSpeed = backgroundSpeed;
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
        let element = document.getElementById(`score`);
        element.innerText = this.getScore();
        if (this.getScore() % 1000 == 0) {
            let visibleCounter = 0;
            let blinkHandle = setInterval(
                () => {
                    if (visibleCounter % 2 == 0) {
                        element.style.visibility = `visible`;
                    } else {
                        element.style.visibility = `hidden`;
                    }
                    if (visibleCounter == 10) {
                        element.style.textShadow = `none`;
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
    generateBackground() {
        for (let x = 0; x < this.getContext().canvas.width; x += 2) {
            this.generateBackgroundSlice(x);
        }
    }

    /**
     * Routine di inizializzazione del gioco.
     */
    init() {
        log(`Initialization`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.resize();

        log(`Initialization`, `Setting 'onresize' event listener.`);
        onresize = () => this.resize();

        log(`Initialization`, `Setting scene background.`);
        this.generateBackground();
        setInterval(
            () => {
                let imageData = this.getContext().getImageData(1, 0, this.getContext().canvas.width - 1, this.getContext().canvas.height);
                this.getContext().putImageData(imageData, 0, 0);
                this.getContext().clearRect(this.getContext().canvas.width - 1, 0, 1, this.getContext().canvas.height);
                this.generateBackgroundSlice(this.getContext().canvas.width - 2);
                this.setBackgroundSpeed(this.getBackgroundSpeed() + 100);
            },
            Math.round((1000 / this.getBackgroundSpeed()) * 1000 / Game.FRAMES_PER_SECOND)
        );

        log(`Initialization`, `Positioning player for ${window.innerWidth}x${window.innerHeight}.`);
        this.player = new Player({
            x: Math.round(this.getContext().canvas.width / 2),
            y: Math.round(this.getContext().canvas.height / 2),
        });

        log(`Initialization`, `Initializing Player controls.`);
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

        log(`Initialization`, `Initializing Asteroid object generation.`);
        let asteroidSpeed = Asteroid.INITIAL_SPEED;
        setInterval(
            () => {
                for (let index = 0; index < Math.ceil(this.getScore() / 1000); index++) {
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
                            if (this.getPlayer().collidesWith(asteroid)) {
                                log(`Collision detection`, `Collision between Player and Asteroid.`);
                                let explosion = new Explosion();
                                explosion.setPosition({
                                    x: this.getPlayer().getPosition().x,
                                    y: this.getPlayer().getPosition().y
                                });
                                setTimeout(
                                    () => {
                                        explosion.remove();
                                        setTimeout(
                                            () => {
                                                location.reload();
                                            },
                                            Game.RELOAD_TIMEOUT
                                        );
                                    },
                                    Explosion.DURATION
                                );
                                this.getPlayer().remove();
                                this.setRunning(false);
                                asteroid.remove();
                                clearInterval(asteroidHandle);
                            }
                        },
                        Math.round((1000 / asteroid.getSpeed()) * 1000 / Game.FRAMES_PER_SECOND)
                    );
                }
            },
            Asteroid.INTERVAL
        );

        log(`Initialization`, `Initializing score system.`);
        let scoreInterval = setInterval(
            () => {
                this.setScore(this.getScore() + 1);
                if (!this.isRunning()) {
                    clearInterval(scoreInterval);
                }
            },
            Math.round(1000 / Game.FRAMES_PER_SECOND)
        );
    }

    /**
     * Aggiorna le dimensioni del canvas adattando il background.
     */
    resize() {
        log(`Resize`, `Resizing canvas to ${window.innerWidth}x${window.innerHeight}.`);
        this.getContext().canvas.width = window.innerWidth;
        this.getContext().canvas.height = window.innerHeight;
        log(`Resize`, `Generating background for ${window.innerWidth}x${window.innerHeight}.`);
        this.generateBackground();
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
    new Game();
};

main();
