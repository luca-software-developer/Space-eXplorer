`use strict`;

/**
 * Responsive Text
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/**
 * Regola la font-size dell'elemento in base alla larghezza che deve occupare.
 * 
 * @param {HTMLElement} element Elemento HTML, tipicamente un'intestazione o un paragrafo.
 * @param {number} relativeWidth Larghezza relativa rispetto alla larghezza della finestra.
 * @param {number} maximumWidth Larghezza massima occupata dall'elemento, espressa in px.
 */
const adjustElementWidth = (element, relativeWidth = 1, maximumWidth = null) => {
    element.style.fontSize = '1rem';
    const width = element.getBoundingClientRect().width;
    element.style.fontSize = (relativeWidth * innerWidth / width) + 'rem';
    if (maximumWidth != null && element.getBoundingClientRect().width > maximumWidth) {
        element.style.fontSize = '1rem';
        const width = element.getBoundingClientRect().width;
        element.style.fontSize = maximumWidth / width + 'rem';
    }
}

/**
 * Effettua la regolazione della larghezza per tutti gli elementi
 * che specificano almeno l'attributo data-rt-relative (larghezza relativa).
 * L'attributo data-rt-maximum specifica la larghezza massima, espressa in px.
 * 
 * @see adjustElementWidth
 */
const adjustHeadingsFontSize = () => {
    const elements = document.querySelectorAll('[data-rt-relative]');
    for (let element of elements) {
        const relativeWidth = parseFloat(element.getAttribute('data-rt-relative'));
        if (element.hasAttribute('data-rt-maximum')) {
            const maximumWidth = parseFloat(element.getAttribute('data-rt-maximum'));
            adjustElementWidth(element, relativeWidth, maximumWidth);
        } else {
            adjustElementWidth(element, relativeWidth);
        }
    }
}

/**
 * Esegue la regolazione della larghezza degli elementi testuali responsive
 * dopo che è stato completato il parsing della pagina. Imposta, inoltre,
 * la funzione adjustHeadingsFontSize come handler dell'evento onresize.
 * 
 * @see adjustHeadingsFontSize
 */
document.addEventListener("DOMContentLoaded", () => {
    adjustHeadingsFontSize();
    onresize = adjustHeadingsFontSize;
});
