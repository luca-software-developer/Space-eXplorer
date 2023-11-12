"use strict";

/**
 * Rappresenta un nemico.
 */
class Enemy extends GameObject {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Sprites/GameObjects/Enemy.png`;

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 150;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 72;

    /**
     * Velocità iniziale del nemico.
     */
    static INITIAL_SPEED = 3;

    /**
     * Intervallo di tempo tra un nemico e un altro.
     */
    static INTERVAL = 2000;

    /**
     * Definisce il percorso dello sprite dell'EnemyBullet.
     */
    static BULLET_SPRITE_PATH = `assets/Sprites/GameObjects/EnemyBullet.png`;

    /**
     * Costruttore della classe Enemy.
     */
    constructor(game, player) {
        super();
        this.setSprite(document.createElement(`img`));
        this.getSprite().setAttribute(`class`, `enemy`);
        this.getSprite().setAttribute(`src`, Enemy.SPRITE_PATH);
        this.getSprite().setAttribute(`alt`, `Enemy`);
        this.getSprite().setAttribute(`width`, Enemy.SPRITE_WIDTH);
        this.getSprite().setAttribute(`height`, Enemy.SPRITE_HEIGHT);
        this.getSprite().setAttribute(`draggable`, `false`);
        document.body.append(this.getSprite());
        this.speed = Enemy.INITIAL_SPEED;
        requestAnimationFrame(() => this.generateBullet(game, player));
    }

    /**
     * Restituisce la velocità attuale del nemico.
     * 
     * @returns Restituisce la velocità attuale del nemico.
     */
    getSpeed() {
        return this.speed;
    }

    /**
     * Imposta la velocità attuale del nemico.
     * 
     * @param {number} speed Velocità attuale del nemico.
     */
    setSpeed(speed) {
        this.speed = speed;
    }

    /**
     * Genera un oggetto Bullet.
     */
    generateBullet(game, player) {
        const bullet = new Bullet(this.getSpeed(), Enemy.BULLET_SPRITE_PATH);
        bullet.setPosition(new Position(
            this.getPosition().getX() - this.getSize().getWidth() / 2,
            this.getPosition().getY()
        ));
        const bulletHandle = setInterval(
            () => {
                if (bullet.getPosition().getX() + bullet.getSize().getWidth() < 0 || bullet.getPosition().getY() + bullet.getSize().getHeight() < 0) {
                    bullet.remove();
                }
                bullet.setPosition(new Position(
                    bullet.getPosition().getX() - 2,
                    bullet.getPosition().getY()
                ));
                if (game.isRunning() && player.collidesWith(bullet)) {
                    Logger.log(`Collision detection`, `Collision between Player and Bullet.`);
                    const explosion = new Explosion();
                    explosion.setPosition(new Position(
                        player.getPosition().getX(),
                        player.getPosition().getY()
                    ));
                    setTimeout(
                        () => {
                            explosion.remove();
                            game.gameOver();
                        },
                        Explosion.DURATION
                    );
                    player.remove();
                    game.setRunning(false);
                    bullet.remove();
                    clearInterval(bulletHandle);
                }
            },
            Math.round(1000 / Game.FRAMES_PER_SECOND / bullet.getSpeed())
        );
        setTimeout(
            () => {
                requestAnimationFrame(() => this.generateBullet(game, player));
            },
            Bullet.INTERVAL
        );
    }

}
