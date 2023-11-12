"use strict";

/**
 * Rappresenta un oggetto all'interno del gioco.
 */
class GameObject {

    /**
     * Costruttore della classe GameObject.
     */
    constructor() {
        this.sprite = null;
    }

    /**
     * Restituisce lo sprite del GameObject.
     * 
     * @returns Restituisce lo sprite del GameObject.
     */
    getSprite() {
        return this.sprite;
    }

    /**
     * Imposta lo sprite del GameObject.
     * 
     * @param {HTMLElement} sprite Sprite del GameObject.
     */
    setSprite(sprite) {
        this.sprite = sprite;
    }

    /**
     * Restituisce la posizione del centro dello sprite del GameObject.
     * 
     * @returns Restituisce la posizione del centro dello sprite del GameObject.
     */
    getPosition() {
        const boundingClientRect = this.getSprite().getBoundingClientRect();
        return new Position(
            Math.round(boundingClientRect.left + boundingClientRect.width / 2),
            Math.round(boundingClientRect.top + boundingClientRect.height / 2)
        );
    }

    /**
     * Imposta la posizione del centro dello sprite del GameObject.
     * 
     * @param {Position} position Posizione del centro dello sprite del GameObject.
     */
    setPosition(position) {
        const boundingClientRect = this.getSprite().getBoundingClientRect();
        this.getSprite().style.left = `${Math.round(position.getX() - boundingClientRect.width / 2)}px`;
        this.getSprite().style.top = `${Math.round(position.getY() - boundingClientRect.height / 2)}px`;
    }

    /**
     * Restituisce le dimensioni dello sprite del GameObject.
     * 
     * @returns Dimensioni dello sprite del GameObject.
     */
    getSize() {
        const boundingClientRect = this.getSprite().getBoundingClientRect();
        return new Size(
            boundingClientRect.width,
            boundingClientRect.height
        );
    }

    /**
     * Verifica se il GameObject corrente è in collisione con il GameObject other.
     * Di default, si considera un box collider le cui dimensioni coincidono con quelle del GameObject corrente.
     * 
     * @param {GameObject} other GameObject in possibile collisione con il GameObject corrente.
     * @returns 
     */
    collidesWith(other) {
        const thisBoundingClientRect = this.sprite.getBoundingClientRect();
        const otherBoundingClientRect = other.sprite.getBoundingClientRect();
        const isInHorizontalCollision =
            thisBoundingClientRect.x < otherBoundingClientRect.x + otherBoundingClientRect.width && thisBoundingClientRect.x + thisBoundingClientRect.width > otherBoundingClientRect.x;
        const isInVerticalCollision =
            thisBoundingClientRect.y < otherBoundingClientRect.y + otherBoundingClientRect.height && thisBoundingClientRect.y + thisBoundingClientRect.height > otherBoundingClientRect.y;
        const isInCollision = isInHorizontalCollision && isInVerticalCollision;
        return isInCollision;
    }

    /**
     * Rimuove lo sprite del GameObject corrente dal DOM.
     */
    remove() {
        this.getSprite().remove();
    }

}