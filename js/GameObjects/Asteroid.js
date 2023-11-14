"use strict";

/**
 * Rappresenta un asteroide.
 */
class Asteroid extends GameObject {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Sprites/GameObjects/Asteroid.svg`;

    /**
     * Definisce la larghezza fisica dello sprite.
     */
    static SPRITE_WIDTH = 100;

    /**
     * Definisce l'altezza fisica dello sprite.
     */
    static SPRITE_HEIGHT = 100;

    /**
     * Intervallo di tempo tra un asteroide e un altro.
     */
    static INTERVAL = 2000;

    /**
     * Costruttore della classe Asteroid.
     */
    constructor() {
        super();
        this.setSprite(document.createElement(`img`));
        this.getSprite().setAttribute(`class`, `asteroid`);
        this.getSprite().setAttribute(`src`, Asteroid.SPRITE_PATH);
        this.getSprite().setAttribute(`alt`, `Asteroid`);
        this.getSprite().setAttribute(`width`, Asteroid.SPRITE_WIDTH);
        this.getSprite().setAttribute(`height`, Asteroid.SPRITE_HEIGHT);
        this.getSprite().setAttribute(`draggable`, `false`);
        if (Math.random() > .5) {
            this.getSprite().style.transform = `scaleX(-1)`;
        }
        document.body.append(this.getSprite());
    }

}
