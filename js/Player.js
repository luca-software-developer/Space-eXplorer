
/**
 * Rappresenta il giocatore.
 */
class Player {

    /**
     * Offset dello sprite della fiamma rispetto al lato sinistro della navicella.
     */
    static FLAME_OFFSET_X = 10;
    static FLAME_OFFSET_Y = -2;

    /**
     * Rapidità di variazione della posizione al verificarsi di un evento di 'keydown'.
     */
    static DELTA_Y = 10;

    /**
     * Costruttore della classe Player.
     * @param {number} x Ascissa iniziale del centro della navicella.
     * @param {number} y Ordinata iniziale del centro della navicella.
     */
    constructor({ x, y }) {
        this.sprite = document.getElementById(`player`);
        this.flame = document.getElementById(`flame`);
        this.setPosition({ x: x, y: y });
        this.updateFlamePosition();
        this.sprite.style.visibility = 'initial';
        this.flame.style.visibility = 'initial';
        log(`Initialization`, `Player object instantiated.`);
    }

    /**
     * Restituisce lo sprite del giocatore.
     * @returns Restituisce lo sprite del giocatore.
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Restituisce lo sprite della fiamma.
     * @returns Restituisce lo sprite della fiamma.
     */
    getFlame() {
        return this.flame;
    }

    /**
     * Restituisce la posizione del centro della navicella.
     * @returns Restituisce la posizione del centro della navicella.
     */
    getPosition() {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        return {
            x: Math.round(boundingClientRect.left + boundingClientRect.width / 2),
            y: Math.round(boundingClientRect.top + boundingClientRect.height / 2)
        };
    }

    /**
     * Imposta la posizione del centro della navicella.
     * @param {number} x Ascissa del centro della navicella.
     * @param {number} y Ordinata del centro della navicella.
     */
    setPosition({ x, y }) {
        let boundingClientRect = this.getSprite().getBoundingClientRect();
        if (Math.round(x - boundingClientRect.width / 2) < 0) {
            return;
        }
        if (Math.round(y - boundingClientRect.height / 2) < 0) {
            return;
        }
        if (Math.round(x + boundingClientRect.width / 2) > window.innerWidth) {
            return;
        }
        if (Math.round(y + boundingClientRect.height / 2) > window.innerHeight) {
            return;
        }
        this.getSprite().style.left = `${Math.round(x - boundingClientRect.width / 2)}px`;
        this.getSprite().style.top = `${Math.round(y - boundingClientRect.height / 2)}px`;
        this.updateFlamePosition();
    }

    /**
     * Aggiorna la posizione della fiamma.
     */
    updateFlamePosition() {
        let boundingClientRect = this.sprite.getBoundingClientRect();
        this.flame.style.left = `${Math.round(boundingClientRect.x - boundingClientRect.width + Player.FLAME_OFFSET_X)}px`;
        this.flame.style.top = `${Math.round(boundingClientRect.y + Player.FLAME_OFFSET_Y)}px`;
    }

    /**
     * Verifica se il Player è in collisione con un altro oggetto.
     * @param {object} other Altro oggetto.
     * @returns Restituisce true se il Player è in collisione, false altrimenti.
     */
    collidesWith(other) {
        let thisBoundingClientRect = this.sprite.getBoundingClientRect();
        let otherBoundingClientRect = other.sprite.getBoundingClientRect();
        const isInHorizontalCollision =
            thisBoundingClientRect.x < otherBoundingClientRect.x + otherBoundingClientRect.width && thisBoundingClientRect.x + thisBoundingClientRect.width > otherBoundingClientRect.x;
        const isInVerticalCollision =
            thisBoundingClientRect.y < otherBoundingClientRect.y + otherBoundingClientRect.height && thisBoundingClientRect.y + thisBoundingClientRect.height > otherBoundingClientRect.y;
        const isInCollision = isInHorizontalCollision && isInVerticalCollision;
        return isInCollision;
    }

    /**
     * Rimuove l'oggetto Player.
     */
    remove() {
        this.getSprite().remove();
        this.getFlame().remove();
        log(`Gameplay`, `Player object removed.`);
    }

}
