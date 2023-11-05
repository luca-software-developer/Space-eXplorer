"use strict";

/**
 * Rappresenta un'esplosione.
 */
class Explosion extends GameObject {

    /**
     * Definisce il percorso dello sprite.
     */
    static SPRITE_PATH = `assets/Sprites/VFX/Explosion.gif`;

    /**
     * Definisce il percorso dell'effetto sonoro.
     */
    static SOUND_PATH = `assets/Audio/SFX/Explosion.mp3`;

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
     * 
     * @param {Position} position Posizione dello sprite della Explosion.
     */
    constructor() {
        super();
        this.setSprite(document.createElement(`img`));
        this.getSprite().setAttribute(`class`, `explosion`);
        this.getSprite().setAttribute(`src`, Explosion.SPRITE_PATH);
        this.getSprite().setAttribute(`alt`, `Explosion`);
        this.getSprite().setAttribute(`width`, Explosion.SPRITE_WIDTH);
        this.getSprite().setAttribute(`height`, Explosion.SPRITE_HEIGHT);
        this.getSprite().setAttribute(`draggable`, `false`);
        document.body.append(this.getSprite());
        new Audio(Explosion.SOUND_PATH).play();
        Logger.log(`Gameplay`, `Explosion object instantiated.`);
    }

}
