`use strict`;

/**
 * Top
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/**
 * Barra di navigazione.
 */
const navbar = document.querySelector('#navbar > ul');

/**
 * Pulsante [Top], inizialmente non visualizzato.
 */
const topLink = document.getElementById('top-link');
topLink.style.display = 'none';

/**
 * Gestisce l'evento 'onscroll', visualizzando opportunamente 
 * il pulsante [Top].
 */
document.onscroll = () => {
    if (window.scrollY < navbar.getBoundingClientRect().height) {
        topLink.style.display = 'none';
    } else {
        topLink.style.display = 'table';
    }
}