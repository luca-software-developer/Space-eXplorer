
/**
 * Top
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

const navbar = document.querySelector('#navbar > ul');
const topLink = document.getElementById('top-link');
topLink.style.display = 'none';

//  Mostra/nasconde il pulsante Top quando si verifica
//  l'evento di scrolling della pagina.
document.onscroll = () => {
    if (window.scrollY < navbar.getBoundingClientRect().height) {
        topLink.style.display = 'none';
    } else {
        topLink.style.display = 'table';
    }
};