
/**
 * Rappresenta un asteroide.
 */
class Asteroid {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Asteroid.gif`;

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 100;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 100;

    /**
     * Velocità iniziale dell'asteroide.
     */
    static INITIAL_SPEED = 2000;

    /**
     * Intervallo di tempo tra un asteroide e un altro.
     */
    static INTERVAL = 2000;

    /**
     * Rapidità di variazione della posizione dell'asteroide.
     */
    static DELTA_X = 5;

    /**
     * Costruttore della classe Asteroid.
     */
    constructor() {
        this.sprite = document.createElement(`img`);
        this.sprite.setAttribute(`class`, `asteroid`);
        this.sprite.setAttribute(`src`, Asteroid.SPRITE_PATH);
        this.sprite.setAttribute(`alt`, `Asteroid`);
        this.sprite.setAttribute(`width`, Asteroid.SPRITE_WIDTH);
        this.sprite.setAttribute(`height`, Asteroid.SPRITE_HEIGHT);      
        if (Math.random() > .5) {
            this.sprite.style.transform = `scaleX(-1)`;
        }
        document.body.append(this.sprite);
        this.speed = Asteroid.INITIAL_SPEED;
        log(`Gameplay`, `Asteroid object instantiated.`);
    }

    /**
     * Restituisce lo sprite dell'asteroide.
     * @returns Restituisce lo sprite dell'asteroide.
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Restituisce la posizione del centro dell'asteroide.
     * @returns Restituisce la posizione del centro dell'asteroide.
     */
    getPosition() {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        return {
            x: Math.round(boundingClientRect.left + boundingClientRect.width / 2),
            y: Math.round(boundingClientRect.top + boundingClientRect.height / 2)
        };
    }

    /**
     * Imposta la posizione del centro dell'asteroide.
     * @param {number} x Ascissa del centro dell'asteroide.
     * @param {number} y Ordinata del centro dell'asteroide.
     */
    setPosition({ x, y }) {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        this.getSprite().style.left = `${Math.round(x - boundingClientRect.width / 2)}px`;
        this.getSprite().style.top = `${Math.round(y - boundingClientRect.height / 2)}px`;
    }

    /**
     * Restituisce la velocità attuale dell'asteroide.
     * @returns Restituisce la velocità attuale dell'asteroide.
     */
    getSpeed() {
        return this.speed;
    }

    /**
     * Imposta la velocità attuale dell'asteroide.
     * @param {number} speed Velocità attuale dell'asteroide.
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Rimuove l'oggetto asteroide.
     */
    remove() {
        this.getSprite().remove();
        log(`Gameplay`, `Asteroid object removed.`);
    }

}
