"use strict";

/**
 * Rappresenta un proiettile.
 */
class Bullet extends GameObject {

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 50;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 29;

    /**
     * Intervallo di tempo tra un proiettile e un altro.
     */
    static INTERVAL = 7000;

    /**
     * Costruttore della classe Bullet.
     */
    constructor(spritePath) {
        super();
        this.setSprite(document.createElement(`img`));
        this.getSprite().setAttribute(`class`, `bullet`);
        this.getSprite().setAttribute(`src`, spritePath);
        this.getSprite().setAttribute(`alt`, `Bullet`);
        this.getSprite().setAttribute(`width`, Bullet.SPRITE_WIDTH);
        this.getSprite().setAttribute(`height`, Bullet.SPRITE_HEIGHT);
        this.getSprite().setAttribute(`draggable`, `false`);
        document.body.append(this.getSprite());
    }

}
