let showMenu = true;

document.getElementById('menu').onclick = () => {
    document.querySelectorAll('#navbar > ul li').forEach(item => {
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

document.querySelectorAll('#navbar > ul li').forEach(item => {
    if (item.getAttribute('data-type') == 'menu-item') {
        item.onclick = () => {
            document.querySelectorAll('#navbar > ul li').forEach(item => {
                if (item.getAttribute('data-type') == 'menu-item') {
                    item.classList.add('menu-hidden');
                }
            });
            showMenu = !showMenu;
        };
    }
});