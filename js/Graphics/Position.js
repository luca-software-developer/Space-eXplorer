"use strict";

/**
 * Rappresenta una posizione, definita dalle coordinate di un oggetto.
 */
class Position {

    /**
     * Costruttore della classe Position.
     * 
     * @param {number} x Coordinata x dell'oggetto.
     * @param {number} y Coordinata y dell'oggetto.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Restituisce la coordinata x dell'oggetto.
     * 
     * @returns Restituisce la coordinata x dell'oggetto.
     */
    getX() {
        return this.x;
    }

    /**
     * Imposta la coordinata x dell'oggetto.
     * 
     * @param {number} x Coordinata x dell'oggetto.
     */
    setX(x) {
        this.x = x;
    }

    /**
     * Restituisce la coordinata y dell'oggetto.
     * 
     * @returns Restituisce la coordinata y dell'oggetto.
     */
    getY() {
        return this.y;
    }

    /**
     * Imposta la coordinata y dell'oggetto.
     * 
     * @param {number} y Coordinata y dell'oggetto.
     */
    setY(y) {
        this.y = y;
    }

}