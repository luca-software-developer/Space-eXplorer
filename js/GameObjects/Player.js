"use strict";

/**
 * Rappresenta il giocatore.
 */
class Player extends GameObject {

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
     * Definisce il percorso dello sprite del PlayerBullet.
     */
    static BULLET_SPRITE_PATH = `assets/Sprites/GameObjects/PlayerBullet.png`;

    /**
     * Costruttore della classe Player.
     * 
     * @param {Position} position Posizione dello sprite del Player.
     */
    constructor(position) {
        super();
        this.setSprite(document.getElementById(`player`));
        this.flame = new GameObject();
        this.getFlame().setSprite(document.getElementById(`flame`));
        this.setPosition(position);
        this.updateFlamePosition();
        this.getSprite().style.visibility = 'initial';
        this.getFlame().getSprite().style.visibility = 'initial';
        Logger.log(`Initialization`, `Player object instantiated.`);
    }

    /**
     * Restituisce l'oggetto GameObject della fiamma.
     * 
     * @returns Restituisce l'oggetto GameObject della fiamma.
     */
    getFlame() {
        return this.flame;
    }

    /**
     * Imposta la posizione del centro della navicella.
     * 
     * @param {Position} position Posizione del centro della navicella.
     */
    setPosition(position) {
        const boundingClientRect = this.getSprite().getBoundingClientRect();
        if (Math.round(position.getX() - boundingClientRect.width / 2) < 0) {
            return;
        }
        if (Math.round(position.getY() - boundingClientRect.height / 2) < 0) {
            return;
        }
        if (Math.round(position.getX() + boundingClientRect.width / 2) > window.innerWidth) {
            return;
        }
        if (Math.round(position.getY() + boundingClientRect.height / 2) > window.innerHeight) {
            return;
        }
        super.setPosition(position);
        this.updateFlamePosition();
    }

    /**
     * Aggiorna la posizione della fiamma.
     */
    updateFlamePosition() {
        const boundingClientRect = this.getSprite().getBoundingClientRect();
        this.getFlame().getSprite().style.left = `${Math.round(boundingClientRect.x - boundingClientRect.width + Player.FLAME_OFFSET_X)}px`;
        this.getFlame().getSprite().style.top = `${Math.round(boundingClientRect.y + Player.FLAME_OFFSET_Y)}px`;
    }

    /**
     * Genera un oggetto Bullet.
     */
    generateBullet(game, gameObjects) {
        const bullet = new Bullet(Player.BULLET_SPRITE_PATH);
        bullet.setPosition(new Position(
            this.getPosition().getX() + this.getSize().getWidth() / 2,
            this.getPosition().getY()
        ));
        const bulletHandle = () => {
            if (bullet.getPosition().getX() - bullet.getSize().getWidth() > window.innerWidth || bullet.getPosition().getY() - bullet.getSize().getHeight() > window.innerHeight) {
                bullet.remove();
            }
            bullet.setPosition(new Position(
                bullet.getPosition().getX() + 5,
                bullet.getPosition().getY()
            ));
            for (let gameObject of gameObjects) {
                if (this == gameObject) {
                    continue;
                }
                if (game.isRunning() && bullet.collidesWith(gameObject)) {
                    Logger.log(`Collision detection`, `Collision between Bullet and Object.`);
                    const explosion = new Explosion();
                    explosion.setPosition(new Position(
                        bullet.getPosition().getX(),
                        bullet.getPosition().getY()
                    ));
                    setTimeout(
                        () => {
                            explosion.remove();
                        },
                        Explosion.DURATION
                    );
                    bullet.remove();
                    gameObject.remove();
                }
            }
            requestAnimationFrame(bulletHandle);
        };
        requestAnimationFrame(bulletHandle);
    }

    /**
     * Rimuove lo sprite del Player corrente dal DOM.
     */
    remove() {
        super.remove();
        this.getFlame().getSprite().remove();
        Logger.log(`Gameplay`, `Player object removed.`);
    }

}
