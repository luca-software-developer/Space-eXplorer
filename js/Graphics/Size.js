"use strict";

/**
 * Rappresenta la dimensione di un oggetto.
 */
class Size {

    /**
     * Costruttore della classe Size.
     * 
     * @param {number} width Larghezza dell'oggetto.
     * @param {number} height Altezza dell'oggetto.
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Restituisce la larghezza dell'oggetto.
     * 
     * @returns Restituisce la larghezza dell'oggetto.
     */
    getWidth() {
        return this.width;
    }

    /**
     * Imposta la larghezza dell'oggetto.
     * 
     * @param {number} width Larghezza dell'oggetto.
     */
    setWidth(width) {
        this.width = width;
    }

    /**
     * Restituisce l'altezza dell'oggetto.
     * 
     * @returns Restituisce l'altezza dell'oggetto.
     */
    getHeight() {
        return this.height;
    }

    /**
     * Imposta l'altezza dell'oggetto.
     * 
     * @param {number} height Altezza dell'oggetto.
     */
    setHeight(height) {
        this.height = height;
    }

}