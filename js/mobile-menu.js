
let showMenu = true;
document.getElementById('menu').onclick = () => {
    document.querySelectorAll('ul.navbar li').forEach(item => {
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
