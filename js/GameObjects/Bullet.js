"use strict";

/**
 * Rappresenta un proiettile.
 */
class Bullet extends GameObject {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Sprites/GameObjects/Bullet.png`;

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 50;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 28;

    /**
     * Fattore moltiplicativo della velocità iniziale.
     */
    static SPEED_FACTOR = 1000;

    /**
     * Intervallo di tempo tra un proiettile e un altro.
     */
    static INTERVAL = 7000;

    /**
     * Costruttore della classe Bullet.
     */
    constructor(initialSpeed) {
        super();
        this.setSprite(document.createElement(`img`));
        this.getSprite().setAttribute(`class`, `bullet`);
        this.getSprite().setAttribute(`src`, Bullet.SPRITE_PATH);
        this.getSprite().setAttribute(`alt`, `Bullet`);
        this.getSprite().setAttribute(`width`, Bullet.SPRITE_WIDTH);
        this.getSprite().setAttribute(`height`, Bullet.SPRITE_HEIGHT);
        this.getSprite().setAttribute(`draggable`, `false`);
        document.body.append(this.getSprite());
        this.speed = initialSpeed * Bullet.SPEED_FACTOR;
    }

    /**
     * Restituisce la velocità attuale del proiettile.
     * 
     * @returns Restituisce la velocità attuale del proiettile.
     */
    getSpeed() {
        return this.speed;
    }

    /**
     * Imposta la velocità attuale del proiettile.
     * 
     * @param {number} speed Velocità attuale del proiettile.
     */
    setSpeed(speed) {
        this.speed = speed;
    }

}
