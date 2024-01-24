
/**
 * Mobile Menu
 * 
 * @version 1.0.0.0
 * @author Gruppo 32
 */

let showMenu = true;

//  Mostra/nasconde il menu per dispositivi mobili.
document.getElementById('menu').onclick = () => {
    document.querySelectorAll('#navbar > ul li').forEach(item => {
        if (item.getAttribute('data-type') === 'menu-item') {
            if (showMenu) {
                item.classList.remove('menu-hidden');
            } else {
                item.classList.add('menu-hidden');
            }
        }
    });
    showMenu = !showMenu;
};

//  Nasconde il menu per dispositivi mobili quando l'utente
//  effettua una scelta.
document.querySelectorAll('#navbar > ul li').forEach(item => {
    if (item.getAttribute('data-type') === 'menu-item') {
        item.onclick = () => {
            document.querySelectorAll('#navbar > ul li').forEach(item => {
                if (item.getAttribute('data-type') === 'menu-item') {
                    item.classList.add('menu-hidden');
                }
            });
            showMenu = !showMenu;
        };
    }
});