
/**
 * Rappresenta un'esplosione.
 */
class Explosion {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Explosion.gif`;

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 800;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 600;

    /**
     * Definisce la durata dell'esplosione.
     */
    static DURATION = 1000;

    /**
     * Costruttore della classe Explosion.
     * @param {number} x Ascissa iniziale del centro dell'esplosione.
     * @param {number} y Ordinata iniziale del centro dell'esplosione.
     */
    constructor() {
        this.sprite = document.createElement(`img`);
        this.sprite.setAttribute(`class`, `explosion`);
        this.sprite.setAttribute(`src`, Explosion.SPRITE_PATH);
        this.sprite.setAttribute(`alt`, `Explosion`);
        this.sprite.setAttribute(`width`, Explosion.SPRITE_WIDTH);
        this.sprite.setAttribute(`height`, Explosion.SPRITE_HEIGHT);
        document.body.append(this.sprite);
        log(`Gameplay`, `Explosion object instantiated.`);
    }

    /**
     * Restituisce lo sprite dell'esplosione.
     * @returns Restituisce lo sprite dell'esplosione.
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Restituisce la posizione del centro dell'esplosione.
     * @returns Restituisce la posizione del centro dell'esplosione.
     */
    getPosition() {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        return {
            x: Math.round(boundingClientRect.left + boundingClientRect.width / 2),
            y: Math.round(boundingClientRect.top + boundingClientRect.height / 2)
        };
    }

    /**
     * Imposta la posizione del centro dell'esplosione.
     * @param {number} x Ascissa del centro dell'esplosione.
     * @param {number} y Ordinata del centro dell'esplosione.
     */
    setPosition({ x, y }) {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        this.getSprite().style.left = `${Math.round(x - boundingClientRect.width / 2)}px`;
        this.getSprite().style.top = `${Math.round(y - boundingClientRect.height / 2)}px`;
    }

    /**
     * Rimuove l'oggetto esplosione.
     */
    remove() {
        this.getSprite().remove();
        log(`Gameplay`, `Explosion object removed.`);
    }

}
