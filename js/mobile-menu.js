`use strict`;

/**
 * Mobile Menu
 * 
 * @version 1.0.0.0
 * @author Software Dev Team
 */

/**
 * Specifica il comando da eseguire quando viene premuto il pulsante menu.
 */
let showMenu = true;

/**
 * Gestisce l'evento 'onclick' sul pulsante menu.
 */
document.getElementById('menu').onclick = () => {
    document.querySelectorAll('ul#navbar li').forEach(item => {
        if (item.getAttribute('data-type') == 'menu-item') {
            if (showMenu) {
                item.classList.remove('menu-hidden');
            } else {
                item.classList.add('menu-hidden');
            }
        }
    });
    showMenu = !showMenu;
};

/**
 * Nasconde il menu quando viene effettuata una scelta.
 */
document.querySelectorAll('ul#navbar li').forEach(item => {
    if (item.getAttribute('data-type') == 'menu-item') {
        item.onclick = () => {
            document.querySelectorAll('ul#navbar li').forEach(item => {
                if (item.getAttribute('data-type') == 'menu-item') {
                    item.classList.add('menu-hidden');
                }
            });
            showMenu = !showMenu;
        }
    }
});